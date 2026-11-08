# MCP — Chat-to-Device Lever Laboratory

[Android companion](https://jit-mcp.bracedbuddy1.chatgpt.site/device) · [Experiments](EXPERIMENTS.md) · [E3 specification](E3-TRANSPORT.md)

Status: **E2 and E3 verified in ordinary ChatGPT; E4 browser observation pending.**

## Objective

The existing ChatGPT conversation supplies reasoning and agency. JIT MCP supplies deterministic communication with a user-authorized browser. No second model, paid inference service, or ongoing Work session is required.

## Active implementation

The existing private JIT MCP Site hosts a Cloudflare Worker and authenticated D1 session storage. [site/worker.mjs](site/worker.mjs) is a source mirror of the hosted implementation. GitHub Pages is not the transport runtime. The independent [server.py](server.py) Python probe is not the installed plugin.

- Companion: https://jit-mcp.bracedbuddy1.chatgpt.site/device
- Plugin: `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`
- Site: `appgprj_6af07fda46ec8191a71e9df6f4bc9e75`
- Tools: `integration_ping()` and the newly deployed `device_status()` endpoint.
- Existing plugin/App identity, private audience and bindings preserved.

## Pairing and lifetime

Open the companion in Android Chrome, sign in with the same ChatGPT account if prompted, start pairing, re-enter its displayed code, and confirm. Keep the page visible. The token stays in page memory; reload requires pairing again. Only one session per authenticated user is retained; starting another pairing replaces the previous session.

Pairing codes expire after two minutes and lock after five attempts. Sessions expire ten minutes after enrollment, regardless of activity. Heartbeats occur every 20 seconds while visible. A hidden heartbeat immediately marks the session stale; absent heartbeats mark it offline after 45 seconds. Disconnect revokes the session immediately. The server clock governs freshness and expiry.

## Verification and limits

The production Site deployed successfully, and the original plugin's ping still works. Local real-browser testing verified a Linux browser heartbeat, recurring updates and Disconnect. SQLite-backed tests verify authentication, isolation, CSRF protection, pairing, expiry and revocation.

**Production E3 verified on Android (2026-11-08):** ordinary ChatGPT invoked `device_status()` and independently received a paired Android session with fresh browser-originated nonce, timestamp, and `visibility:hidden` / `state:stale`. An earlier visible/online result was supplied by the user. See EXPERIMENTS for exact evidence. Real >45-second timeout and Android OS/browser control remain unverified.

A browser page does not provide Android OS, unrelated-tab DOM, screen capture, accessibility or background access. Moving from Chrome to ChatGPT normally hides the page and therefore reports stale; use split-screen if both need to remain visible.

## Development

Read README, EXPERIMENTS, CONTRACT and E3-TRANSPORT before continuing. Modify the existing Site source through Sites, then mirror reviewed source here. Never replace the plugin or overwrite its App binding.

`cd jit/mcp/site && node test.mjs` runs the dependency-free SQLite transport tests (Node 24). `node build.mjs` emits the Worker. `preview.mjs` is a local QA adapter with an explicit test identity and in-memory SQLite; it is **excluded from the production bundle**. Hosted production uses Sites-authenticated identity and D1.

The 10-minute TTL is enforced on all access. Physical expired-row deletion is opportunistic on the next authenticated device API request; no periodic purge is configured. No logs, token values, cookies, raw user agents, browser history or hardware IDs are stored by the application.
