#!/usr/bin/env python3
"""Independent state-machine covenant check. Not an Android runtime test."""
import json
from pathlib import Path

spec = json.loads((Path(__file__).parent / "covenant.json").read_text())
assert spec["schema"] == "gestalt-covenant/fixture-1"
assert spec["actions"]["save"]["transition"] == "toggle(saved)"
assert spec["invariants"] == ["initially-unsaved", "first-tap-saved", "second-tap-unsaved"]

def observe(implementation):
    state = False
    observations = [state]
    for _ in range(2):
        state = implementation(state)
        observations.append(state)
    return observations

def correct(saved):
    return not saved

def broken(saved):
    return True

expected = [False, True, False]
assert observe(correct) == expected
assert observe(broken) != expected
print("PASS: covenant rejects deliberately broken Save transition")
print("NOTE: no APK, Compose semantics, or device behavior verified")
