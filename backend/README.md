# Hermeticon Memory — shared backend

**Live deployment:** Supabase project `Hermeticon Memory` (`iqglyokmcobegledbfcm`), Edge Function `memory` version 2, reported ACTIVE on 2026-10-20. GitHub is source authority.

**Endpoint:** `https://iqglyokmcobegledbfcm.supabase.co/functions/v1/memory`

- `POST /v1/data/{namespace}/{key}` with a JSON object appends an event.
- `GET /v1/data/{namespace}/{key}?limit=50` returns latest events (maximum 100).
- `GET /health` reports function health, not database connectivity.
- `OPTIONS` allows browser CORS.

Source: [supabase/index.ts](supabase/index.ts), [supabase/schema.sql](supabase/schema.sql). The original Cloudflare [worker.js](worker.js) and [schema.sql](schema.sql) are **superseded, not deployed**.

**Verification:** database RPC append and SQL readback succeeded for `smoke/roundtrip` payload `{"value":42}`. Function deployment ACTIVE v2. **External HTTP POST/GET remains unverified** because the available local HTTP runtime cannot resolve the public domain. Do not claim browser-tested until an independent HTTP test succeeds.

**Security boundary:** public, anonymous, untrusted, append-only events; public reads. No PII, secrets, authoritative saves, or authentication. Maximum 4096-byte JSON object, URL-safe namespace/key maximum 64 chars, coarse 30 writes per minute per namespace (atomic database RPC). This quota is bypassable by namespace rotation. Before wider launch add edge rate limiting, retention and quota pruning, and abuse monitoring. The service-role key stays in Supabase server environment only, never in browser code or GitHub.

**Operating rule:** future backend changes originate in GitHub, deploy through connected Supabase tools, then independently verify live behavior. Preserve other worlds.
