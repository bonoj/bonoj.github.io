#!/usr/bin/env python3
"""Compare candidate's authority files with independent checkout."""
from pathlib import Path
import hashlib
import sys

trusted = Path(__file__).resolve().parents[3]
candidate = Path.cwd()
protected = [
    "jit/gestalt/android/app/src/main/java/io/github/bonoj/jitgestalt/CanonicalUi.kt",
    "jit/gestalt/covenant-fixture/check_canonical.py",
    "jit/gestalt/covenant-fixture/covenant.json",
    "jit/gestalt/covenant-fixture/verify_candidate.py",
]
for relative in protected:
    a, b = trusted / relative, candidate / relative
    if not a.is_file() or not b.is_file() or hashlib.sha256(a.read_bytes()).digest() != hashlib.sha256(b.read_bytes()).digest():
        print("REJECT: protected authority differs:", relative, file=sys.stderr)
        sys.exit(1)
print("PASS: candidate authority files match trusted checkout")
