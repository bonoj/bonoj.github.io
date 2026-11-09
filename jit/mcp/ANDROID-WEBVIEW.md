# JIT MCP — Android WebView Companion v1

**Status: HISTORICAL DESIGN SPECIFICATION.** The native companion is built, installed and has returned real v6 DOM observation, extraction and fill results. Full v6 acceptance remains open. For current status and next execution use [HANDOFF.md](HANDOFF.md); historical implementation gates below are not live instructions. [HANDOFF](HANDOFF.md) is the entrypoint; [BROWSER-AUTOMATION.md](BROWSER-AUTOMATION.md) is historical architecture analysis and is superseded wherever it requires hosted Chromium, forbids Android, or requires no phone-side runtime.

## Invariants

1. **Install the Android APK once.** All routine browser behavior and DOM automation changes deploy as versioned, remotely delivered JavaScript/configuration, not new APKs. Native updates may still be required for Android security fixes, OS compatibility, permission/API changes, or flaws in the immutable host; never promise literally zero future updates.
2. **Ordinary ChatGPT is the sole routine control and development interface.** No Work, laptop, ADB, Chrome pairing, split-screen, manual command relay, Railway, paid browser host, or repeated APK sideloads in the normal loop.
3. **Use the user's Android compute.** The companion owns a visible WebView; it is not a controller for Chrome's existing tabs or cookies. It must work on unmodified third-party websites, within WebView/browser security boundaries.
4. **Preserve the installed private JIT MCP plugin, its six tool signatures, Supabase project, gateway credentials, and successful E5 capability path.** Extend versioned capabilities behind `jit_capabilities` / `jit_invoke`.
5. **Do not claim browser action success until the WebView executes it and returns a fresh DOM-derived postcondition.** Never mistake queued commands or simulated state for browser control.

## Minimal architecture

Ordinary ChatGPT → existing JIT MCP gateway → authenticated Supabase command/result transport → Android companion → WebView / `evaluateJavascript` → real website DOM → result back over the same transport.

**Android APK (stable native shell):** Kotlin Activity with WebView, navigation lifecycle, JavaScript enabled for user-approved sessions, command dispatcher, `evaluateJavascript` bridge, secure enrollment and transport client, visible connection/status/stop controls, bounded foreground polling or long-lived connection with Android lifecycle handling, safe runtime loader, and strict origin/session authorization. Native code does not hardcode site-specific DOM operations.

**Remote runtime (mutable):** versioned JS bundles implementing DOM observation, accessible role/name/label extraction, bounded text extraction, stable element references with revision checking, click, fill with input/change events, scroll, back, and post-action observations. GitHub source; deploy via existing infrastructure; companion verifies signed manifest and bundle digest, caches last known good version, atomically activates compatible updates, and rolls back invalid bundles. Do not use unrestricted remote native code or grant new Android permissions through updates.

**Transport:** private user/device enrollment with revocable device identity; scoped authenticated commands with monotonic IDs, session IDs, expiry, expected observation revision, idempotency, and bounded payloads; device polls or receives work, executes once, posts results; gateway waits/polls for completed result or returns explicit pending/timeout. No public unauthenticated queues. Encrypt in transit; do not log tokens, credentials, cookies, or sensitive field contents. Explicit stop/revoke.

**Protocol:** `browser.session.start/status/stop`, `browser.navigate`, `browser.observe`, `browser.click`, `browser.fill`, `browser.scroll`, `browser.back`. Observations include URL/title, DOM-derived visible text, actionable elements (role/name/type/value when safe), opaque element refs, revision and timestamp. Actions require fresh refs and return a post-action observation or a specific error. Limit observation size, runtime and command concurrency. Handle page reloads, SPA updates, stale refs, redirects, iframe restrictions, unsupported sites, device offline and WebView background suspension.

**Security:** no untrusted page-to-native privileged bridge; `evaluateJavascript` operates in the page's context with origin constraints, never exposing gateway secrets. Treat page text as data, not instructions. Deny file/content/private-network/localhost/metadata navigation unless explicitly and safely scoped; validate redirects. WebView safe browsing, HTTPS defaults, no automatic permission grants, and explicit user approval for consequential submissions. Cross-origin frames are not freely inspectable. Chrome's existing sessions are not imported.

## Implementation gates

**G0 — production inspection:** Read live Site gateway, live Supabase `jit-mcp-capabilities` function and `EXPERIMENTS.md`. E5 backend-only iteration is verified; current backend supports only bounded text/integer and 2048-byte request bodies. Design a backward-compatible structured result/command envelope, accounting for gateway validation limits. No credential rotation.

**G1 — one-time APK:** Commit a minimal Android Studio/Gradle project under `jit/mcp/android/`; build release/test APK with GitHub Actions, preserving signing key securely for updates. Include WebView, enrolled authenticated command client, remote JS loader, visible status/stop, and diagnostics. Test locally/CI as possible. **Only then** ask the user for one APK installation and one-time enrollment. No repeated manual builds.

**G2 — real transport:** Add authenticated device queue/result service and versioned capability dispatch without replacing the existing plugin. Prove a command invoked in ordinary ChatGPT reaches the installed companion and a result returns. Do not claim a queued command is executed.

**G3 — remote DOM runtime:** Deploy signed JS v1 through GitHub-backed hosting. Demonstrate navigate → real DOM observation → grounded fill/click → fresh observation on an unmodified site. Ship a JS-only behavior change and verify it is adopted **without APK reinstall**.

**G4 — ordinary-chat acceptance:** From a normal Android ChatGPT conversation, with the companion running, perform navigate/observe/fill/click/observe on two unrelated uninstrumented public sites. Confirm postconditions, stop/revoke, and offline/timeout behavior. Record UTC evidence and exact versions in `EXPERIMENTS.md`.

## Guardrails and limits

The companion must be running/available; Android can suspend background processes. Prefer a user-visible foreground browser session; investigate foreground service only if truly necessary and compliant with Android restrictions. WebView is not full Chrome; some sites may reject it, and cross-origin frames, CAPTCHA, protected content and native browser tabs remain limited. Remote JS updates cannot fix missing native APIs. Preserve clear status labels: SPECIFIED, IMPLEMENTED, DEPLOYED, VERIFIED, BLOCKED. Do not divert into hosted Chromium or another counter demo without explicit user approval.
