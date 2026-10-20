# Lattice — Universal Endpoint Transport Contract

**Status:** Required next implementation contract; design persisted, **not yet enforced in executable**. Applies to every current and future public telemetry endpoint. The next implementation must migrate all six existing adapter families before expanding the inventory.

## Principle
**One request path. No endpoint-owned fetch, scheduler, retries, or cache.** A provider adapter declares request intent and parses a response. The governor alone performs network I/O. A channel is a display/measurement mapping, not necessarily a distinct network call.

`endpoint declaration → transport governor → normalized observations → world`

## Endpoint declaration (validated on registration)
- Stable `id`, `provider`, `host`, `scope` (global / regional / point), `buildRequest(scope)`, `parse(payload, context)`.
- `cadenceMs`, `timeoutMs`, `maxResponseBytes`, `cacheTtlMs`, `retryPolicy` and attribution/provenance descriptor.
- Optional provider policy: minimum spacing, host concurrency, max requests per window, and documented provider-specific rate limits. Missing/invalid required policy rejects registration, not a silent fallback to aggressive polling.
- No arbitrary user-supplied URL execution; enforce HTTPS, approved host, permitted method, and no embedded secrets.

## Governor invariants
1. All network calls are made through one `governor.request(endpointId, scope)` API; adapters never call `fetch` or schedule timers. Static checks/tests reject direct fetch in adapters.
2. Normalize request identity from provider, method, canonical URL/query, relevant headers/body, and scope. Deduplicate identical in-flight requests and cache across views. Global feeds are keyed globally, not per selected region.
3. Enforce per-endpoint minimum cadence **and** per-host budgets across all regions. A due-check timer does not itself cause polling. Manual refresh cannot bypass limits or backoff. Do not schedule a fresh fetch merely because a view changes if equivalent data is fresh.
4. Use a bounded FIFO/fair queue with per-host concurrency and global concurrency caps; queued work is not lost when a host is busy. Prevent starvation when users switch regions.
5. On failures use capped exponential backoff with jitter, persisted per canonical request key until success. Respect HTTP 429/503 `Retry-After` (seconds or HTTP date), never retry sooner. Avoid retry storms after connectivity resumes.
6. Timeout with AbortController; abort or discard obsolete view work without cancelling requests still needed by other subscribers. Reject oversized responses and malformed payloads.
7. Suspend background polling when hidden or offline. Resume through visibility/online events with rate-limited queue drain, not a simultaneous burst.
8. Bounded cache by entry count/age; retain last good observation on transient failure and label STALE. Never present a failed or unavailable feed as LIVE. Explicit states: DUE, QUEUED, FETCHING, LIVE, STALE, ERROR, UNAVAILABLE.
9. Normalize each result with source, measurement/field, geographic scope, units, provider observation/model timestamp, fetch timestamp, kind (observed/modelled/reported/calculated), freshness, uncertainty when known, and validation errors. A fetch timestamp is **not** an observation timestamp.
10. Central 👁 counters and trace: attempted, completed, deduplicated, cache hits, throttled, retried, HTTP status, latency, queue depth, next due, backoff, and source error. Never log secrets or personal data.

## Acceptance gates
- Deterministic tests using fake clock/fetch: repeated clicks, region switching, shared global endpoint, two scopes on same host, offline/hidden transitions, 429 Retry-After, 503, timeout, parse failure, cache expiration, stale retention, and 50+ registered channels.
- Assert no request occurs before endpoint or host next-allowed time; no concurrent same-key requests; bounded in-flight and queue; eventual fair service; no 5-second blanket polling.
- Migrate weather, marine, air, USGS, EONET, and ISS without regressing existing views; keep Hormuz untouched.
- Record real browser network/CORS results separately from unit-test results. Do not call this contract implemented until tests and source readback show enforcement.

## Cold boot
Read [README.md](README.md), this contract, [VET.md](VET.md), [SPEC.md](SPEC.md), [CHRONICLE.md](CHRONICLE.md), then [index.html](index.html). Implement governor first, migrate six adapters, test, update README with evidence, then expand channels.
