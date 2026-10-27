# Gestalt native Runtime Eyes — isolated fixture

**Branch:** `gestalt-covenant-fixture`. The known-good `master` app and `gestalt-working-baseline-2026-10-27` recovery branch remain unchanged.

## Use on Android

1. Open [Runtime Eyes Actions](https://github.com/bonoj/bonoj.github.io/actions/workflows/jit-gestalt-eyes.yml) and choose the latest successful run on `gestalt-covenant-fixture`.
2. Download `jit-gestalt-eyes-debug-apk`, extract `app-debug.apk`, and install it. Its package is `io.github.bonoj.jitgestalt.eyes`, separate from the baseline app.
3. Tap chips, Save, and Explore in any order.
4. Tap **👁 Copy Runtime Eyes**, then paste the JSON into chat.

## Observation format

`jit-gestalt-native-eye/v1`: capture time, session start, contract/fixture IDs, package ID, selected interest, saved flag, Explore count, and timestamped actions.

**Limits:** Event history is in memory and resets after activity recreation or process restart. Current UI state uses `rememberSaveable` and may survive recreation. This is an app-reported trace, not an independent Compose semantics or accessibility audit; do not infer full covenant compliance from it. The current report does not include a build SHA. Clipboard contents may be visible to other apps or OS clipboard history; this fixture records no personal inputs.

## Next

After a successful build and real-device test, paste the Eyes report to compare observed transitions to the separately frozen covenant. Do not weaken the covenant to match the app.

## Canonical UI guard — first enforceable boundary

- `android/.../CanonicalUi.kt` defines approved components and tokens.
- `MainActivity.kt` composes those primitives; the model should not create raw Material Button, FilterChip, Card, or local Color values.
- `check_canonical.py` rejects raw primitive/color substitutions and contains four negative controls.
- `.github/workflows/jit-gestalt-eyes.yml` runs the guard **before** Gradle; a failing check prevents APK packaging.

**Scope and limitations:** This is a lexical source check on the fixture screen, not a Kotlin AST analyzer, tamper-proof security boundary, screenshot comparator, or runtime behavior test. A model with permission to edit the canonical registry or workflow could weaken the rule; production enforcement would protect those files via review/branch rules and extend scanning across all generated source. The canonical wrappers currently delegate to Material 3; they establish component provenance, not verified Pinterest Gestalt fidelity. CI execution and APK behavior must be verified separately.
