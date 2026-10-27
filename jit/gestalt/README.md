# JIT Gestalt — model-directed UI workbench

**Status:** Initial experiment (2026-10-26). Not Pinterest's official Gestalt, nor an Android runtime. Isolated to `jit/gestalt/`.

## Thesis

A language model authors and revises a small **declarative UI contract**. The browser renders an interactive approximation immediately. Independent translators emit **Jetpack Compose** and **Android XML** representations without requiring an Android SDK or emulator.

The **contract is the source of truth**, not generated HTML. We want to investigate whether model-driven prototyping can preserve design intent, component semantics, tokens, state, and interactions across render targets.

## Open

- [Workbench](./index.html) — web preview, contract editor, Compose and XML generators
- [Initial contract](./contract.json)
- [Live site](https://bonoj.github.io/jit/gestalt/)

## Starting scope

- `mini-gestalt/v1`: tokens for background, surface, ink, accent, radius and spacing.
- Screen title, subtitle, ordered components.
- Components: `hero`, `chips`, `card`, `button`.
- Web preview has local chip selection and card saved state.
- Compose output is **illustrative**, not compile-verified; XML output is a **layout skeleton**, with styling/behavior requiring Android binding code.
- No claim of exact visual or behavioral parity across targets.

## How to iterate with ChatGPT

1. Describe a screen or a change conversationally.
2. Have the model revise `contract.json` according to `mini-gestalt/v1`, rather than hand-authoring HTML.
3. Refresh the workbench to see the web equivalent; inspect Compose and XML.
4. Compare intent, semantics, tokens, and interaction state across targets.
5. Extend the schema/renderers only when an actual experiment exposes a limitation.

The workbench also permits manual JSON editing with **Apply**; this is an escape hatch, not the primary model-driven workflow.

## Research questions

- Can generated UI remain constrained to a known component and token vocabulary?
- How should actions, state, accessibility, responsive layout and navigation be represented independently of runtime?
- Can the model propose a design without breaking the renderer contract?
- How should Compose and XML outputs share semantic structure while differing in idiom?
- How can we measure fidelity and drift instead of relying on visual plausibility?

## Connection to Pinterest

Pinterest's Gestalt design system motivates this experiment, but the implementation is deliberately independent. The interesting problem is **designer intent → governed UI contract → executable preview → native implementation**. Hausgeist (`../hausgeist/`) is an example of model-directed visual generation; this experiment adds explicit design constraints and multiple render targets.

## Deployment and safety

Repository: `bonoj/bonoj.github.io`, branch `master`, folder `jit/gestalt/`. Follow the repository root README and existing JIT/Pages publication machinery. Do **not** modify the protected root or publishing workflow. Git commit != verified Pages deployment. On each change, inspect source SHA, then confirm the live site separately. Avoid stale browser results with a cache-busting query parameter.

## Next

Move from toy-specific renderer branches to a reusable component registry; add explicit events/state and accessibility metadata; establish a fidelity test fixture; then try a second, radically different design contract without changing renderer code.

## Native Android experiment — October 26, 2026

**New:** [Android source](./android/) · [MainActivity.kt](./android/app/src/main/java/io/github/bonoj/jitgestalt/MainActivity.kt) · [APK build workflow](../../.github/workflows/jit-gestalt-android.yml) · [Actions runs](https://github.com/bonoj/bonoj.github.io/actions/workflows/jit-gestalt-android.yml).

This is the first attempt to cross from a chat-authored design to a **real installable Android APK**. The minimal Compose app reproduces the contract's titles, chip selection, save toggle, and explore action. It is native Kotlin/Compose, not a WebView. The debug APK is produced by GitHub Actions (Gradle 8.9, Android Gradle Plugin 8.7.3, Kotlin 2.0.21, Compose BOM 2024.12.01, SDK 35); the workflow uploads `app-debug.apk` as an artifact.

**Verified outcome (2026-10-26):** After fixing the SDK installation step, GitHub Actions built and uploaded the debug APK successfully. The APK was downloaded, installed, and exercised on a physical Android phone; screenshots showed portrait and landscape rendering and the stateful Save action. This verifies that particular native build and interaction, not automatic JSON-to-Kotlin generation, production readiness, or exhaustive device coverage. The Android screen remains a manually authored Kotlin/Compose mirror of the contract.

**Repeatable phone test:** open the successful Actions run → download the `jit-gestalt-debug-apk` artifact ZIP → extract `app-debug.apk` → install on Android (approve the install source if required) → select chips, toggle Save, tap Explore, rotate/relaunch, and observe behavior. The APK is debug-signed, not release-signed.

**Next meaningful boundary:** move from hardcoded mirror to contract-driven generation; capture actual build evidence, then device evidence. Keep the experiment isolated and do not modify the existing web workbench without a demonstrated reason.


## Happy path — recreate an installable Android debug APK

**Use this known-good reference rather than reconstructing the toolchain from memory.** The source of truth is [the working workflow](../../.github/workflows/jit-gestalt-android.yml) and [the native project](./android/). This recipe is for a small debug APK built entirely through GitHub, without a local Android SDK.

1. **Choose the implementation:** For a native UI experiment, adapt the existing `jit/gestalt/android/` Compose project. For a JIT world, prefer a thin WebView shell around the existing web application; that shell has **not yet been built or validated** and may need device-specific WebGL, storage, media, and permission testing. Do not claim the current Compose project is a WebView wrapper.
2. **Keep it isolated:** Put the new app in its own `jit/<experiment>/android/` directory, preserving the existing site root and unrelated experiments. Copy/adapt the Gradle project, manifest, activity, and workflow; change application ID, display name, paths, and workflow trigger filters. Do not alter the global Pages publisher.
3. **Reuse proven tool versions first:** The verified workflow uses Ubuntu GitHub Actions, Temurin Java 17, Gradle 8.9, Android Gradle Plugin 8.7.3, Kotlin 2.0.21, Compose BOM 2024.12.01, Android SDK platform 35 and build-tools 35.0.0. Inspect actual project files before assuming version compatibility. Update versions only for a demonstrated need.
4. **Install SDK packages directly:** Use `sdkmanager` from `$ANDROID_HOME/cmdline-tools/latest/bin/` (or discover an available `sdkmanager`), accept licenses, and install `platforms;android-35` and `build-tools;35.0.0`. **Do not reuse the failed `android-actions/setup-android@v3` path**, which attempted to install obsolete SDK `tools` and broke the first build.
5. **Build and upload:** Run `gradle :app:assembleDebug --stacktrace` in the Android project directory, then `actions/upload-artifact@v4` on `app/build/outputs/apk/debug/app-debug.apk`. Give each app its own workflow and artifact name; ensure push path filters include its Android source and workflow file. `workflow_dispatch` allows manual reruns.
6. **Verify before claiming success:** Confirm the source commit and successful Actions run, download the APK artifact, install it on a real phone, and exercise the intended behavior. A green workflow proves packaging, not functional correctness. Record the exact SHA and observed device result; distinguish a successful APK build from a verified installed experience.
7. **Recover at the failed boundary:** For a red build, read the actual Actions log, fix the smallest failing step, commit, and rerun. For a web app, separately verify the public Pages build and guard against stale browser cache. Follow [Gate](https://github.com/bonoj/Gate/blob/main/README.md) for delivery and recovery; do not redesign the established publication route.

**Scope:** This is a reusable *build-and-deliver procedure*, not a general-purpose contract compiler, Play Store pipeline, or validated WebView template. The smallest next experiment is wrapping one existing JIT world and repeating steps 2–7.
