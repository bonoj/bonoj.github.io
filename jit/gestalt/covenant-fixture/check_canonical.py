#!/usr/bin/env python3
"""Conservative source guard for this fixture; not a complete Kotlin parser."""
from pathlib import Path
import re
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
GUARD_ROOT = Path(__file__).resolve().parent
SCREEN = ROOT / "android/app/src/main/java/io/github/bonoj/jitgestalt/MainActivity.kt"
CANONICAL = ROOT / "android/app/src/main/java/io/github/bonoj/jitgestalt/CanonicalUi.kt"

def check(screen: str, canonical: str):
    failures = []
    # Remove comments and string literals before searching for Kotlin calls.
    stripped = re.sub(r'/\*[\s\S]*?\*/|//[^\n]*|"(?:\\.|[^"\\])*"', ' ', screen)
    for name in ("Button", "FilterChip", "Card"):
        if re.search(r'(?<![\w])(?:androidx\.compose\.material3\.)?' + name + r'\s*\(', stripped):
            failures.append("raw Material component: " + name)
    if re.search(r'\bColor\s*\(|\bColor\s*\.', stripped):
        failures.append("screen-local color instead of CanonicalTokens")
    for required in ("CanonicalButton(", "CanonicalChip(", "CanonicalCard", "CanonicalTokens."):
        if required not in screen:
            failures.append("missing canonical usage: " + required)
    for required in ("fun CanonicalButton(", "fun CanonicalChip(", "fun CanonicalCard(", "object CanonicalTokens"):
        if required not in canonical:
            failures.append("canonical registry missing: " + required)
    return failures

def main():
    # Integrity lock is only authoritative when protected outside model-editable files.
    import hashlib
    manifest = json.loads((GUARD_ROOT / "authority-lock.json").read_text())
    for relative, expected in manifest["sha256"].items():
        actual = hashlib.sha256((ROOT / relative).read_bytes()).hexdigest()
        assert actual == expected, "protected authority drift: " + relative

    screen = SCREEN.read_text()
    canonical = CANONICAL.read_text()
    assert not check(screen, canonical), check(screen, canonical)
    cases = {
        "raw-button": screen + "\nButton(onClick = {}) {}",
        "raw-chip": screen + "\nFilterChip(selected = true, onClick = {}, label = {})",
        "raw-card": screen + "\nCard {}",
        "rogue-color": screen + "\nval rogue = Color(0xFF00FF00)",
    }
    for label, altered in cases.items():
        assert check(altered, canonical), "FAILED to detect " + label
        print("REJECTED", label)
    print("PASS: fixture screen uses canonical primitives; four deliberate drift cases rejected")
    print("LIMIT: lexical source guard, not proof of runtime visual or behavioral fidelity")

if __name__ == "__main__":
    try:
        main()
    except (AssertionError, OSError) as exc:
        print("FAIL:", exc, file=sys.stderr)
        sys.exit(1)
