# Hermeticon Memory

Shared anonymous, append-only JSON storage for GitHub Pages and other static sites.

**Live endpoint:** `https://iqglyokmcobegledbfcm.supabase.co/functions/v1/memory`
**Supabase project:** `iqglyokmcobegledbfcm` (Hermeticon Memory)
**Source:** [supabase/index.ts](supabase/index.ts) · [supabase/schema.sql](supabase/schema.sql)

## Browser contract

```js
const base = "https://iqglyokmcobegledbfcm.supabase.co/functions/v1/memory";
const path = "/v1/data/demo/session_1";
await fetch(base + path, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({event:"opened"})
});
const {events} = await (await fetch(base + path)).json();
```

POST appends an immutable JSON object and returns `{ok:true,id}` (201).
GET returns `{namespace,key,events:[{id,at,value}]}`, newest first; `?limit=50` default, max 100.
GET `/health` checks the function only. OPTIONS supports CORS.

**Boundaries:** Anonymous and public: never store secrets, PII, or trusted game state. JSON object max 4096 bytes; namespace and key 1–64 alphanumeric/underscore/hyphen characters; coarse 30 writes/minute/namespace. No overwrite/delete. Quotas are not bot-proof. The quotas table needs periodic pruning, and public rollout should add edge-level abuse controls. All database operations run server-side; never expose the service-role key.

**Status (2026-10-20):** Supabase Edge Function active v2; database SQL write/read succeeded. Independent browser HTTP POST/GET still needs verification. GitHub holds authoritative source; deployed changes must be checked against it.
