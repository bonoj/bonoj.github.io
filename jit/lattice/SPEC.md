# Lattice — 53-channel ingestion contract

**Authority:** This document specifies the target, not the currently implemented state. [README](README.md) records implemented behavior; [CHRONICLE](CHRONICLE.md) preserves historical decisions and prior specification text. [VET](VET.md) contains the initial provider audit.

## Governing priority — MAXIMUM VACUUM (human directive, 2026-10-20)

**This section overrides any conflicting implementation sequence, acceptance gate, quota, or next-step recommendation elsewhere in this document, VET, README, or CHRONICLE.** The primary objective is to ingest the maximum useful breadth and depth of legitimate public civilian Earth and orbital telemetry. The 53-channel inventory is a **minimum audit backlog, never an ingestion ceiling**. Source diversity, geographic reach, independent phenomena, and useful record coverage outrank presentation, catalog bookkeeping, and infrastructure polish.

### Mandatory work order

1. **Expand real ingestion first.** Implement and exercise previously untouched eligible source families: NOAA CO-OPS, USGS Water, NDBC, EMSC, Geoscience Australia, BOM, NWS forecast grids; then pursue additional public sources beyond the original 53. Reuse the existing USGS, EONET, NWS, UK EA, Open-Meteo and ISS responses to capture additional distinct signals without redundant requests. Prefer genuinely independent sources over merely multiplying sampled variables.
2. **Confirm data gathering as part of each addition.** Run actual HTTP/schema checks and deterministic adapter tests; record precise source/deployment/browser evidence separately. When browser-origin CORS remains untested, label it unverified rather than treating CI as browser proof. Preserve useful raw record coverage where permitted; never invent a successful sample.
3. **Continue expanding.** An eligible, tested source is a reason to add the next source, not to stop for polishing. Record inaccessible, empty, key-gated, terms-restricted, or invalid candidates with evidence and move on. Do not force an arbitrary channel count or spend turns repeatedly re-auditing already-working plumbing.

### Explicit anti-distraction rules

- **Do not pivot to persistence, replay, historical comparison, visualization, globe geometry, WorldSpecs, UX controls, dashboards, cosmetic refactoring, or telemetry-report redesign while eligible unintegrated sources remain.** These are deferred work, not the next frontier.
- **Do not make the 53-channel verification ladder a blocking prerequisite to expanding ingestion.** Maintain honest status as integrations proceed; do not devote an entire development turn to promotion or manifest grooming in place of acquiring new sources.
- **Do not replace the existing governor, CI, publisher, cache policy, or instrumentation without a demonstrated defect that blocks intake.** Fix genuine blockers minimally, then return immediately to source expansion.
- **Do not treat aggregate transport success, a configured endpoint, a queued request, or a passing static assertion as proof of successful normalized data.** Prefer successful source payloads and extracted records. Respect provider terms, quotas, CORS and the no-secrets browser constraint.
- **Do not ask the human to debug provider plumbing or manually repeat routine endpoint tests.** Use the existing automation and tests, and ask for browser evidence only when genuinely necessary.
- **No artificial quotas, milestone ceilings, or premature declarations of completion.** The work continues while useful eligible sources remain.

### Definition of a productive development turn

A normal advance (➡️) should **add and test at least one previously unintegrated independent provider/source family or materially expand the real records/geography ingested by an existing provider**. If that cannot be achieved, report the concrete blocker and the next eligible source; do not substitute unrelated infrastructure work. Keep the operational handoff concise and update the chronicle only with material evidence.

## Objective

Integrate and independently verify every eligible channel in the 53-channel candidate inventory before expanding human-facing tooling. A channel is a distinct signal, not necessarily an independent HTTP request. Never claim all 53 are live until evidence supports each claim. Unsupported channels remain explicit BLOCKED or UNAVAILABLE entries, with cause and next action.

## Non-negotiable implementation boundaries

- Preserve the existing standalone browser-only JIT, canonical URL, mobile-first single-page world, Hormuz isolation, and shared GitHub Pages publisher. No new cache-busting mechanism or shared-workflow changes.
- No Supabase, embedded secrets, unauthorized scraping, synthetic observations, live military tracking, or blanket five-second polling.
- All network access uses the existing governor: host concurrency, deduplication, cadence, bounded response, timeout, Retry-After, backoff, last-good cache, and hidden/offline suspension. One upstream response may satisfy many channels.
- Distinguish observed, reported, modeled, forecast, predicted and derived data. Preserve time, units, location, source URL, attribution, licensing and missingness. Forecast is not measurement; ISS ground track is predicted, not observed.
- Do not expand visual UX while ingesting. Existing 👁 is a diagnostic snapshot, not a demand for new controls.

## Machine-readable manifest and channel contract

Maintain one versioned manifest keyed by the exact numeric channel IDs 01–53, recording: id, region, channel name, provider, adapter, endpoint builder/parameters, request group, cadence, auth/terms/CORS classification, parser, fields, units, geographic sample/extent, signal kind, attribution, and verification status. IDs are stable; revisions never silently substitute a different phenomenon. Mark regional samples as samples, not continent-wide observations. Coalesce shared provider queries where safe.

Normalize records to: `{channelId, providerId, kind, geometry, observedAt, publishedAt, fetchedAt, validAt, value, unit, quality, sourceUrl, transformVersion}`. Nullable fields remain null; no default zero for absent data. Multi-value payloads may create multiple records. Carry provenance through all transforms.

## Verification ladder

Each channel independently advances through `SPECIFIED → CODED → SOURCE_TESTED → BROWSER_VERIFIED`. A committed source file or a successful provider response outside the browser is not browser verification. Separately record `BLOCKED_AUTH`, `BLOCKED_CORS`, `BLOCKED_TERMS`, `UNAVAILABLE`, and `ERROR`, with timestamp and evidence. Verification evidence includes response status/content type, parsed fields, valid units and timestamp, sample location, source age, attribution, and browser origin/CORS result. A successful empty query can prove transport/schema, not an active event.

## Execution and acceptance

1. Inventory existing ten coded adapter families and all 53 requested channels. Reuse, do not fork, the governor and parsers. Add deterministic fixtures and tests for parsers, missing values, regional filters, polar/antimeridian coordinates, timestamps, batching, deduplication, and 429/503 recovery.
2. Implement the full manifest and normalized adapter mapping. First prioritize shared Open-Meteo, USGS, EONET, ISS, NWS and UK EA groups; then NOAA CO-OPS, USGS Water, NDBC, EMSC, Geoscience Australia and BOM, using verified endpoints and legally permitted browser access.
3. Investigate NASA FIRMS, hormuz.now and Eagle Intelligence individually for auth, browser CORS, data meaning, licensing and endpoint validity. Do not bypass provider controls or silently replace those channels. Document a substitute as a proposed SPEC revision if necessary.
4. Exercise the real browser on the canonical origin. Collect per-channel proof, not only per-provider proof. Distinguish no events from broken parsing. Preserve last-good state and expose diagnostic failures via 👁 without adding UI clutter.
5. Acceptance: all 53 IDs accounted for; every eligible channel coded, fixture-tested and browser-verified; each ineligible channel explicitly blocked with evidence; no fake green statuses; no regression to working World/ISS feeds; source, deployment and browser identity recorded separately.

## Source inventory: 53 distinct telemetry channels

A *channel* is a distinct measured/reported variable, feed category, or regional query; **53 channels do not mean 53 independent organizations or APIs**. Multiple channels deliberately reuse well-documented APIs and query different variables/regions. All below are *candidate integrations*, not 53 verified functioning browser feeds. Exact query parameters, CORS, license, response schema, geography, temporal resolution, and limits must be verified per adapter before claiming live.

| # | Geography | Telemetry channel | Provider | Response | Proposed minimum cadence | Documentation / entrypoint |
|---:|---|---|---|---|---|---|
| 01 | North America | USGS ComCat earthquakes | USGS FDSN | JSON | 30m | https://earthquake.usgs.gov/fdsnws/event/1/ |
| 02 | North America | NOAA CO-OPS water levels | NOAA CO-OPS | JSON | 6m | https://api.tidesandcurrents.noaa.gov/api/prod/ |
| 03 | North America | NOAA CO-OPS tidal predictions | NOAA CO-OPS | JSON | 12h | https://api.tidesandcurrents.noaa.gov/api/prod/ |
| 04 | North America | NOAA CO-OPS water temperature | NOAA CO-OPS | JSON | 30m | https://api.tidesandcurrents.noaa.gov/api/prod/ |
| 05 | North America | NOAA CO-OPS wind observations | NOAA CO-OPS | JSON | 15m | https://api.tidesandcurrents.noaa.gov/api/prod/ |
| 06 | North America | NWS active weather alerts | NWS | GeoJSON | 5m | https://api.weather.gov/alerts/active |
| 07 | North America | NWS forecast grid | NWS | JSON | 30m | https://api.weather.gov/ |
| 08 | North America | USGS NWIS river discharge | USGS Water Services | JSON | 15m | https://waterservices.usgs.gov/nwis/iv/ |
| 09 | North America | USGS NWIS gage height | USGS Water Services | JSON | 15m | https://waterservices.usgs.gov/nwis/iv/ |
| 10 | North America | NOAA NDBC buoy wave height | NDBC | text | 15m | https://www.ndbc.noaa.gov/data/realtime2/ |
| 11 | North America | NOAA NDBC buoy pressure | NDBC | text | 15m | https://www.ndbc.noaa.gov/data/realtime2/ |
| 12 | North America | NASA FIRMS fire detections | NASA FIRMS | CSV | 30m | https://firms.modaps.eosdis.nasa.gov/api/ |
| 13 | South America | Open-Meteo Amazon rainfall | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 14 | South America | Open-Meteo Amazon humidity | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 15 | South America | Open-Meteo Andes snowfall | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 16 | South America | Open-Meteo Patagonia wind | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 17 | South America | USGS Andes seismic events | USGS FDSN | GeoJSON | 30m | https://earthquake.usgs.gov/fdsnws/event/1/ |
| 18 | South America | NASA EONET South America wildfires | NASA EONET | JSON | 30m | https://eonet.gsfc.nasa.gov/api/v3/events |
| 19 | South America | NASA EONET South America volcanoes | NASA EONET | JSON | 1h | https://eonet.gsfc.nasa.gov/api/v3/events |
| 20 | Europe | Open-Meteo European air temperature | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 21 | Europe | Open-Meteo European wind gusts | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 22 | Europe | Open-Meteo European precipitation | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 23 | Europe | Open-Meteo air quality PM2.5 | Open-Meteo AQ | JSON | 1h | https://air-quality-api.open-meteo.com/v1/air-quality |
| 24 | Europe | Open-Meteo air quality NO2 | Open-Meteo AQ | JSON | 1h | https://air-quality-api.open-meteo.com/v1/air-quality |
| 25 | Europe | EMSC earthquake reports | EMSC | JSON | 30m | https://www.seismicportal.eu/fdsnws/event/1/ |
| 26 | Europe | UK Environment Agency flood monitoring levels | EA Flood Monitoring | JSON | 15m | https://environment.data.gov.uk/flood-monitoring/ |
| 27 | Europe | UK Environment Agency flood warnings | EA Flood Monitoring | JSON | 15m | https://environment.data.gov.uk/flood-monitoring/id/floods |
| 28 | Africa | Open-Meteo Sahel temperature | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 29 | Africa | Open-Meteo Sahel precipitation | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 30 | Africa | Open-Meteo Sahara dust proxy | Open-Meteo AQ | JSON | 1h | https://air-quality-api.open-meteo.com/v1/air-quality |
| 31 | Africa | USGS East African Rift earthquakes | USGS FDSN | GeoJSON | 30m | https://earthquake.usgs.gov/fdsnws/event/1/ |
| 32 | Africa | NASA EONET African fires | NASA EONET | JSON | 1h | https://eonet.gsfc.nasa.gov/api/v3/events |
| 33 | Africa | Open-Meteo Gulf of Guinea wave height | Open-Meteo Marine | JSON | 1h | https://marine-api.open-meteo.com/v1/marine |
| 34 | Asia | Open-Meteo Hormuz surface wind | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 35 | Asia | Open-Meteo Hormuz wave height | Open-Meteo Marine | JSON | 1h | https://marine-api.open-meteo.com/v1/marine |
| 36 | Asia | Open-Meteo Hormuz ocean currents | Open-Meteo Marine | JSON | 1h | https://marine-api.open-meteo.com/v1/marine |
| 37 | Asia | Hormuz.now aggregate commercial crossings | hormuz.now | JSON | 1m | https://hormuz.now/data |
| 38 | Asia | Eagle Intelligence maritime risk status | Eagle Intelligence | JSON | 5m | https://eagleintelmari.com/api/hormuz-status |
| 39 | Asia | USGS Japan-region seismic events | USGS FDSN | GeoJSON | 30m | https://earthquake.usgs.gov/fdsnws/event/1/ |
| 40 | Asia | NASA EONET Asian volcanoes | NASA EONET | JSON | 1h | https://eonet.gsfc.nasa.gov/api/v3/events |
| 41 | Asia | Open-Meteo Bay of Bengal cyclone wind fields | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 42 | Oceania | Geoscience Australia earthquakes | Geoscience Australia | GeoJSON candidate | 30m | https://earthquakes.ga.gov.au/ |
| 43 | Oceania | Australia BOM observations | BOM | JSON candidate | 30m | https://api.weather.bom.gov.au/ |
| 44 | Oceania | Open-Meteo Great Barrier Reef SST | Open-Meteo Marine | JSON | 1h | https://marine-api.open-meteo.com/v1/marine |
| 45 | Oceania | Open-Meteo Tasman Sea wave height | Open-Meteo Marine | JSON | 1h | https://marine-api.open-meteo.com/v1/marine |
| 46 | Oceania | USGS New Zealand region earthquakes | USGS FDSN | GeoJSON | 30m | https://earthquake.usgs.gov/fdsnws/event/1/ |
| 47 | Antarctica | Open-Meteo McMurdo air temperature | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 48 | Antarctica | Open-Meteo South Pole wind speed | Open-Meteo | JSON | 1h | https://api.open-meteo.com/v1/forecast |
| 49 | Antarctica | Open-Meteo Antarctic coastal waves | Open-Meteo Marine | JSON | 1h | https://marine-api.open-meteo.com/v1/marine |
| 50 | Antarctica | USGS Antarctic seismic events | USGS FDSN | GeoJSON | 1h | https://earthquake.usgs.gov/fdsnws/event/1/ |
| 51 | ISS / orbit | ISS current geolocation and altitude | Where the ISS At | JSON | 10s | https://api.wheretheiss.at/v1/satellites/25544 |
| 52 | ISS / orbit | ISS orbital TLE | Where the ISS At | JSON | 6h | https://api.wheretheiss.at/v1/satellites/25544/tles |
| 53 | ISS / orbit | ISS ground-track positions | Where the ISS At | JSON | 1m | https://api.wheretheiss.at/v1/satellites/25544/positions |


## Deferred until ingestion acceptance

Globe accuracy, richer world navigation, derived composites, WorldSpec generation, 50-region benchmarks, replay and human tooling. These are not prerequisites for source ingestion.

## References

[README](README.md) · [VET](VET.md) · [CHRONICLE](CHRONICLE.md) · [Runtime](index.html) · [Sanctum contract](https://github.com/bonoj/Sanctum/blob/main/CONTRACT.md)
