# Lattice — Earth + Orbit

**Cold-boot handoff and authoritative implemented-state README.** Read this first. Live target: **https://bonoj.github.io/jit/lattice/**. Source: [index.html](index.html). Current executable commit: `061f90de787322e64029be1e0bf846a387b5d7a4` (2026-10-20). GitHub publishing workflow [39461801533](https://github.com/bonoj/bonoj.github.io/actions/runs/39461801533) completed successfully at **12:57:03 EDT**, 2026-10-20. **The public page itself and live browser CORS/data retrieval have not been independently verified.** Do not claim otherwise.

## What this is

A mobile-first, single-page, browser-only, explorable Earth and ISS public-signal observatory. The *world* is the interface, not 50 disconnected dashboards. It is an initial executable slice of the [worldwide 53-channel candidate specification](SPEC.md), **not a 53-channel implementation**, an operational command platform, or a verified replacement for any existing product.

The app lives in one standalone HTML file with inline CSS/JavaScript and no backend. It does **not** use Supabase. It leaves the [Hormuz JIT](../hormuz/) untouched.

## Implemented — inspectable in index.html

- **Globe:** Canvas 2D orthographic sphere with longitude/latitude grid, stylized hand-authored continental outlines, selectable continent markers, ISS marker on the visible hemisphere, globe-centered camera for each region. This is a schematic illustration, **not a geospatially accurate coastline dataset**. The globe is **not automatically rotating or gesture-draggable**; region buttons change the camera center. Touch interaction with the canvas is not wired.
- **Navigation:** eight region buttons: World, North America, South America, Europe, Africa, Asia, Oceania, Antarctica, plus a ninth **ISS** view. All seven continents are selectable; World and ISS are additional views. On selection, the region changes and relevant source cards refresh. The ISS camera recenters only if a position has already been received at selection time.
- **UI:** one-page dark mobile layout, viewport-filling canvas, scrollable region selector and telemetry cards, UTC clock, source-state counts, refresh control, and local 👁 inspector. Desktop layout uses a side panel.
- **Telemetry adapter families (six):** Open-Meteo forecast (temperature, wind, humidity, precipitation requested); Open-Meteo Marine (wave height, sea-surface temperature, ocean-current velocity requested); Open-Meteo Air Quality (PM2.5, NO₂, dust requested); USGS ComCat earthquakes (regional M2.5+ query, last seven days, capped at 1,000 events); NASA EONET (up to 100 global open natural events); Where the ISS At (current ISS latitude, longitude, altitude, velocity and timestamp). The code has fetch/parse paths, but **no claim that any provider currently succeeds in a deployed browser**. No commercial AIS, individual vessel tracking, or authenticated source is implemented.
- **Geographic scope:** weather/marine/air sample **one configured point per continent**, not a complete continental field. The points are New York, Rio de Janeiro, London, Nairobi, Hormuz, Brisbane, and McMurdo. Some inland points are used for marine requests and may return no valid marine data; this is a known limitation, not a valid sea-state observation. Earthquake requests use regional bounding boxes. EONET is a global list regardless of selected region, not a regional filter. ISS is global.
- **States:** DUE, FETCHING, LIVE, STALE, ERROR; error text is displayed. LIVE means **the in-browser parser accepted a response**, not that the measurement is independently verified or truly live. Forecast/model and curated-event provenance is labeled at the provider level. Source timestamps are displayed where returned; earthquake and EONET cards currently use fetch time as a display timestamp rather than actual per-event observation time.
- **Scheduler:** five-second `setInterval` checks for due work, **not five-second polling of all feeds**. Forecast 15 minutes; marine/air/EONET/USGS 30 minutes; ISS 60 seconds. At most two requests are started per scheduler pass, and the code prevents simultaneous requests to the same host. Hidden-tab scheduling is paused and resumes when visible. Requests have a 12-second abort timeout and an error retry delay. **Caveat:** the code does not yet implement explicit 429 Retry-After parsing, true exponential backoff, conditional HTTP requests, or shared request caching across different geographic regions. Manual ↻ only runs the due scheduler; it does not force all sources to re-fetch.
- **Runtime 👁:** the eye toggles a local on-screen JSON observation with `schema:lattice-eye/v1`, build string `lattice/01`, UTC, selected region, latest ISS state, request counts, and per-channel fetch states/errors. `EYE_ENABLED` is a single source-code toggle. **No backend POST/GET, persistence, export/copy control, or collection of private information.** This is intentionally local; do not connect to Supabase unless explicitly requested.
- **Build identity:** footer currently displays the static label `BUILD · LATTICE/01`. This is **not** an automatically injected commit SHA; source SHA must be verified through GitHub independently.

## Current data flow

`Region selection → selected.channels → channels[id].build(region) → due-check scheduler → fetch → parse → records Map → cards / ISS overlay → optional local 👁 JSON`.

Data contracts and reusable WorldSpec interfaces are **planned**, not implemented. The existing code stores parsed display-oriented records, not the full normalized observation contract specified in [VET.md](VET.md). Some selected regions request the same global EONET/ISS endpoint and share a `@global` record key.

## Known engineering issues — prioritized

1. **Browser verification:** load public URL on mobile and desktop, inspect console/network, test actual response schemas and CORS for all six providers. Record a per-provider PASS/BLOCKED/ERROR matrix, not just source readback. Check Pages workflow and public build identity.
2. **Coastline correctness:** replace stylized polygons with a licensed/attributed geography dataset, clip polygons correctly at the horizon, handle antimeridian and polar visibility. The current polyline drawing can connect visible segments across hidden geometry and does not fill land.
3. **Coverage integrity:** use marine points offshore rather than inland city coordinates; show UNAVAILABLE when a model has no coverage. Distinguish global EONET event totals from region-filtered events. Validate time, units, and observed-vs-model-vs-reported provenance in normalized data.
4. **Scheduler robustness:** fix retry-delay calculation, parse Retry-After, implement per-host budgets, backoff, cache/deduplicate repeated provider requests, and ensure manual refresh behavior is explicit. Keep the five-second **due-check**, never slam APIs.
5. **Testing:** add deterministic parser fixtures and tests for missing fields, invalid timestamps, Antarctica, antimeridian, ISS data, tab visibility, request throttling and rendering. No automated fixture suite has been demonstrated for Lattice yet.
6. **Composition frontier:** implement source registry separate from channel manifest; a validated `WorldSpec` with regions, layers, transforms, and provenance; reusable 50-region instantiation benchmark. **Not implemented yet.**
7. **Expand source diversity:** [SPEC.md](SPEC.md) inventories **53 proposed channels** but only six adapter families are coded. Many inventory channels share providers. Audit licensing, schemas, CORS and access before enabling; never inflate active-feed counts by counting variables as independent providers.

## Cold-boot protocol

1. Read **this README**, then [VET.md](VET.md) (audit + precise implementation seams), [SPEC.md](SPEC.md) (53 candidate channels and regional coverage), [CHRONICLE.md](CHRONICLE.md) (verbatim historical decisions), and the actual [index.html](index.html). For global workflow conventions read [Sanctum Contract](https://github.com/bonoj/Sanctum/blob/main/CONTRACT.md) and [Gate](https://github.com/bonoj/Gate/blob/main/README.md).
2. Confirm the repository's current source commit and public deployment state; **do not assume** `061f90de` remains the newest executable build. Never mistake an Actions success for verified browser behavior.
3. Make the next smallest coherent functional improvement **in this JIT only**. Preserve all working regions and feeds. Prefer source accuracy and observable consequences over additional cards.
4. Run tests and real-browser smoke checks where tooling permits; record exact evidence and limitations. If a tool or source fails, inspect and recover via Gate rather than asking the human to manually shuttle files.
5. Update this README whenever implemented capabilities or invariants change; keep [CHRONICLE.md](CHRONICLE.md) as the development record, and [SPEC.md](SPEC.md)/[VET.md](VET.md) as planning and audit history. Avoid duplicated handoffs or a README that claims planned functionality is already live.
6. Commit, read back, verify workflow and public page, report exact SHA and actual verification level. Canonical URL: https://bonoj.github.io/jit/lattice/ .

## Invariants

**Public civilian and environmental data only.** No live military tracking. No fake AIS, no synthetic values labeled observed. Preserve data-source attribution, uncertainty and age. No secrets in browser source. No Supabase for raw telemetry. No backend required. No blanket five-second network polling. Keep mobile-first single-page presentation and clear operational states. Keep the world itself central to the UX. Maintain distinct labels for **specified, coded, committed, published, browser-verified**.

## References

- [SPEC.md](SPEC.md) — proposed worldwide inventory and architecture
- [VET.md](VET.md) — provider audit, implementation seams and acceptance plan
- [CHRONICLE.md](CHRONICLE.md) — verbatim human–model turn archive and build chronology
- [Hormuz JIT](../hormuz/) — original regional instrument, independent of Lattice
