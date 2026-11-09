# JIT MCP — handoff

**Start here:** [ANDROID-WEBVIEW.md](ANDROID-WEBVIEW.md) is the **binding, noise-free specification** for the current implementation. Read it first. [EXPERIMENTS.md](EXPERIMENTS.md) is the evidence log. [BROWSER-AUTOMATION.md](BROWSER-AUTOMATION.md) documents the earlier cloud-browser proposal; its hosted-Chromium and no-Android assumptions are **superseded**.

## Latest checkpoint — E6 observation transport deployed

Site deployment `appgdep_6af115a40e10819180dc38526469a281` and Supabase function v5 are live. E5 readback still works. The Android source now implements one-time enrollment, foreground observation and signed JS verification. The phone acceptance remains open. First verify the Actions APK for the E6 commit, then install once. In ordinary ChatGPT request `jit_invoke({capability:"browser_pair_v1",input:{}})`, enter its short-lived code in the companion, open a public HTTPS site, and tap **Share page text**. With the companion still foreground, invoke `browser_observe_v1`, then `browser_result_v1` with the returned command ID. Record the fresh DOM text, nonce, UTC timestamp and runtime version. Test Stop sharing. This release queues observation only.

## Non-negotiable target

**One Android APK installation. Then ordinary ChatGPT controls a real WebView on the phone and iterates browser automation by remotely updating JavaScript.** No routine Work, Railway, paid Chromium host, Chrome pairing, manual relays, or repeat sideloading. A future native update may be unavoidable for native defects or API changes; do not conceal that limitation.

## Pre-E6 history

- **VERIFIED:** Existing private JIT MCP plugin callable from ordinary Android ChatGPT; six unchanged MCP signatures; E5 authenticated Supabase backend-only capability evolution (echo and Unicode length). Existing gateway secret is provisioned; do not rotate or repeat `/setup`.
- **VERIFIED historical:** E3/E4 device heartbeat, consented observation and revocation patterns; first-party command queue demo. Reuse patterns, **not** the demo's insecure authority or fake browser state.
- **INSPECTED 2026-11-08:** Live Supabase `jit-mcp-capabilities` ACTIVE v4; text/integer-only capability schema, 2048-byte request limit. Repo `runtime/index.mjs` is stale; never deploy it blindly.
- **IMPLEMENTED IN SOURCE (UNBUILT/UNVERIFIED):** Minimal Android WebView shell and GitHub Actions debug APK workflow under `jit/mcp/android/`. Local HTTPS navigation, WebView settings, Stop and diagnostic DOM observation are scaffolded; a versioned JS DOM runtime is committed in `android/runtime/dom-v1.js` and packaged as an offline app asset. The local **Inspect DOM** control invokes it through `evaluateJavascript` and displays a bounded diagnostic; **not compiled/device verified**, and no remote commands or updates are enabled. Remote control remains disabled. **NOT IMPLEMENTED:** secure Android command/result transport, signed remote JS runtime, real third-party DOM automation, ordinary-chat end-to-end acceptance.
- **NO HOST BLOCKER:** Railway was merely an optional cloud-host suggestion and is **not** required or a dependency.

## Original E6 implementation checklist

1. Inspect the live Site gateway source, Supabase function and experiment evidence. Preserve plugin identity, six tool signatures, secrets, and working E5.
2. Continue the committed Android WebView **Java prototype** and GitHub Actions debug build. **Build status is unknown**: the available GitHub integration cannot list workflow runs, and the public runs endpoint was inaccessible. Verify build via a workflow run link/log or a build-capable environment; do not assume success. Then add secure enrollment, authenticated command execution, remote JS version verification/rollback, and visible stop. The spec calls for Kotlin; current scaffold is Java and should be converted or explicitly accepted before the first install. The spec calls for Kotlin; current scaffold is Java and should be converted or explicitly accepted before the first install.
3. Extend existing authenticated gateway/Supabase transport and capability schemas for structured commands and completed results. Never acknowledge before device execution.
4. Build/deploy JS DOM runtime and demonstrate a remotely shipped change without reinstalling the APK.
5. Arrange **one** APK install/enrollment, then verify real navigate/observe/fill/click/observe from ordinary ChatGPT on two unrelated unmodified sites. Log UTC proof in `EXPERIMENTS.md`.

**Stop conditions:** If live source is unavailable, an Android permission or API needs native update, or APK build/signing cannot be completed through available tools, identify the exact blocker. Do not substitute Work, cloud Chromium, a mock page, or another app download without approval.

## Fixed infrastructure

- Repo `bonoj/bonoj.github.io`, branch `master`, directory `jit/mcp/`
- Supabase project `iqglyokmcobegledbfcm`, function `jit-mcp-capabilities`
- Private plugin `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`
- Six signatures: `integration_ping`, `device_status`, `browser_observe`, `jit_capabilities`, `jit_invoke`, `jit_observe`
