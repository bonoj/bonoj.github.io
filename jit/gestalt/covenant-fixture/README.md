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
