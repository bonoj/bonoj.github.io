# E3 — Site-to-Android transport implementation brief

Status: **implemented and deployed 2026-11-08; production tool invocation and Android pairing verification pending**.

Implementation, deployment IDs, tested behavior and remaining limits are recorded in [EXPERIMENTS.md](EXPERIMENTS.md). Source mirror: [site/worker.mjs](site/worker.mjs).

## Goal

The installed private ChatGPT Sites plugin `JIT MCP` already exposes `integration_ping`. Add a second read-only tool, `device_status`, that reports a real, enrolled Android browser session, not synthetic data.

The plugin's existing app binding and `integration_ping` must remain intact. Do not edit the GitHub Python server as if it were the hosted Site.

## Smallest end-to-end experiment

1. Host an Android-facing companion page on the same ChatGPT Site at `/device`. It must be mobile-first and show the connection state, a short-lived pairing code, and a prominent Disconnect control.
2. Create a server-side ephemeral session store with 10-minute TTL, keyed by cryptographically random session IDs. Store only a pseudonymous device alias, last-seen UTC time, user agent summary, and capability flags. Never store cookies, browser history, page content, or persistent hardware IDs.
3. Implement a pairing handshake. The Android page generates/requests a one-time code. The user explicitly confirms pairing. The plugin tool can then query only the paired session. Do not let possession of a short code alone authorize a session without a second explicit approval step. Rate-limit code attempts.
4. Android page sends a heartbeat every 15–30 seconds while open, with `document.visibilityState`, user agent platform summary, and UTC time. If page is hidden or heartbeat expires, report stale/offline, not connected.
5. Add `device_status()` MCP tool returning `{paired,online,observed_at,age_seconds,platform,visibility,capabilities}`. The result must originate from the browser heartbeat and distinguish server time from device time.
6. Add `device_disconnect()` tool only if it can safely revoke the session. Do not add click/type/navigation or other remote commands yet.
7. Test: open `/device` in Android Chrome, pair, call `device_status` from an ordinary ChatGPT Android chat, close page, wait for timeout, call again. Record exact observed results.

## Engineering constraints

- No additional LLM inference, external paid agents, or Work as the operational runtime.
- Do not expose the session store or token values to the public JIT repository.
- Use authenticated server-side storage, not in-memory state that can silently disappear across server instances; if the Site cannot provide such storage, stop and report the actual limitation.
- A website tab is not an Android OS agent. This experiment proves ChatGPT ↔ Site ↔ Android browser transport, **not** Chrome DOM control, accessibility, or background device control.
- Keep every tool scoped to the currently authenticated plugin user; never allow arbitrary session enumeration.
- No broad remote execution, no credentials, no account actions.

## Success criterion

`device_status` returns fresh, verifiable Android browser data from a paired session in an ordinary chat. A hardcoded `connected_device:true` is a failure.

## Implementation surface

Hosted Site: `https://jit-mcp.bracedbuddy1.chatgpt.site`

Plugin backend ID: `plugin_asdk_app_sites_1d9a5f42945c81918eff9f533e9e1f6d`

Current repo documents: `jit/mcp/README.md`, `EXPERIMENTS.md`, `CONTRACT.md`.

Site source is **not exposed** through the plugin's two manifest files. Use the Site editor/Plugin Creator to implement the server and client. Do not overwrite the App binding through Plugin Creator archive updates.
