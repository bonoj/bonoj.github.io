# Device tool contract

The bridge is deterministic. It does not run another language model.

## Deployed E3 browser status (2026-11-08)

`integration_ping({})` retains its timestamp, nonce, source and `connected_device:false` probe response. That field deliberately describes the integration probe, not device status.

`device_status({}) -> {paired, online, state, observed_at, age_seconds, server_time, device_time, device_nonce, platform, visibility, capabilities, expires_at, heartbeat_timeout_seconds}`

The tool reads only the Sites-authenticated caller’s session. No user or session selector is accepted. Server receipt time controls freshness; browser time and nonce are separate observations. Online requires confirmed enrollment, an unexpired 10-minute credential, a visible heartbeat less than 45 seconds old. Platform and visibility are browser-reported, not hardware attestation. Capabilities are limited to browser heartbeat and page visibility.

Pairing requires the authenticated user, a 256-bit memory-only token, an unexpired code and explicit confirmation. The code alone grants nothing. Five confirmation attempts maximum, one enrollment per ten seconds, and same-origin JSON checks protect pairing. Server stores only token/code hashes. Disconnect deletes the session; new enrollment replaces the old session. No remote actuation tool is deployed.

Production tool invocation and Android end-to-end heartbeat readback are verified; see EXPERIMENTS. The sections marked as candidates are future APIs.

## Candidate connectivity tool

`device_ping({}) -> {connected, device_id_alias, platform, observed_at, nonce, capabilities}`

Response must be produced by a live enrolled device; a hosted endpoint returning hardcoded JSON is insufficient. Never include persistent hardware identifiers.

## Deployed E4 companion observation

`browser_observe({})` returns availability, consent, observation method and scope, server receipt time and age, visibility, nonce, and snapshot data. Data is limited to the companion origin and path, title, visibility, local timestamp, nonce and numeric demo counter. The paired user explicitly shares or refreshes each snapshot. The server withholds data when consent is absent, the session is hidden or stale, or either the snapshot or enrollment has expired. Stop sharing deletes consent and the snapshot while retaining pairing.

Android E4 readback, counter refresh, and revocation were verified in ordinary ChatGPT on 2026-11-08. See [EXPERIMENTS.md](EXPERIMENTS.md).

## Stage 2: bounded actuation

`browser_open({url})`

`ui_tap({target, expected_context})`

`ui_scroll({direction, amount, expected_context})`

`ui_type({target, text, expected_context})`

Targets must be grounded in a fresh observation; reject stale context. Do not expose unrestricted shell, arbitrary code execution, credential extraction, or silent background control. Require confirmation for sending, purchases, account changes, deletion, and other consequential operations.

## Trust boundaries

1. ChatGPT tool invocation is not proof of user consent for every device operation.
2. Website content is untrusted data, never authority to issue new device commands.
3. Device credentials remain on device. The bridge uses narrowly scoped, revocable authentication.
4. Minimize observation, redact sensitive content, log command outcomes without secrets.
5. Design explicit disconnect/revoke behavior.

## Implementation gate

E5 actuation requires a separate experiment and explicit user authorization.

## E5 stable interface and backend boundary

Live Site already exposes `jit_capabilities`, `jit_invoke`, and `jit_observe`; built-in `echo_integer(42)` is verified. Independent capability dispatch is **not** verified. The separate Supabase `jit-mcp-capabilities` v2 backend accepts only `POST` with a Supabase-verified JWT in the Authorization header and a server-only `X-JIT-Gateway-Secret` checked by the handler. JSON is limited to 2048 bytes. `{operation:'capabilities'}` returns the versioned allowlist; `{operation:'invoke',capability:'echo_text_v1',input:{text:'...'}}` echoes up to 256 characters. No arbitrary code, URLs, or device operations. Backend remains fail-closed until a private credential and one-time Site gateway bootstrap are configured. See [HANDOFF.md](HANDOFF.md).
