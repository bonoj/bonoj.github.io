# Lattice — operational handoff

**Live:** https://bonoj.github.io/jit/lattice/ · **Runtime:** [index.html](index.html) · **Specification:** [SPEC.md](SPEC.md) · **Chronicle:** [CHRONICLE.md](CHRONICLE.md) · **Manifest:** [channels.json](channels.json)

## Mission

**MAXIMUM VACUUM.** Acquire the greatest useful breadth and depth of legitimate public civilian Earth and orbital observations. Optimize for independent phenomena, provider diversity, geographic reach, and actual records—not channel counts, easy commits, repeated verification, or presentation. The original 53 channels are an audit backlog, never a ceiling.

On ➡️ expand real ingestion: prefer bounded network-wide or geographically distributed acquisition over adding one station or one variable per turn. Validate actual provider payloads and representative edge cases automatically. Move to another eligible source after success or a documented blocker. No human endpoint debugging.

## Implemented and evidenced

- Standalone mobile-first browser JIT, nine views (World, seven continents, ISS), shared transport governor and 👁 observer; no backend.
- One governor: HTTPS, at most two concurrent requests globally and one per host, bounded queue and response, pacing, timeout, backoff, deduplication and cache. Existing SHA-stamped Pages publisher and `build.json` are authoritative; no new cache-busting.
- Worldwide USGS earthquake and NASA EONET event sources; ISS position/TLE; 15 fixed Open-Meteo weather/marine/air sample groups covering 21 numbered mappings. Fixed samples are **not** dense worldwide coverage.
- Other coded intake: US NWS alerts; UK Environment Agency flood/river records; EMSC Europe-region earthquakes; NOAA CO-OPS water level, temperature and wind at **The Battery only**; USGS Water discharge and gauge height at **Potomac station 01646500 only**; NDBC waves and pressure at **buoy 41009 only**.
- Australian BOM candidate is disabled after HTTP 403. Geoscience Australia authoritative machine-readable access remains unresolved.
- Manifest: 53 candidates, 10 marked ACTIVE from browser normalization evidence, 43 DEFERRED. This classification does **not** gate all ingestion. Coded mappings and CI probes do not imply browser verification.
- GitHub Actions [run 39507745587](https://github.com/bonoj/bonoj.github.io/actions/runs/39507745587) passed server-side probes for six endpoints in four new provider families and all 15 Open-Meteo sample groups. This is **not** proof of browser CORS or current deployed intake. Earlier human 👁 build `aba52136` evidenced 13/15 sample groups LIVE and 23/25 normalized mappings at that moment.

## Next advance

Expand actual geographic footprint and independent sources. Prefer multi-station CO-OPS, USGS Water and NDBC network ingestion where source policy and request budgets permit; diversify across South America, Africa, Asia, Oceania and polar regions. Evaluate new international provider families rather than repeatedly extending a convenient US station. Confirm source payload, schema, attribution, and browser compatibility without blocking unrelated ingestion.

## Invariants

Public civilian/environmental data only; no secrets, military tracking, unauthorized scraping or invented measurements. Preserve source, observed/fetched times, units, geography, quality and distinction between measured, modeled and predicted values. Preserve the existing governor, publisher, canonical URL, Hormuz isolation and mobile-first standalone interface. Do not pivot to UI, replay, persistence, manifest grooming, new instrumentation or infrastructure changes unless an actual intake blocker requires a minimal repair. Do not call queued/configured/coded requests successfully ingested records.

## Reading order

This README → [SPEC.md](SPEC.md) for binding mission and constraints → [index.html](index.html) and [channels.json](channels.json) for current code → [CHRONICLE.md](CHRONICLE.md) for historical decisions and full archived prior documents. [VET.md](VET.md) and [TRANSPORT_CONTRACT.md](TRANSPORT_CONTRACT.md) are historical design references, not overriding priorities. Publishing/recovery: [Chaos contract](../chaos/ASTRA_CONJOINER.md) · [Sanctum contract](https://github.com/bonoj/Sanctum/blob/main/CONTRACT.md).
