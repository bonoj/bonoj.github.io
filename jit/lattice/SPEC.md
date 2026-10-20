# LATTICE — Worldwide public-telemetry world specification

**Status:** specification only; no deployed JIT or validated 50-feed browser ingestion. **Proposed target:** `https://bonoj.github.io/jit/lattice/`. **Origin:** extend the existing Hormuz JIT's browser-only, independently scheduled, source-aware design. Not Anduril Lattice, not a clone or claim of equivalent capability. Working name only.

## Mission

A worldwide, phone-first, explorable observatory with seven continents and an eighth orbital layer for the International Space Station. One Earth, one UTC clock, multiple independent public environmental and civilian information channels. The world is the interface, not fifty disconnected dashboard cards. Tap a continent, region, station, stream, or orbital pass; follow source, freshness, measurement units, and uncertainty. No military asset tracking, targeting, or operational tasking.

**Deliverable:** one static GitHub Pages JIT, using direct browser requests where allowed, no Supabase, no credentials embedded in JavaScript, no mandatory backend. If a stream needs authentication, disallows cross-origin browser fetches, or lacks an approved redistribution license, show it as *candidate / unavailable* until a compliant public substitute is selected. Do not fabricate live data.

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

## Earth and orbit design

1. **Earth viewport:** rotating globe with continent and ocean silhouettes, selectable region boundaries, legible day/night and daylight overlay; never imply an illustrative map is navigationally calibrated.
2. **Seven continental lenses:** North America, South America, Europe, Africa, Asia, Oceania (Australia), Antarctica. Include a separate ocean/chokepoint focus when a selected stream spans continents.
3. **ISS orbital lens:** visible ISS position, timestamp, altitude, ground-track prediction derived from published TLE when supported. Distinguish current position, predicted path, and stale ephemeris; never draw interpolated/predicted coordinates as observed.
4. **World clock:** one UTC timebase; each observation has its own event/valid time, publication time (if known), client-fetch time, age, and forecast lead when applicable.
5. **Interaction:** globe → region → source → observation → evidence. Cross-layer questions should be answerable, e.g. wind and waves at a coastal point, earthquakes near a volcano, river level during flood warnings, ISS pass over a storm. Correlation is not causation.
6. **Modes:** LIVE (actual retrieved data), REPLAY (licensed stored/historical records if available), WHAT-IF (clearly synthetic). Initial implementation should prioritize LIVE with conspicuous unavailable states.

## Data contract and adapters

Each adapter exports `id, label, provider, docsUrl, endpointBuilder, geographicCoverage, geometryType, fields, units, attribution, licenseStatus, authRequirement, corsStatus, minPollMs, cacheTtlMs, parse, validate, normalize`. Normalized events include `streamId, observedAt, publishedAt?, fetchedAt, validUntil?, geometry?, value, unit, kind: observed|model|forecast|reported|derived|synthetic, quality, uncertainty?, rawSourceUrl, transformVersion`. Store small bounded client-side buffers only, not unbounded archives. Unknown field is unknown, not zero. Per-stream state: LIVE, STALE, BLOCKED, ERROR, NOT CONFIGURED, CANDIDATE.

**Important:** weather forecast grids and marine model fields are *model/forecast*, not physical sensor readings; EONET is curated event metadata, not raw satellite pixel measurements; AIS-visible counts are incomplete and do not represent all shipping; TLE propagation is predicted orbit, not continuous instrument telemetry. A worldwide lens must not erase these differences.

## Network discipline

A 5-second scheduler checks *due times*, not 53 requests every five seconds. Default provider budgets: 1 in-flight request per host, modest staggered startup (2–5 seconds between providers), conditional requests when supported, provider-specific TTL, exponential backoff on 429/5xx/network failure, pause on hidden tab, catch up only overdue streams on return, and cap per-session requests. High-frequency ISS 10-second location fetch is opt-in when orbital lens is visible; elsewhere use 60 seconds or suspend. Shared responses should feed multiple channels rather than multiply requests (e.g. one Open-Meteo request for multiple weather variables). If a feed needs a key or violates public browser terms, leave it disabled and document why. Respect provider terms over suggested cadence.

## Composition engine (the actual research frontier)

Each regional world is an instance of a common `WorldSpec` with extent, layers, sources, transforms, visual grammar, and provenance. A model can produce a new WorldSpec for an unfamiliar region, validate it, and render it without hand-coding a new app. Fifty worlds in ten minutes is a **target benchmark**, not a demonstrated result. Measure spec-generation latency, adapter reuse, valid live feeds, runtime failures, human interventions, and truthfulness of labels. Distinguish generated artifact, deployed artifact, and verified functioning observatory.

Potential transparent *zip* composites: wave stress + coastal wind; seismicity + nearby curated volcanic reports; flood alerts + observed river stage; wildfire reports + modeled wind. Each derived metric must expose constituent observations, time alignment, missingness, units, transformations, and uncertainty. Do not synthesize a single unexplained risk score.

## Phased acceptance

**Phase 0 — source audit:** classify all 53 channels as documented, browser-CORS-verified, requires-key, licensing-review, or unavailable; publish a machine-readable manifest with honest status. For initial providers, verify actual live response samples and fields, not just documentation.

**Phase 1 — vertical slice:** globe, all seven continent selectors, ISS orbit, 8–12 genuinely responding distinct channels across at least five providers; mobile smoke test; source timestamps and failures visible.

**Phase 2 — breadth:** all 53 candidate channels evaluated; integrate every legally/browser-accessible channel, clearly mark unsupported channels. Ensure every continent and ISS has at least one verified functioning feed; no silent substitutions.

**Phase 3 — composition:** cross-stream derived metrics with provenance, region WorldSpec instantiation, bounded replay, repeatable 50-region build benchmark and observed metrics.

## Original Hormuz invariants retained

- Static-first and browser-ingested; **Supabase is unrelated**.
- Source-specific polling; five-second *due check*, not five-second polling of everything.
- Missing data never replaced with fake observations.
- Synthetic movement and derived signals visibly distinct from source data.
- Phone-first, readable, no invented UI clutter, single coherent world.
- Public civilian/open-science information only; no sensitive collection reconstruction or military tracking.

## References and research notes

- Hormuz source: https://github.com/bonoj/bonoj.github.io/blob/master/jit/hormuz/index.html
- Hormuz README: https://github.com/bonoj/bonoj.github.io/blob/master/jit/hormuz/README.md
- Hormuz Chronicle: https://github.com/bonoj/bonoj.github.io/blob/master/jit/hormuz/CHRONICLE.md
- Alembic working note: https://github.com/bonoj/Hermeticon/blob/main/codex/alembic/sigint.md
- NASA EONET docs: https://eonet.gsfc.nasa.gov/docs/v3
- ISS API docs: https://ord.wheretheiss.at/w/developer
- NASA API catalog: https://api.nasa.gov/

**Research caveat:** Some provider roots in the inventory (especially BOM, Geoscience Australia, and selected shipping/risk services) are discovery entrypoints rather than verified JSON request URLs. Their eligibility is unresolved. Distinct channels are not necessarily independently sourced. This document authorizes a source-audit-first implementation, not claims of 53 active live streams.
