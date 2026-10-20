# VET — Lattice source audit and cold-boot implementation hooks
**Date:** 2026-10-20. **Status:** research-backed static specification review, NOT live endpoint/browser/CORS verification. **Inputs:** [SPEC.md](SPEC.md), [Hormuz executable](../hormuz/index.html), [Hormuz README](../hormuz/README.md). **Next deliverable:** `jit/lattice/index.html` after a working vertical slice. Do not confuse a published provider schema with a working browser fetch.

## Audit result: important corrections before implementation
1. **Count:** SPEC has **53 channels**, not 50 independent telemetry services. Multiple rows are separate variables from the same provider and can be combined into one request. Seven continents (Oceania/Australia is the seventh) plus ISS, not eight continents.
2. **ISS:** WTIA docs explicitly support `/v1/satellites/25544` with `latitude,longitude,altitude,velocity,timestamp`, `/tles`, and `/positions?timestamps=...` (up to 10 timestamps). The previous SPEC's bare `/positions` URL is **not a valid complete request**. Positions returned for requested timestamps may be computed, not directly observed. Provider documents ~1 request/sec cap; prefer 60s globally and 10s only while selected.
3. **Open-Meteo air quality:** documented `/v1/air-quality` with `current=pm2_5,nitrogen_dioxide,dust` (or hourly), `latitude`, `longitude`, `timezone=GMT`. **Dust is modeled aerosol concentration, not a directly observed dust storm or surface visibility.** Global coverage via `domains=cams_global` where appropriate.
4. **Open-Meteo marine:** `current=wave_height,sea_surface_temperature,ocean_current_velocity,ocean_current_direction` documented, but models have coastal resolution and coverage limitations. Antarctic *coastal* marine values may be unavailable: return UNAVAILABLE rather than pretend.
5. **Open-Meteo weather:** distinguish `current` model-estimated weather from station observations. Bundle temperature, precipitation, wind, gust, humidity in one coordinate request where supported.
6. **NWS and NOAA CO-OPS:** candidate public APIs, but NOAA CO-OPS tides/water levels/temp/wind are **multiple station products from one provider**, not independent networks. Validate station IDs and datum; predictions ≠ observations. NWS requires suitable user-agent identification and proper geospatial endpoints; do not use an undefined generic forecast URL.
7. **USGS:** regional bounding-box queries are separate geographic slices of the **same global ComCat feed**; multiple continental earthquake rows must not multiply global requests. Filter a single bounded result in the client when economical; obey service limits.
8. **NASA EONET:** event metadata is curated and sometimes delayed; wildfires/volcanoes categories filtered from one event feed, not live instrument readings. NASA FIRMS may require a **MAP_KEY** for API access; never embed keys in a public static site. Mark blocked until an authorized browser-safe feed exists.
9. **ISS and Antarctica:** use legitimate orbital layer plus Antarctic point forecasts and seismic catalog, but document polar model/grid limits; a point forecast does not represent an entire continent.
10. **Unresolved provider-specific roots:** BOM `api.weather.bom.gov.au`, Geoscience Australia landing page, EMSC FDSN formats, Eagle Intelligence and hormuz.now JSON paths require endpoint/schema/CORS/licensing tests. Mark CANDIDATE, not integrated. Likewise NDBC plain-text data needs a robust parser and browser CORS test. UK EA flood APIs require actual station and warning shapes.
11. **Licensing:** provider-public ≠ unrestricted commercial use. Open-Meteo free/non-commercial vs paid/commercial terms need review before commercial demos; credit CC BY datasets as required. Public browser request ≠ approved redistribution.
12. **Do not rename or replace Hormuz.** Keep original intact. Lattice is a separate JIT, sharing adapter patterns not fragile copy/paste. Working name Lattice is not an affiliation or an Anduril-branded product.

## Research anchors (official docs, not successful runtime checks)
- https://open-meteo.com/en/docs — forecast parameters and terms
- https://open-meteo.com/en/docs/marine-weather-api — current wave, SST, current, coastal caveats
- https://open-meteo.com/en/docs/air-quality-api — PM2.5, NO2, dust, CAMS models
- https://ord.wheretheiss.at/w/developer — ISS position, velocity, TLE, positions requires timestamps, rate limit
- https://earthquake.usgs.gov/fdsnws/event/1/ — ComCat query service
- https://eonet.gsfc.nasa.gov/docs/v3 — curated event metadata
- https://www.weather.gov/documentation/services-web-api — NWS API
- https://api.tidesandcurrents.noaa.gov/api/prod/ — CO-OPS products
- https://firms.modaps.eosdis.nasa.gov/api/ — key-gated FIRMS API
- https://environment.data.gov.uk/flood-monitoring/doc/reference — UK flood API

## Implementation seams: cold-boot plan
**A. Registry** — `streams.js` or embedded `const SOURCES`: one record per *provider adapter*; `channels` and `regions` are separate manifests. Avoid 53 redundant network loops. `sourceId, urlBuilder, minIntervalMs, authMode, license, corsStatus, parse, normalize, expectedFields`. Per-source states: `CANDIDATE | DUE | FETCHING | LIVE | STALE | BLOCKED | ERROR`.

**B. Data contract** — `{channelId,providerId,kind,geometry,observedAt,publishedAt,fetchedAt,validAt,unit,value,quality,sourceUrl,transformVersion}`. `kind` one of `observed|reported|model|forecast|derived|synthetic`; nullable unknowns. Provenance survives rendering. Coordinate convention WGS84 latitude/longitude; antimeridian wrap and polar projection test. ISS position includes altitude and ephemeris timestamp.

**C. Scheduler** — `tick` every 5s checks due feeds; one in-flight per host; request bundling; jitter initial loads; pause hidden; resume overdue; 429 Retry-After; exponential backoff with cap; 12s timeout. Never 53 requests on startup. Cache provider responses in memory, bounded; only query active viewport plus one global overview. ISS selected 10s, otherwise 60s or paused.

**D. Globe renderer** — single phone-sized Canvas/WebGL world viewport; first pass simple orthographic globe with globe rotation, coastline dataset with attribution, continent pick regions, day/night shading. Separate ISS overlay in screen space projected from WGS84, with visible marker when above horizon; don't invent 3D precision. Accessible text/source drawer. Keep one-page, no parent scroll.

**E. WorldSpec** — `{id,title,center,extent,projection,layers,channels,sourcePolicies,transforms}`. Each region uses the *same* globe and adapters. A generated WorldSpec must validate channel IDs, geographic coverage, provider terms and unit conversions. This is the reusable 50-region frontier; benchmark generated/configured/deployed/observed separately.

**F. Runtime eye** — one opt-in `👁` observation toggle; no background telemetry collection or uploads. Copy/export bounded JSON with `build,utc,selectedRegion,channels[{id,state,lastSuccess,age,error}],requestCounts,renderFps`. One binary code switch to disable entire instrument. Never include credentials or private information.

**G. Tests** — deterministic fixture tests for each adapter parser, missing fields, timestamps, malformed JSON/text, antimeridian, polar bounds, ISS positions parameter, deduplicated requests, hidden tab behavior, rate-limit backoff. Smoke test with real browser and CORS before calling any channel LIVE. GitHub Pages SHA/build identity, one canonical link.

## First implementation slice (strict)
1. Fetch and inspect current `jit/lattice/SPEC.md`, this `VET.md`, Hormuz source, and Sanctum/Gate publishing contracts.
2. Implement globe, seven selectable continent anchors, ISS marker, clock, provider state indicators, and **five verified adapter families**: Open-Meteo forecast, Open-Meteo marine, Open-Meteo air quality, USGS ComCat, WTIA ISS. Prefer bundled variables and on-demand regional requests. NASA EONET is the sixth candidate if CORS/schema verified.
3. Ensure every continent has at least one meaningful point or bounding-box query, but **do not claim live** without browser proof. Antarctica gets a polar point and caveat. ISS `/positions` must include `timestamps`; simpler use `/satellites/25544` initially.
4. Run fixture tests and fetch-source readback; then inspect actual deployed browser fetch, errors, and mobile layout. Persist observed results and failures in `jit/lattice/CHRONICLE.md` only after they occur.
5. Expand provider families and 53 channels only as verified. Prefer source diversity to inflating variable counts. Add genuinely regional sources as audited; if a candidate fails, show BLOCKED/UNAVAILABLE and replace only with a documented alternative.
6. Later implement derived metrics and WorldSpec instantiation benchmark; do not claim fifty deployments in ten minutes without measured evidence.

## Explicit non-goals
No Lattice OS equivalence claims; no command/control or military tracking; no invented individual AIS positions; no secret/API key in static HTML; no Supabase; no blanket five-second polling; no synthetic values disguised as live; no performance claims from source readback alone.

## Audit limitations and next checks
This pass inspected source files and public API documentation. **It did not perform direct browser runtime, CORS preflight, response schema sampling, complete legal terms review, or test all 53 candidate channels.** Therefore the 53-channel catalog remains an unverified candidate inventory. The next builder must not turn this documentation review into a false green test.
