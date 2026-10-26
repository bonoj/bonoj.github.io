# Hermeticon Observatory — Chronicle

**Started:** 2026-10-26  
**Mission:** Real, evidence-constrained Sun → L1 → geosynchronous orbit → Earth observation, with Parker Solar Probe as a historical solar-origin layer and a planetary registry of on-demand ground/ocean/atmosphere sources.

This is the **working continuity log**. Read [README.md](README.md) for the cold-start contract and [SPEC.md](SPEC.md) for scientific and acquisition requirements. Append a concise entry after every meaningful probe, browser 👁 report, code change, deployment or change of direction. Do not replace evidence with a success narrative.

## 00 — What exists (verified vs merely planned)

### Working runtime: L1
- Public instrument: https://bonoj.github.io/jit/observatory/l1/
- Source: [l1/index.html](l1/index.html). White, single-viewport, nine real channels from two NOAA RTSW 1-minute feeds: plasma (speed, density, temperature, GSE transverse Y/Z) and magnetic (Bt and GSM Bx/By/Bz). A single 👁 copies a JSON acquisition report.
- **User-provided browser 👁 evidence, 2026-10-26 04:07:48 UTC, build `l1/01`:** both NOAA feeds HTTP 200; plasma 3,333 records, magnetic 3,417; source IDs ACE, IMAP, SOLAR1; active source SOLAR1. Plasma active sample 04:00 UTC (speed 333.6 km/s, density 3.19 cm⁻³, temperature 52,948 K); magnetic active sample 04:01 UTC (Bt 3.95 nT, Bz GSM −0.76 nT). Per-field quality, source and freshness require further attention. These are *observations from a copied browser report*, not independent verification of today's runtime by this chronicle.
- Current L1 fetches independently with a simple loop, **not yet** the inherited Lattice governor. Preserve functioning L1 while extending the mission.

### Proven transport / rollback
- [Observatory root](index.html) is a functional clone of [JIT Lattice](../lattice/); keep it as rollback. Lattice contract: max 2 concurrent requests globally, 1 per host, pacing, bounded queue, retries/backoff, dedup/cache, provenance and honest 👁. Do not reinvent transport or mutate Lattice upstream.
- The Observatory [README](README.md) records historical probes, failed endpoints and working conventions.

### Science and acquisition plan already captured
- [SPEC.md](SPEC.md) defines the **sunward observational footprint**: L1 upstream → GEO instruments with independently calculated sunward, solar-visible and eclipsed status → Earth's sunlit surface. The cone is a *geometric acquisition frame*, not literal plasma flow. Sunward, sun-visible and magnetic connectivity are not interchangeable.
- GEO science: NOAA GOES primary/secondary instrument feeds, actual spacecraft IDs, magnetometers, energetic particles, and solar-viewing X-ray/EUV as a separate photon pathway. No GEO feed is yet browser-verified in the new probe.
- Parker Solar Probe: delayed historical FIELDS, SWEAP, ISʘIS, WISPR and ephemerides. Daily **planned** release checks, selective event retrieval and an Earth-Connection Filter using geometry, ballistic/Parker-spiral connectivity, uncertainty and control windows. No scheduled collector exists.
- Planetary Sensor Registry: declarative **stubs only** for INTERMAGNET, ionosphere/GNSS, weather, NDBC, CO-OPS, OOI, IOOS, Argo, USGS, seismology, chemistry and ecology. **No periodic global polling.** Query → discover → verify → bounded fetch → correlation dossier.

## 01 — Decision: instrument before interface (2026-10-26)

**Question:** What should we build first?

**Decision:** **GOES acquisition + solar geometry probe** before PSP archival retrieval or planetary adapters. Why: the existing L1 readings establish one end of a real multi-spacecraft comparison. GOES can establish the second, provided measurements and spacecraft identities are genuinely accessible.

**UX rule:** Do not spend effort on visual polish. Build a minimal, independent, smartphone-usable GEO probe; 👁 is the principal deliverable. User will copy the report into chat for joint evidence-based debugging. Do not claim a successful GitHub commit equals verified browser acquisition.

### First implementation slice — pending, not yet built

1. Read the Observatory and Lattice contracts and probe NOAA GOES instrument-source and satellite-longitude metadata. Discover actual current GOES primary/secondary spacecraft and instrument mappings; never hardcode identity.
2. Browser-fetch bounded GOES magnetometer and at least one energetic-particle product, using Lattice's governor or its proven transport pattern. Preserve existing L1 and Observatory root unchanged. If endpoints reject CORS or lack numeric records, expose the failure in 👁 rather than fake success.
3. Preserve source URL, HTTP status, fetch duration, actual sample records, UTC observed time, channel/unit, quality/fill values, source spacecraft, counts, latest valid per channel, and errors. Clearly distinguish metadata success from measurements.
4. Calculate solar local time, sunward classification, solar visibility/eclipse and offset from Sun–Earth axis **only after** obtaining authoritative spacecraft position/longitude and solar geometry. Mark missing ephemerides or approximate calculations explicitly. Never infer eclipse from sunward status alone.
5. Provide a standalone canonical URL, an actual build identifier/cache verification, and a **single-tap 👁 JSON** report that can be pasted here. Keep the probe visibly spare and functional.
6. Use the pasted browser report to decide the next code change. Confirm actual measurements and geometry **before** integrating GEO into the main Observatory.

### 👁 report acceptance checklist

- `schema`, build SHA, captured UTC, browser runtime state and acquisition attempt counts.
- Each request: URL, HTTP status, latency, error, record count, sample timestamps and small raw-record excerpts.
- Provider mapping: source spacecraft, instrument, primary/secondary designation, confidence and metadata timestamps.
- Each field: value, unit, sample count, source, observedAt, freshness, quality/fill handling.
- Geometry: source and epoch of ephemeris and Sun vector, coordinates/frame, longitude, local solar time, sunward/sun-visible/eclipsed flags, axis offset, uncertainty and unavailable reasons.
- Honest statuses: CANDIDATE / PROBED / BROWSER_VERIFIED / INGESTED / CORRELATABLE; never promote without evidence.

## 02 — What comes after GEO proof

**Next A — GEO integration:** only after 👁 confirms real measurements, connect selected GOES channels to L1 time-aligned views. Preserve independent spacecraft clocks and uncertainty; do not claim solar-wind causal transit from a fixed time shift.

**Next B — Event experiment:** select a genuine L1 pressure/Bz change, compute plausible arrival window, inspect GEO magnetic/particle response and local-time geometry. Retain quiet and negative controls.

**Next C — PSP Earth-Connection Filter:** catalog ephemerides, rank potentially Earth-connected historical intervals, fetch bounded low-rate FIELDS/SWEAP samples, then selective high-rate bursts. Compare with independent L1 history, not a fake live PSP feed.

**Next D — Planetary query:** choose one concrete question (e.g. L1/GEO magnetic disturbance versus ground magnetometers); instantiate only the necessary provider stub, prove endpoint data and produce a reproducible dossier. Do not build a planet-wide poller.

**Later:** dynamic sunward footprint, 24-hour orbital geometry, cross-domain correlations, rich provenance and interactive exploration. UI remains subordinate to acquisition integrity.

## Append protocol for every subsequent turn

Append a short numbered entry containing:
- **Intent / hypothesis**
- **Action** (files, endpoints, code changes, commit SHA and canonical URL)
- **Evidence** (👁 timestamp, browser HTTP, numeric sample, failure, source)
- **Interpretation / limits** (what is proved, what is not)
- **Next falsifiable step**

A speculative idea is marked *planned*. A committed file is marked *committed*. A real browser result is marked *browser-verified*. An integrated scientific comparison is marked *correlatable* only with timestamps, provenance, geometry and quality.

**Operational shorthand:** ➡️ = one substantial testable advance; Dracarys = fix and deploy. No invented measurements, no silent fallbacks, no dead UI controls.


## 03 — First GEO probe committed (2026-10-26)

**Intent:** establish real GEO measurements with per-instrument spacecraft attribution, without changing the working L1 instrument.

**Action:** created [geo/index.html](geo/index.html), canonical https://bonoj.github.io/jit/observatory/geo/ , commit `8110f09a`. Four minimal status panels (primary/secondary magnetometer and integral proton) plus a single 👁 copy report. NOAA requests: instrument-sources.json, satellite-longitudes.json, primary/secondary magnetometers-6-hour.json, primary/secondary integral-protons-6-hour.json. Initial metadata requests complete before science requests; numeric fields are discovered from returned records rather than hardcoded.

**Source discovery before implementation:** NOAA public metadata currently reports GOES-19 primary and GOES-18 secondary for magnetometers, **but GOES-18 primary and GOES-19 secondary for protons**; longitude metadata lists GOES-19 ~72.5°W and GOES-18 ~137°W. This is provider-published metadata, **not browser 👁 verification**. NOAA source directories list all four six-hour measurement endpoints.

**Geometry qualification:** the probe computes *approximate* solar local time and solar-axis angular offset from NOAA longitude and a simple solar-position approximation assuming geostationary equatorial location. It records sunward status but explicitly leaves sun-visible and eclipsed as null: precise eclipse/line-of-sight classification needs spacecraft ephemerides and validated geometry. These calculated fields are not measurements.

**Evidence state:** GitHub file creation succeeded; **browser HTTP/CORS, sample values, live Pages deployment and clipboard operation have NOT yet been verified**. The 👁 JSON reports request status, HTTP, latency, record counts, raw excerpts, numeric-field inventory and geometry. The probe is intentionally independent and does **not yet use the Lattice governor**; this is a bounded one-shot six-request diagnostic, not a recurring acquisition loop.

**Next:** open the canonical URL on the user's phone, tap 👁, paste JSON. Inspect actual source mapping, timestamped magnetometer/proton numeric fields, units and quality structure; then correct parsing/geometry and migrate verified acquisition into the shared governed transport. Do not claim live verification until the report arrives.
