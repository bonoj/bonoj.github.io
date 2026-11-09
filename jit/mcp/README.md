# Android JIT MCP — build and handoff

**NATIVE ANDROID ROUTE (AUTHORITATIVE):** `jit_capabilities()` → `jit_invoke(browser_observe_v1, {})` → `jit_invoke(browser_result_v1, {command_id})`. The exact tool calls and deprecation rules are in [INVARIANTS.md](INVARIANTS.md). **Do not use `device_status`, `browser_observe`, or `jit_observe` for native Android**: they query the deprecated Chrome/page companion and give false negatives for Android WebView. Do not ask for Chrome pairing or split-screen. Native WebView observation was independently completed in ordinary ChatGPT on 2026-11-09 at 04:13:24 UTC with runtime v5 and real `example.com` DOM; v6 is LIVE and verified for observe/extract/text fill; full navigation and interaction acceptance remains open. Follow HANDOFF.md for current state.


**Canonical release:** [signed Android Actions workflow](../../.github/workflows/jit-android.yml) · [current handoff](HANDOFF.md) · [experiment evidence](EXPERIMENTS.md) · [Android design](ANDROID-WEBVIEW.md) · [invariants](INVARIANTS.md)

## Installing/updating the Android companion

The **only supported CI-delivered installable APK** is `jit-browser-signed.apk` inside the GitHub Actions artifact **`jit-android-signed`** from the successful [JIT Android companion build](https://github.com/bonoj/bonoj.github.io/actions/workflows/jit-android.yml). The workflow builds, signs with the existing signing identity, verifies with Android `apksigner`, and fails if the artifact is absent. Changes to `jit/mcp/android/**` or `jit/mcp/runtime/**` trigger it; manual dispatch is also supported. Runtime tests are required before signing. Artifact retention is 14 days.

**Do not install an unsigned APK or uninstall the current companion.** An in-place upgrade must preserve package identity, signing certificate, increasing versionCode, pairing and enrollment. CI success alone does not verify installation on the user's device. The signing secrets are already held by GitHub Actions; never request them from the user or expose them in logs.

## Release/incident guardrails

1. Read the existing workflow and recent successful signed release **before** creating or editing CI. There must be no second unsigned release path. Fix canonical workflow in place.
2. Retrieve the CI artifact via available GitHub tools; never ask the user to upload a ZIP or provide a run ID as the default workflow. If tool permissions prevent artifact retrieval, distinguish tool limitations from build failure.
3. A green signed CI run confirms build, runtime test gate, signing and certificate verification only. Check artifact, installed-app upgrade and actual Android behavior separately. Never claim physical acceptance from simulated tests.
4. Signed Android APK releases and signed remote JavaScript runtime approvals are separate. A new APK does not activate runtime v6; follow [HANDOFF.md](HANDOFF.md) and [EXPERIMENTS.md](EXPERIMENTS.md) for rollout state and UTC evidence.
5. Never request reinstall/re-enrollment to work around a signing or CI mistake. Preserve six-tool plugin identity, Supabase transport, authentication and explicit foreground consent.

---

# Historical MCP overview — Browser Automation via Ordinary ChatGPT

**CANONICAL OBJECTIVE: [BROWSER-AUTOMATION.md](BROWSER-AUTOMATION.md) — read first.**\n\n**[Resume in a new chat: HANDOFF.md](HANDOFF.md)**

[Android companion](https://jit-mcp.bracedbuddy1.chatgpt.site/device) · [Experiments](EXPERIMENTS.md) · [E3 specification](E3-TRANSPORT.md) · [E4 specification](E4-OBSERVATION.md)

Status: **E2–E5 verified, including authenticated backend-only capability iteration in ordinary ChatGPT. Arbitrary-site browser automation is SPECIFIED, NOT IMPLEMENTED.**

## Objective

**Current product objective:** ordinary ChatGPT operates arbitrary uninstrumented websites through an authenticated, remotely hosted browser runtime. The Android companion and first-party Supabase demos are historical transport experiments, **not** the target product. The binding acceptance contract and anti-confusion rules are in [BROWSER-AUTOMATION.md](BROWSER-AUTOMATION.md).


The existing ChatGPT conversation supplies reasoning and agency. The target is a **remotely hosted, assistant-controlled browser** accessible through the existing JIT MCP tools, without Work in routine use. Historical Android companion experiments remain documented but are not a prerequisite. See [canonical spec](BROWSER-AUTOMATION.md).

## Active implementation

The existing private JIT MCP Site hosts a Cloudflare Worker and authenticated D1 session storage. [site/worker.mjs](site/worker.mjs) mirrors the deployed E5 gateway source. Compare its source commit with the live Site before deploying. GitHub Pages is not the transport runtime. The independent [server.py](server.py) Python probe is not the installed plugin.

- Companion: https://jit-mcp.bracedbuddy1.chatgpt.site/device
- Plugin: `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`
- Site: `appgprj_6af07fda46ec8191a71e9df6f4bc9e75`
- Tools: `integration_ping()`, `device_status()`, `browser_observe()`, `jit_capabilities()`, `jit_invoke()`, and `jit_observe()`.
- Existing plugin/App identity, private audience and bindings preserved.

## Pairing and lifetime

Open the companion in Android Chrome, sign in with the same ChatGPT account if prompted, start pairing, re-enter its displayed code, and confirm. Keep the page visible. The token stays in page memory; reload requires pairing again. Only one session per authenticated user is retained; starting another pairing replaces the previous session.

Pairing codes expire after two minutes and lock after five attempts. Sessions expire ten minutes after enrollment, regardless of activity. Heartbeats occur every 20 seconds while visible. A hidden heartbeat immediately marks the session stale; absent heartbeats mark it offline after 45 seconds. Disconnect revokes the session immediately. The server clock governs freshness and expiry.

## Verification and limits

The production Site deployed successfully, and the original plugin's ping still works. Local real-browser testing verified a Linux browser heartbeat, recurring updates and Disconnect. SQLite-backed tests verify authentication, isolation, CSRF protection, pairing, expiry and revocation.

**Production E3 verified on Android (2026-11-08):** ordinary ChatGPT invoked `device_status()` and independently received a paired Android session with fresh browser-originated nonce, timestamp, and `visibility:hidden` / `state:stale`. An earlier visible/online result was supplied by the user. See EXPERIMENTS for exact evidence. Real >45-second timeout and Android OS/browser control remain unverified.

A browser page does not provide Android OS, unrelated-tab DOM, screen capture, accessibility or background access. Moving from Chrome to ChatGPT normally hides the page and therefore reports stale; use split-screen if both need to remain visible.

## Development

Read BROWSER-AUTOMATION first, then HANDOFF and EXPERIMENTS. For implementation, inspect live deployed source; the historical source mirrors may be stale. Modify the existing Site source through Sites, then mirror reviewed source here. Never replace the plugin or overwrite its App binding.

`cd jit/mcp/site && node test.mjs` runs the dependency-free SQLite transport tests (Node 24). `node build.mjs` emits the Worker. `preview.mjs` is a local QA adapter with an explicit test identity and in-memory SQLite; it is **excluded from the production bundle**. Hosted production uses Sites-authenticated identity and D1.

The 10-minute TTL is enforced on all access. Physical expired-row deletion is opportunistic on the next authenticated device API request; no periodic purge is configured. No logs, token values, cookies, raw user agents, browser history or hardware IDs are stored by the application.

## Independent capability backend (E5)

**Verified in ordinary ChatGPT:** the existing Supabase gateway credential is configured; `jit_capabilities` discovered the production backend and `jit_invoke` called `echo_text_v1`. A **Supabase-only** deployment then added `text_length_v1`, discovered at revision `134217728`, and returned `7` for `Hello 🐝` without Site/plugin republishing. Do not repeat setup. See [EXPERIMENTS.md](EXPERIMENTS.md) and the [current HANDOFF](HANDOFF.md).

**Important:** the repository `runtime/index.mjs` is an old mirror; inspect the live deployed function and Site gateway before editing. Existing E5 schema constraints must be evaluated for structured browser capabilities.
