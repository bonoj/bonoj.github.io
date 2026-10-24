# Observatory · Acquisition and correlation specification
Status: active plan · 2026-10-23 · companion to [README](README.md)

## Mission
Build a broad, composable, evidence-driven scientific observation network: Sun and L1 → heliosphere / transfer trajectories → geosynchronous and low Earth orbit → ionosphere / ground → ocean and other remote sensors. Ingest real measurements at maximum useful breadth, without treating provider catalogs, models, forecasts, stale data or derived calculations as fresh observations. Correlate measured changes across locations, domains and time. Public Hermeticon presentation remains one-viewport, pristine white, minimal and unexplained; technical detail lives in 👁 and this spec. No claims of spacecraft hardware or onboard software ownership.

**Priority is acquisition, not UI polish.** Existing L1 wall works; keep it running. No arbitrary limit of three experiments or nine channels. No fabricated measurements or scientific causality.

## Source inventory and acquisition waves

Each item is a source *family*, not a verified feed unless marked **BROWSER VERIFIED**. Do not equate documented access with browser acceptance.

### Wave 0 — protect and expand existing L1 (BROWSER VERIFIED: two NOAA streams)
- NOAA RTSW plasma: https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json
- NOAA RTSW magnetic: https://services.swpc.noaa.gov/json/rtsw/rtsw_mag_1m.json
- Source spacecraft SOLAR1, ACE, IMAP observed in user's 👁 report; active SOLAR1 at that moment. Nine numerical channels verified, not every possible field. Fix `8bba56e6` for chronological temperature selection needs browser recheck.
- Enumerate *all* actual numeric fields and their units, coordinate frames, fill values, coverage, per-spacecraft identity, active flag, timestamp, sample count and quality flags. Capture velocity X/Y/Z GSE/GSM, proton density/speed/temperature, alpha channels only if populated, Bt, Bx/By/Bz GSE/GSM and any angles provided. Preserve raw source differences; never silently merge ACE, IMAP and SOLAR1.
- NOAA RTSW ephemerides candidate: https://services.swpc.noaa.gov/json/rtsw/rtsw_ephemerides_1h.json — inspect records, positions, coordinate systems, interpolation and freshness before displaying.
- Official 2026 format migration notice: https://www.weather.gov/media/notification/pdf_2026/scn26-21_Data_Format_Changes_Impacting_SWPC_Products.pdf

### Wave 1 — NOAA GOES primary AND secondary (public JSON inventory confirmed; browser measurement verification pending)
- Base https://services.swpc.noaa.gov/json/goes/
- Probe `instrument-sources.json` and `satellite-longitudes.json` to attribute each channel to a specific satellite.
- For each of `primary` and `secondary`, prioritize 6-hour JSON to bound bytes:
  - `differential-protons-6-hour.json`
  - `differential-electrons-6-hour.json`
  - `differential-alphas-6-hour.json`
  - `integral-protons-6-hour.json`
  - `integral-electrons-6-hour.json`
  - `magnetometers-6-hour.json`
  - `xrays-6-hour.json`
  - `euvs-6-hour.json`
- Other catalog products: X-ray flares, SUVI flare events, electron/proton fluence, longer history; fetch on demand rather than repeatedly downloading multi-megabyte archives. Do not confuse solar-viewing X-ray/EUV channels with local GEO particle measurements.
- NOAA primary listing: https://services.swpc.noaa.gov/json/goes/primary/ ; secondary: https://services.swpc.noaa.gov/json/goes/secondary/
- Identify energy bins, physical units, fill values, detector orientations, contamination warnings, satellite substitutions, cadence and quality. In particular energetic proton contamination can invalidate GOES >2 MeV electron flux during proton events.

### Wave 2 — other heliospheric/L1 observatories (candidate, validate availability)
- IMAP I-ALiRT: discover official, documented machine-readable delivery for energetic electrons, helium ions, ion composition, charge states, counterstreaming electrons and instrument-level metadata. Check latency, archive rights, CORS and whether products are actual measured time series. Do not infer public access from mission descriptions.
- ACE: inspect NOAA ACE directory and NASA/SPDF CDAWeb/SSCWeb for magnetic field, plasma, energetic particle and composition data. Distinguish NRT vs historical and source overlap with RTSW.
- SOLAR-1/SWFO-L1: investigate STIS suprathermal ions and CCOR-2 coronal imagery/catalogs. CCOR images are images, not scalar measurements; represent as separate modality.
- SOHO LASCO, STEREO, DSCOVR, and additional heliophysics archives where accessible. Identify actual spacecraft location and instrument, cadence and latency; not everything labeled solar is physically at L1.
- Orbital/transfer-trajectory geometry: NASA JPL Horizons or authoritative ephemerides/TLEs where suitable. Derived orbital geometry is tagged **calculated**, not telemetry. Preserve reference frame, epoch and propagation uncertainty.

### Wave 3 — near-Earth orbit and geospace (candidate unless validated)
- NOAA GOES (above); ESA SOSMAG GEO magnetic vectors; ISS location/orbit (earlier Observatory telemetry wall acquired it); ISS radiation instruments only when genuine time-tagged public readings are accessible.
- NASA radiation-belt/Van Allen legacy archives, THEMIS/ARTEMIS and MMS plasma/field data where timely or archival machine-readable access exists.
- NOAA OVATION aurora model: https://services.swpc.noaa.gov/json/ovation_aurora_latest.json — **modeled output**, not direct auroral measurement.
- NOAA planetary K and Boulder K, Kyoto Dst and geospace products: https://services.swpc.noaa.gov/json/planetary_k_index_1m.json ; https://services.swpc.noaa.gov/products/kyoto-dst.json . Identify provisional/index vs raw magnetometer values, publication latency and coverage.

### Wave 4 — ground, ionosphere and polar (candidate)
- DTU/Danish magnetometer network (high cadence); INTERMAGNET observatory vectors; SuperMAG network; local station identity, latitude, cadence, quality, baseline and licensing.
- Polar neutron monitor count rates (NMDB or station providers); validate counts and station timestamps, not metadata.
- GNSS ionospheric total electron content (TEC), ionosondes, auroral imagers, riometers and geomagnetic indices where permitted public machine-readable access exists.
- Compare ground stations across longitude/latitude and local magnetic time, not just UTC. Capture observatory metadata and coordinate frames.

### Wave 5 — cross-domain scientific network (candidate)
- OOI/ERDDAP and Argo/BGC-Argo dissolved oxygen, pressure, depth, temperature, salinity; real values and measured depth mandatory.
- Ocean-bottom pressure, tides, sea level, seismic and atmospheric electricity where robust feeds exist. These are exploratory controls, not assumed solar-response instruments.
- Solar radio observatories and GONG photospheric field measurements as solar-origin context. Separate measured image/field data from event catalogs and forecasts.
- Extend opportunistically to other legitimate orbital observatories and transfer orbits. Maintain a source registry rather than a hard-coded finite list.

## Acquisition contract
For **every feed**, prove: provider URL and documented access; browser CORS; HTTP status; representative bounded payload; timestamped numeric measurement or genuine image; spacecraft/station/instrument; physical units and coordinate frame; measured vs modeled vs predicted vs calculated; quality flags/fill values; latency; sampling cadence; refresh expectations; rate limits/license. A catalog entry, HTTP 200 with empty arrays, forecast or timestamp of retrieval alone is not acceptance.

Source lifecycle: `CANDIDATE → PROBED → BROWSER_VERIFIED → INGESTED → CORRELATABLE`, with independent `BLOCKED/STALE/DEPRECATED` states. No promotion without 👁 evidence from the deployed browser. Keep short error/evidence ledger inside machine-readable 👁 and source registry; no prose Chronicle required.

Data record (conceptual): `{provider, endpoint, mission, platform, instrument, channel, observedAtUTC, fetchedAtUTC, value, unit, frame, position, energyBand, depth, quality, status, dataKind, sourceRecordId, latencyMs}`. Null and fill sentinels remain missing, never zero. Avoid misrepresenting rolling means as instantaneous values. Multiple instruments can observe different energy bands; don't compare them as interchangeable.

## Reuse Lattice, don't reinvent
Read [Lattice README](../lattice/README.md), [SPEC](../lattice/SPEC.md), [runtime](../lattice/index.html), and [Observatory README](README.md). Preserve the existing Lattice request governor: max 2 globally/1 per host, bounded queue, host pacing, dedup, timeout/retry/backoff, cache, lifecycle, 👁 observability, SHA-aware Pages publishing and refresh. The L1 acquisition wall currently has a *separate* lightweight fetch loop: migrate/consolidate deliberately; don't falsely claim the governor is already wired. Prefer browser-only; do not add a backend unless a demonstrable provider restriction makes it necessary. Cache large archives; stagger polls by real cadence; no uncontrolled fan-out.

## What we do with the data

1. **Observe:** capture normalized time series and raw evidence with truthful staleness and provenance. Maintain bounded rolling windows in-browser and optional GitHub-hosted historical snapshots only when justified; don't imply a live archive persists between page visits.
2. **Align:** convert UTC consistently, retain original cadence and uncertainty; align to common windows using explicit aggregation, interpolation limits and missing-data masks. Never interpolate across outages or invent readings.
3. **Locate:** use spacecraft ephemerides and observatory coordinates to derive geometry, L1→magnetopause propagation estimates and appropriate solar-wind transit time windows. Distinguish model estimates from observed event arrival.
4. **Compare:** side-by-side synchronized traces, scatter plots, lag scans and event-aligned overlays. Compare SOLAR1/ACE/IMAP for interspacecraft consistency; L1 plasma/Bz against GEO magnetic field, GOES energetic particles, Dst/Kp, auroral response and polar ground magnetometers.
5. **Detect:** change points, threshold crossings, shocks, southward IMF intervals, particle enhancements, cross-sensor divergence and sensor failures. Thresholds must be documented and quality gated; no automatic claims of causal discovery.
6. **Test:** compute lagged correlation and cross-correlation over explicit windows, account for autocorrelation, irregular sampling, common solar drivers, selection bias and multiple testing. Display sample counts, effect sizes, confidence/uncertainty and alternative explanations. Distinguish plausible physical transmission from cross-domain coincidence.
7. **Replay:** use historical storms and quiet periods as validation fixtures. Demonstrate that an inferred lag/association survives held-out events rather than tuning to one attractive example.
8. **Synthesize:** produce concise machine-readable event dossiers: what changed, where/when, supporting channels, lags, quality, uncertainty, and direct provenance. Permit an observer to investigate, not merely consume an AI-generated narrative.
9. **Present:** keep the public interface a restrained instrument rather than a dashboard. Reveal scientific depth through direct manipulation and the single 👁 JSON report. Expose live vs archived/modelled labels where needed for truthfulness; never advertise speculative correlations as facts.

## Candidate investigations
- **Upstream propagation:** L1 solar-wind speed/density/dynamic-pressure proxy/Bz → GEO magnetic field → terrestrial magnetic disturbances. Transit time is geometry- and velocity-dependent, not a universal fixed delay.
- **Energetic particles:** IMAP/ACE L1 populations vs GOES differential/integral energy-resolved channels, with attention to different energy bands and magnetic connectivity.
- **Solar-to-geospace:** GOES solar X-ray/EUV flare signatures vs ionospheric TEC, radio absorption/riometer and geomagnetic context; not every response shares the L1 plasma travel time.
- **Cosmic-ray modulation:** neutron monitors vs L1 field/solar-wind structures over suitable timescales.
- **Distributed magnetism:** L1 IMF vs GEO and multiple ground latitudes/local times.
- **Exploratory controls:** deep-ocean/atmospheric/seismic time series; coincidence searches explicitly labeled non-causal, with null controls and false-discovery safeguards.

## Execution sequence
A. Recheck deployed L1 temperature fix; inventory all non-null source-specific fields and QC.
B. Probe RTSW ephemerides and GOES instrument-source mapping, primary/secondary 6-hour particle, magnetometer, X-ray/EUV feeds; publish one bounded 👁 report showing actual browser payload acceptance.
C. Integrate validated GOES and L1 ephemerides without breaking existing channels; implement normalized source registry and multi-spacecraft attribution.
D. Probe IMAP I-ALiRT, ACE, CCOR-2 and ground magnetometers; add verified channels in batches, recording blockers once and pivoting rather than thrashing.
E. Build UTC-aligned, lag-aware comparison machinery and first physically plausible L1→GEO→ground experiment.
F. Add historic event replay, independent controls, quality gates, and event dossiers.
G. Bring the proven instrumentation into the approved Swiss study's one-viewport shell; maintain one 👁. Keep the root Lattice clone as rollback until migration passes.
H. Continue expanding source families, geography, orbital regimes and measurement modalities; no artificial ceiling.

**Definition of done for each wave:** browser-verified measurements with truthful provenance and QC, successful deployed 👁 diagnostics, no regression to existing feeds, documented source registry and at least one meaningful cross-sensor investigation where relevant. The project itself has no fixed final channel count.
