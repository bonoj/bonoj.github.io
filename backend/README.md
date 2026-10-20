# Static-world memory

GitHub source for a shared Cloudflare Worker + D1 JSON event store. **Source committed; service NOT provisioned or deployed.** No Cloudflare connection or provisioning tool is currently available to the model.

Contract:
- `POST /v1/data/:namespace/:key` with a JSON object appends an immutable event.
- `GET /v1/data/:namespace/:key?limit=50` reads newest events.
- `GET /health` reports process health (does not test database connectivity).
- `OPTIONS` provides browser CORS preflight.

Anonymous writes are untrusted: this is suitable for telemetry and public experiments, **not authoritative save-state or confidential data**. Never send PII or secrets. Public reads expose everything stored. Requests are limited to 4 KiB, namespaces and keys to 64 URL-safe characters, and a coarse 30 writes/minute/namespace. This is not strong anti-abuse protection: namespaces can be rotated, and the quota table needs retention cleanup. Add platform-level rate limiting and data retention before public launch. GET is bounded to 100 events. No delete or overwrite.

## Provisioning boundary

Requires a Cloudflare account authorized for API deployment, a D1 database bound to Worker variable `DB`, applying `schema.sql`, and a Worker route/domain. None is yet configured or verified. Do not represent the GitHub commit as a live endpoint. Once an authorized deployment tool is available, create D1, apply schema, deploy Worker, and smoke-test POST then GET from an independent browser origin.

The first clients can be Application Forge and JIT worlds; the API has no knowledge of either.
