# JIT MCP — handoff

**Start here:** [ANDROID-WEBVIEW.md](ANDROID-WEBVIEW.md) is the **binding, noise-free specification** for the current implementation. Read it first. [EXPERIMENTS.md](EXPERIMENTS.md) is the evidence log. [BROWSER-AUTOMATION.md](BROWSER-AUTOMATION.md) documents the earlier cloud-browser proposal; its hosted-Chromium and no-Android assumptions are **superseded**.

## Latest checkpoint — E6 observation transport deployed

Site deployment `appgdep_6af115a40e10819180dc38526469a281` and Supabase function v5 are live. E5 readback still works. The Android source now implements one-time enrollment, foreground observation and signed JS verification. The phone acceptance remains open. The exact E6 commit built in [Actions run 42541309034](https://github.com/bonoj/bonoj.github.io/actions/runs/42541309034), artifact 13641212121. The extracted APK signature and embedded runtime public key were independently verified. Install [jit-browser-e6.apk](https://chatgpt.com/library?file_id=libfile_372c7b20d64481918ba3cce5fd920a6e&account_id=personal) once. In ordinary ChatGPT request `jit_invoke({capability:"browser_pair_v1",input:{}})`, enter its short-lived code in the companion, open a public HTTPS site, and tap **Share page text**. With the companion still foreground, invoke `browser_observe_v1`, then `browser_result_v1` with the returned command ID. Record the fresh DOM text, nonce, UTC timestamp and runtime version. Test Stop sharing. This release queues observation only.

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

## Android signing-key recovery

The permanent Android APK signing key is backed up as **AES-256-CBC encrypted ciphertext**, not a plaintext keystore:

- [Encrypted keystore backup](secure-backups/jit-release.jks.enc.b64)
- [GitHub Actions signing secrets](https://github.com/bonoj/bonoj.github.io/settings/secrets/actions): `JIT_APK_KEYSTORE_BASE64` and `JIT_APK_KEYSTORE_PASSWORD`.

**Never commit the plaintext keystore or signing password.** This repository is public. The backup was encrypted with OpenSSL `enc -aes-256-cbc -pbkdf2 -iter 250000 -salt`, using the separately stored signing password. Recover locally using the password from your private secret store:

```sh
base64 -d jit/mcp/secure-backups/jit-release.jks.enc.b64 > /tmp/jit-release.jks.enc
openssl enc -d -aes-256-cbc -pbkdf2 -iter 250000 \\
  -in /tmp/jit-release.jks.enc -out jit-release.jks
keytool -list -keystore jit-release.jks -alias jit-browser
```

Expected signing certificate SHA-256: `56:7C:25:EB:D8:87:15:FC:F1:57:F6:8C:70:0F:C4:E7:60:14:87:FD:74:73:62:F7:DA:87:CB:9B:26:C9:11:77`.

Keep the password independent of this repository. An encrypted copy in public GitHub is not a substitute for a separately protected offsite backup.
