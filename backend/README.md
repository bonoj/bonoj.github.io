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

## Model operations and independent verification

Use the connected **Supabase** tools for project `iqglyokmcobegledbfcm`. Do not ask the human to copy JSON, download observations, or operate the Supabase dashboard.

- **Read world data:** the public HTTP endpoint, `GET /v1/data/{namespace}/{key}`, returns the stored events. This is the canonical runtime read contract.
- **Inspect database:** `execute_sql` can query `public.events` when permitted. If a SQL call is explicitly blocked by tool safety checks, do not evade the restriction or conclude that the service failed. Use supported telemetry to verify transport instead.
- **Verify HTTP transport:** `query_logs` reads Supabase's unified ClickHouse `logs` table. **Do not query a table called `edge_logs`.** Discover sources with `SELECT DISTINCT source FROM logs LIMIT 20`, then query:

```sql
SELECT timestamp, event_message
FROM logs
WHERE source = 'function_edge_logs'
ORDER BY timestamp DESC
LIMIT 15;
```

Successful browser evidence from Icarus on 2026-10-20: `OPTIONS 204` → `POST 201` → `GET 200` at `/functions/v1/memory/v1/data/icarus/observations`. This confirms server-side receipt and HTTP readback; it does not by itself prove the client-side ID equality assertion or rendered UI status.
- **Inspect errors:** `query_logs` with `source = 'function_logs'` can show function boot/error output. When investigating a specified time interval, pass ISO start/end arguments.
- **Deployment:** source lives in [supabase/index.ts](supabase/index.ts) and [supabase/schema.sql](supabase/schema.sql). Deploy with connected Supabase tools, then verify actual public requests. Source commit, function deployment, database persistence, and browser execution are distinct checkpoints.

**Status (2026-10-20):** Edge Function active v2; SQL database write/read succeeded; Icarus browser POST 201 and GET 200 observed in Supabase edge logs. Browser's final UI status remains unverified. GitHub is the source authority.
