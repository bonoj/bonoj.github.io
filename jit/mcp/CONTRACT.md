# Candidate device tool contract — not implemented

The bridge is deterministic. It does not run another language model.

## Stage 0: connectivity

`device_ping({}) -> {connected, device_id_alias, platform, observed_at, nonce, capabilities}`

Response must be produced by a live enrolled device; a hosted endpoint returning hardcoded JSON is insufficient. Never include persistent hardware identifiers.

## Stage 1: observation

`device_status({}) -> {foreground_app?, permission_state, capabilities}`

`browser_observe({}) -> {url?, title?, observation_method, observed_at}`

Observation must report its source and uncertainty. Android app sandboxing prevents arbitrary access to another app's internal browser DOM. User consent and OS permission are prerequisites.

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

Do not build Stage 1/2 until a real custom tool invocation from the target chat client is established. This contract is a test target, not a deployed API.
