#!/usr/bin/env python3
"""Validate locked project imagery without silently substituting assets.

Usage: python3 jit/subversion/verify_assets.py jit/subversion/example
assets.lock.json schema:
{"version":1,"assets":[{"path":"assets/hero.webp","sha256":"<64 hex chars>"}]}
"""
import hashlib
import json
import pathlib
import re
import sys

REMOTE_IMAGE = re.compile(r"""(?:src|poster)\s*=\s*["']https?://|url\(\s*["']?https?://""", re.I)
HEX = re.compile(r"^[0-9a-f]{64}$")


def main():
    if len(sys.argv) != 2:
        print("Usage: verify_assets.py PROJECT_DIRECTORY", file=sys.stderr)
        return 2
    root = pathlib.Path(sys.argv[1]).resolve()
    lock = root / "assets.lock.json"
    if not root.is_dir() or not lock.is_file():
        print(f"FAIL: project directory and assets.lock.json required: {root}", file=sys.stderr)
        return 1
    try:
        data = json.loads(lock.read_text(encoding="utf-8"))
        assets = data["assets"]
        if data["version"] != 1 or not isinstance(assets, list) or not assets:
            raise ValueError("expected version 1 and nonempty assets")
    except (OSError, ValueError, KeyError, TypeError) as exc:
        print(f"FAIL: invalid asset lock: {exc}", file=sys.stderr)
        return 1
    errors = []
    for entry in assets:
        try:
            rel, digest = entry["path"], entry["sha256"]
            if not isinstance(rel, str) or not isinstance(digest, str) or not HEX.fullmatch(digest):
                raise ValueError("invalid path or SHA-256")
            path = (root / rel).resolve()
            if not path.is_relative_to(root) or not path.is_file():
                raise ValueError("missing asset or path outside project")
            actual = hashlib.sha256(path.read_bytes()).hexdigest()
            if actual != digest:
                raise ValueError("content differs from approved asset")
        except (KeyError, TypeError, ValueError, OSError) as exc:
            errors.append(f"{entry!r}: {exc}")
    for ext in ("*.html", "*.css"):
        for path in root.rglob(ext):
            if REMOTE_IMAGE.search(path.read_text(encoding="utf-8")):
                errors.append(f"{path.relative_to(root)}: external image URL; bundle and lock it")
    if errors:
        for error in errors:
            print("FAIL:", error, file=sys.stderr)
        return 1
    print(f"PASS: {len(assets)} locked assets verified in {root}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
