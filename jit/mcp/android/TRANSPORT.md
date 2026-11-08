# JIT MCP Android transport v1 — implementation contract

**Status: DESIGN CONTRACT ONLY; not deployed.** Live production `jit-mcp-capabilities` v4 currently accepts gateway-secret authenticated text-only requests (max 2048 bytes). Its two E5 capabilities remain unchanged. The first-party `jit-page-demo` endpoint is unauthenticated and MUST NOT be reused for browser commands.

## Authority and enrollment

- Gateway authenticates the ChatGPT invocation with the existing installed plugin/session identity, **not** with a user-supplied device token.
- Device enrollment requires an explicit one-time confirmation in the foreground companion and a short-lived one-time pairing challenge issued through the authenticated gateway. Challenge expires after 5 minutes and can be consumed only once. Never display the gateway secret to the phone.
- Companion generates a random 256-bit device credential using Android Keystore-backed storage; server stores only a verifier or securely wrapped credential. Rotate/revoke per device. The browser page never receives this credential.
- A command must be scoped to authenticated account, enrolled device, live user-approved session and allowed operation. Device must explicitly be in a visible **Sharing / Remote control enabled** state; Stop revokes the active session immediately.
- Do not enable device enrollment from an anonymous Edge Function endpoint or from the public JIT demo.

## Data model (private schema; no public Data API grants)

`devices(id, owner_id, credential_verifier, enrolled_at, revoked_at)`
`sessions(id, owner_id, device_id, approved_at, expires_at, revoked_at, current_url, observation_revision)`
`commands(id, owner_id, device_id, session_id, operation, arguments, expected_revision, created_at, expires_at, claimed_at, completed_at, status, result)`

All identifiers random opaque UUIDs; ownership validated server-side against authenticated identity. Operations are typed and allowlisted; no arbitrary native method names or unbounded JavaScript from the chat tool. Device polls commands with atomic claim/lease and submits bounded result, including a device nonce and observed URL/revision. Duplicate delivery must not duplicate a click or form submission. Expired, revoked and stale commands are rejected before execution.

## Command and result envelopes

```json
{"protocol":1,"command_id":"uuid","session_id":"uuid","operation":"browser.observe","arguments":{},"expected_revision":null,"expires_at":"ISO-8601"}
```

```json
{"protocol":1,"command_id":"uuid","status":"completed","device_nonce":"random","observed_at":"ISO-8601","observation":{"url":"https://example.org","title":"Example","revision":1,"controls":[]}}
```

Other statuses: `pending`, `claimed`, `failed`, `expired`, `revoked`. The MCP dispatcher may return `pending` with a command ID; a separate `browser.result` capability retrieves completion. Never report `completed` on enqueue or claim.

## Runtime update channel

- Bundle is versioned, immutable and hosted over HTTPS; manifest includes version, minimum host version, SHA-256 digest and detached signature.
- The native host embeds a **trusted public signing key**, verifies signature over canonical manifest bytes, then digest of downloaded JS, before activation. Fail closed on invalid signatures, downgrade or incompatible host. Preserve packaged runtime as recovery fallback.
- Runtime executes in WebView page JS context and has **no native bridge**, tokens or direct privileged access. Device-side command validation precedes all evaluation. Observations are untrusted website data.
- A future signing key and secure deployment workflow must be provisioned before enabling remote updates. No unsigned remote JS execution as a shortcut.

## Integration constraints

Keep the six existing MCP tool signatures. Browser operations are versioned capabilities behind `jit_capabilities` and `jit_invoke`. Inspect the **live Site gateway** before extending its schema, and preserve E5 text/integer compatibility. Supabase `verify_jwt:true` alone does not establish per-user device authorization; account/device binding must be proven explicitly. Bound response size and redact passwords, tokens, cookies, and private field contents.

## Acceptance gate

Prove an ordinary ChatGPT command is authenticated, enqueued, claimed by the **foreground enrolled device**, executed against the actual WebView DOM, and independently read back with a fresh observation. Then demonstrate remote signed JS update with no APK reinstall. Only after both succeed, test two unrelated public websites.
