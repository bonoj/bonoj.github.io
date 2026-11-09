# E7 — structured link observation

## Contract

E6 observation/revocation remains valid and backward compatible. Existing six plugin signatures, gateway authentication, enrollment, foreground consent, origin pinning, signed runtime verification and anti-rollback stay unchanged.

The E7 result extends the existing successful `browser.observe` payload with optional `links`: up to **five** objects `{text,href}`. Each label is nonempty, max 60 characters; each absolute HTTP(S) URL max 160 characters. Links are taken only from visible `a[href]` elements, with whitespace collapsed. No cookies, storage, hidden form values, passwords, click execution, or cross-origin fetching. Text/title/origin/timestamp/nonce/runtime_version remain unchanged. E6 result objects without `links` remain valid.

## Delivery

- Android `DeviceTransport.execute`: for signed runtime version >=3, sanitize and forward bounded `links`; for runtime v2, send legacy envelope.
- Supabase Edge Function `jit-mcp-capabilities` v6: validate both legacy and E7 envelopes; retain device authentication, owner binding and session checks.
- Signed runtime version 3: visible DOM link extraction; signing key and manifest format unchanged; activated on Share, cached after signature verification. The new runtime does not require a future APK for selector improvements.
- GitHub Android source commit `2f8bb5a`; Edge Function v6 deployed. New APK build and on-device verification pending.

## Acceptance

1. Existing E6 client still observes and stops sharing successfully.
2. Install the newly signed APK over existing installation **without uninstalling, clearing app data or re-enrolling**.
3. On a public HTTPS page containing visible anchors, tap Share. Confirm runtime 3.
4. Invoke `browser_observe_v1`, then `browser_result_v1` before expiry. Confirm actual page title/text, at least one real visible link label and absolute href, timestamp, nonce, version 3.
5. Stop sharing; a new observe request must fail with `foreground_session_required`.
6. Record actual UTC evidence in `EXPERIMENTS.md`; update `HANDOFF.md`. Do not mark E7 complete until the phone test passes.

## Boundaries

A page may have zero eligible links; that is not a protocol failure. Link extraction is observation only; navigation/click commands are outside E7. The result is capped because the existing Android request limit is 2048 bytes. No arbitrary remote JS execution is authorized beyond signed runtime releases.
