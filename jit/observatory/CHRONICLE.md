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


## 04 — User 👁 confirms GEO browser acquisition (2026-10-26 04:37:51 UTC)

**Evidence:** user pasted full `hermeticon-geo-eye/v1` report from build `geo/01`, captured 04:37:51.175Z. All **six** NOAA requests HTTP 200 with no errors: mapping 128 ms / 1 record, longitude 125 ms / 8 records; GOES primary magnetic 61 ms / 359 records, secondary magnetic 57 ms / 358; primary integral protons 59 ms / 568, secondary integral protons 54 ms / 560. **1,845 scientific records** across four streams. This is browser-confirmed access and timestamped numeric measurements, not yet scientifically normalized or correlatable.

**Actual mapping:** NOAA registry last updated 2026-10-02: magnetometers primary **GOES-19** (72.5°W), secondary **GOES-18** (137°W); integral protons primary **GOES-18**, secondary **GOES-19**. Source IDs also appear directly in each measurement record.

**Latest magnetic values:** GOES-19 at 04:35Z: He 33.4173, Hp 74.6865, Hn −0.6482, total **81.8243 nT**, arcjet_flag false; GOES-18 at 04:34Z: He 8.8105, Hp 88.6252, Hn 15.8880, total **90.4682 nT**, arcjet_flag false. One-minute cadence in provided samples.

**Protons:** GOES-18 most recent records at 04:30Z and GOES-19 at 04:25Z; payload is **long-form**, each record `{time_tag,satellite,flux,energy}`, with energy thresholds e.g. >=1, >=10, >=60, >=500 MeV. A flux reading is meaningless without its energy threshold; normalize per (spacecraft, energy, timestamp). Units must be verified from NOAA documentation, not inferred from payload.

**Geometry:** approximate calculations from NOAA longitude and solar position at 04:37:46Z: GOES-19 local solar time ~00:04, axis offset 167.89°, sunward false; GOES-18 ~19:46, offset 115.83°, sunward false. Sun-visible/eclipsed correctly null; no authoritative orbit/eclipses yet.

**Bugs / qualifications surfaced by instrumentation:**
- `latestNumeric` selects `satellite` because it is numeric; exclude IDs, metadata, quality flags and categorical fields from science-channel selection.
- Proton flux records need grouping by energy threshold; cannot use a single latest `flux` series.
- Magnetometer `arcjet_flag` must remain a quality/context field; evaluate other missing-value/quality conventions per instrument.
- `BROWSER_VERIFIED` on metadata endpoints means endpoint accessibility, **not** that metadata are scientific observations. Use separate statuses for metadata and measurements.
- Instrument mapping is dated Oct 2 and should be treated as provider-published metadata, while individual record satellite IDs provide per-sample attribution.

**Next falsifiable step:** patch GEO probe normalization and 👁 to expose separate per-energy proton channels, correct magnetic headline fields and per-channel timestamps/counts/quality. Then obtain another user browser 👁 report. Preserve working L1, no UI polish.


## 05 — GEO measurement-aware normalization deployed to repository (2026-10-26)

**Intent:** correct the two 👁-discovered parsing defects without touching L1 or adding visual complexity.

**Action:** updated [geo/index.html](geo/index.html) to build `geo/02`, commits `b65eac52` and correction `d0b91f0b`. Numeric `satellite` metadata is excluded from science-channel selection; proton `flux` is keyed by energy threshold (`flux|>=1 MeV`, etc.) instead of collapsing all energy bins into one series. 👁 now exposes per-channel counts, last observations and age, plus magnetic arcjet flag counts; metadata endpoints are marked `METADATA_VERIFIED`, separate from numeric science feeds. Scientific units for proton flux remain `UNVERIFIED` until checked against provider documentation.

**Evidence:** GitHub commits succeeded. **No user browser 👁 evidence for geo/02 yet.** Do not assert that the new parser works until tested in the actual browser. A post-commit source inspection revealed and corrected a channel-key initialization error before this handoff.

**Next:** user opens https://bonoj.github.io/jit/observatory/geo/?v=d0b91f0b and sends 👁 JSON. Verify distinct energy bins, actual magnetometer headline, source IDs, per-channel freshness and quality. If successful, proceed to geometry accuracy and shared governed transport.


## 06 — GEO/02 browser result and GEO/03 diagnostic correction (2026-10-26)

**Evidence:** user 👁 report `geo/02`, captured 04:41:10.343Z: six of six NOAA requests HTTP 200; metadata correctly marked `METADATA_VERIFIED`; GOES-19 and GOES-18 magnetometers each reported 358 records and four 358-sample scientific channels. GOES-19 total 81.9320 nT at 04:37Z; GOES-18 total 90.0536 nT at 04:38Z. All 716 magnetic records `arcjet_flag:false`.

**Failure:** despite proton feeds returning 568 and 560 records with energy labels, 👁 reported a single `flux` channel with count 1 in each, rather than separate energy-threshold channels. That output does not match the *current* repository source, which keys `flux|energy`; a previous intermediate GEO/02 commit had a channel initialization bug and may have been served from a stale Pages/browser cache. **Cause not proven.** Do not attribute it solely to caching without new evidence.

**Action:** committed `geo/03` (`65e4b793`) with explicit channel initialization and new `normalizationDiagnostics`: input timed-record count, distinct energy labels, channel keys and per-channel counts. This build identity and cache-busted URL are intended to distinguish the deployed code. No user browser verification for GEO/03 yet.

**Next:** open https://bonoj.github.io/jit/observatory/geo/?v=65e4b793 , tap 👁 and inspect `build` plus `normalizationDiagnostics` for both proton feeds. Expect distinct energy thresholds with many samples each; if not, investigate actual served source and browser caching before changing science logic further.


## 07 — GEO/03 browser verification PASSED (2026-10-26 04:41:53 UTC)

**Evidence:** user pasted full `hermeticon-geo-eye/v1` build `geo/03` captured `2026-10-26T04:41:53.549Z`. All six NOAA endpoints HTTP 200, no errors; mapping and longitude marked `METADATA_VERIFIED`, four science feeds `BROWSER_VERIFIED`. Science record counts: primary/secondary magnetic 358 each; primary/secondary protons 560 each; **1,836 total**.

**Normalization confirmed:** each magnetic feed contains He/Hp/Hn/total, **358 samples per channel**. Each proton feed contains **eight distinct integral energy thresholds** (>=1, >=5, >=10, >=30, >=50, >=60, >=100, >=500 MeV), **70 samples per threshold**, for 24 normalized channels across two satellites. The GEO/02 single-flux-channel defect is absent in GEO/03; earlier cause (intermediate deployment/cache vs parser) remains unproven.

**Measured values:** GOES-19 magnetic total 82.008934 nT at 04:38Z, GOES-18 total 90.053596 nT at 04:38Z; 0/716 arcjet flags raised. Proton >=1 MeV at 04:30Z: GOES-18 0.3962133, GOES-19 0.3476792; >=10 MeV: 0.2455611 and 0.2108297; >=100 MeV: 0.2060200 and 0.1849010; >=500 MeV: 0.1813592 and 0.1746828. **Proton flux units still unverified** against provider documentation. Magnetic readings and proton channels are not automatically interchangeable or time-aligned.

**Geometry evidence:** longitude metadata GOES-19 72.5°W, GOES-18 137°W; at ~04:41:51Z approximate local solar time GOES-19 00:08, GOES-18 19:50; both `sunward:false`. `sunVisible` and `eclipsed` remain null; no authoritative ephemerides yet.

**Interpretation:** the GEO acquisition and per-energy normalization gates have passed with user browser evidence. **Not yet correlatable**: still need verified flux units, observation-time alignment and authoritative or explicitly bounded-approximation geometry.

**Next:** improve GEO geometry and time alignment against L1 while retaining raw source timestamps, instrument-specific spacecraft attribution and honest uncertainty. Migrate future acquisition through the Lattice governor before adding more feeds.
