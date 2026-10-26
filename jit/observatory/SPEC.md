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


## Sun–Earth observational cone — geometric acquisition contract (2026-10-26)

### Governing idea

Organize acquisition as a moving **sunward observational footprint**:

**L1 upstream measurements → every eligible geosynchronous position with unobstructed solar line of sight → the sunlit terrestrial surface.**

This is a geometric *selection and comparison framework*, not an assertion that the solar wind travels along a straight cone or that all three domains share identical physical coupling. The cone defines where we seek simultaneous measurements; causal hypotheses are evaluated separately.

### Geometry and frames

- Define the instantaneous Sun direction from an authoritative solar ephemeris, Earth-center position, and epoch, preferably in a common Earth-centered inertial frame. Sun–Earth L1 lies approximately 1.5 million km sunward, but the actual observing spacecraft occupy halo/Lissajous trajectories rather than a fixed point. Use each spacecraft's actual ephemeris when available.
- For any satellite position vector **r** relative to Earth center, and unit direction **s** toward the Sun, the geometric dayside criterion is **r · s > 0**. This distinguishes sunward from anti-sunward orbital sectors, but does not by itself determine eclipse.
- Determine Earth occultation separately: from the satellite, cast the ray toward the Sun and test its closest approach to Earth's ellipsoid (with atmospheric/refraction and solar angular-radius treatment if needed). A GEO spacecraft can be **sun-visible** while lying on the anti-sunward half of its orbit; therefore record **sunward**, **sun-visible**, and **eclipsed** as distinct properties. For a simple spherical approximation, with ray **r + t s**, t ≥ 0, occultation occurs when the ray intersects the Earth sphere; use the ellipsoid for operational classification.
- A geostationary satellite maintains approximately fixed Earth longitude, not fixed solar local time. Earth's rotation moves its solar-local-time sector over a day. Inclined geosynchronous orbits additionally move in latitude/longitude. Do not equate geostationary and geosynchronous, or assume every GEO spacecraft passes directly under the L1 spacecraft.
- For terrestrial surface point **x** with outward surface normal **n**, the instantaneous sunlit criterion is **n · s > 0**, with twilight/solar-disk/terrain qualifications as needed. Include the moving terminator and each station's solar zenith angle. The surface dayside and the satellite's visible-Sun domain are not the same geometric test.
- **Directly below L1** is colloquial: the L1-to-Earth direction intersects Earth's dayside, but an Earth-centered GEO ring does not form a persistent collinear stack with L1. Rank GEO instruments by solar-local-time separation, angular distance to the Sun–Earth axis, spacecraft position, and measurement relevance rather than declaring a permanently vertical arrangement.
- A drawing of the cone is **not to scale**; the geometric dayside at GEO is a half-orbit criterion, while sunlight visibility covers nearly all GEO except eclipse seasons/intervals. The footprint should be visualized as nested domains with independently computed masks, not a literal cone of identical physical exposure.

### Conceptual diagram (not to scale)

~~~text
                           SUNLIGHT / SOLAR WIND →
 SUN                     L1 vicinity                       EARTH / GEO
 ☼ ─────────────────────── ◇ ─────────────────────────────── ◎
                            │                              / | \
                      SOLAR1 / IMAP / ACE             GEO orbit / dayside
                      upstream B, plasma              ● sunward + sun-visible
                            │                         ○ sun-visible, nightside
                            │                         × Earth-eclipsed
                            └──────── time alignment ────────┐
                                                              ▼
                                                  ☀ terrestrial dayside
                                                  moving stations / ionosphere
                                                  ground magnetism / atmosphere

  Solar photons: near light-speed propagation; solar-wind plasma: variable
  convection/transit time; magnetic/particle response: magnetospheric physics.
  Visibility ≠ sunward location ≠ physical coupling ≠ data availability.
~~~

### Satellite inventory and honest snapshot counts

The number of **geometrically eligible** GEO spacecraft is not the number of **scientifically measurable** GEO spacecraft. Many communications satellites have published orbital positions but no public, timestamped magnetometer, plasma, or radiation telemetry. Never count positional metadata as instrument measurements.

At every acquisition epoch maintain:
1. **catalogued GEO candidates** with trustworthy ephemeris/TLE, epoch, orbital regime and uncertainty;
2. **sunward candidates** based on geometry;
3. **sun-visible candidates** based on Earth occultation;
4. **instrumented candidates** with identifiable relevant sensors;
5. **browser-verified telemetry sources** with actual time-tagged values and quality;
6. **correlatable sources** with adequate cadence, history and synchronized timestamps.

GOES primary/secondary are initial *feed families*, not immutable spacecraft identities. Resolve instrument-sources and satellite-longitudes metadata on each relevant update. Begin with available GOES magnetometer and particle feeds; investigate ESA SOSMAG and other genuinely accessible GEO scientific sensors. Counts are measured and time-dependent, not assumed.

For each GEO snapshot record: UTC, platform and instrument, orbital longitude/latitude/altitude, ephemeris age, Sun direction, solar local time, Sun-Earth axis offset, dayside flag, sun-visibility/eclipsed flag, magnetic local time if derived, channel and energy band, value/unit/frame, observedAt, latency, sample count, flags and provenance. Preserve samples across 24 hours to observe local-time evolution. Distinguish two fixed spacecraft observed many times from many distinct spacecraft.

### Physical propagation and comparisons

**Upstream L1 → GEO:** solar-wind structures convect toward the terrestrial bow shock, then interact with the magnetosheath/magnetopause and magnetosphere. Estimate time of flight using the measured radial flow component and actual spacecraft geometry; do not use a universal fixed delay or assume straight-line transfer of IMF components. Compare quality-valid L1 speed, density, dynamic-pressure proxy and IMF Bz against GOES magnetic perturbations, particle flux, and local-time position. Retain propagation-model uncertainty and potential differences between L1 spacecraft.

**Sun → GEO / ground:** X-ray/EUV photons and direct illumination travel at light speed and can produce dayside ionospheric responses. Treat this as a separate photon-driven pathway, not a solar-wind transit sequence. GOES solar-viewing X-ray/EUV measurements should not be mislabeled as local GEO environmental conditions.

**GEO → ground:** compare magnetic and particle responses with ground magnetometers, GNSS TEC, riometers and other stations; evaluate geographic and magnetic local time, latitude, sunlight, and station quality. Magnetic disturbances can extend across the nightside, so the sunward footprint is a prioritized sampling window, **never an exclusion rule** for physically connected observations.

### Implementation sequence for the cone

A. Keep existing two NOAA L1 streams and their nine working channels; reverify the 2026-10-26 👁 evidence and expose all valid source-specific fields and quality metadata. The report showed both HTTP 200, SOLAR1 active, ACE and IMAP also present; a newer ACE sample than active SOLAR1 is possible. Never silently substitute freshness for active status or vice versa.

B. Probe NOAA RTSW ephemerides and GOES instrument-source/longitude registries. Build the geometry service from authoritative orbital/solar positions; label calculated geometry and uncertainty, never telemetry.

C. Acquire GOES primary **and** secondary magnetometer, differential/integral particle, X-ray and EUV data with instrument attribution, browser-verified CORS, real timestamps, fill-value handling and bounded cadence. Keep solar-facing measurements and local GEO environmental channels distinct.

D. At each timestamp compute the independently testable masks **sunward**, **sun-visible**, **eclipsed**, and **terrestrial daylight**. Preserve time series and 24-hour unique-platform counts, not just current dots. Include no-telemetry candidates in a separate catalog layer, never in the scientific signal count.

E. Align L1/GEO/ground series with quality gating and explicit lag estimates. Start with one solar-wind pressure/Bz event and compare GOES magnetometer response, then introduce terrestrial magnetometer and ionospheric instruments. Test dayside against nightside controls rather than suppressing them.

F. Visualize the footprint as a dynamic orbital cross-section and moving ground terminator. Keep the public experience spare, single-viewport and interactive; 👁 exposes all detailed geometry, provenance, validity and correlation evidence. Reuse Lattice transport and governor rather than creating another uncontrolled fetch loop.

**Success criterion:** a visitor can select an epoch and see which spacecraft and ground stations lie within each precisely defined geometric domain, which have *actual* measured signals, how the signals are time-aligned, and what evidence supports or contradicts a proposed L1→GEO→ground relationship.


## Parker Solar Probe — solar-origin archival acquisition and synthesis (2026-10-26)

### Role and epistemic boundary

Extend the Observatory's heliophysics geometry sunward from the L1–GEO–ground observational cone to include **Parker Solar Probe (PSP)** as a high-resolution, **delayed / historical** solar-origin observatory. PSP is in a highly elliptical heliocentric orbit; it is not continuously between the Sun and Earth, nor always magnetically connected to the solar-wind parcel later sampled at L1. Never imply that PSP is a near-real-time Earth upstream monitor. Maintain distinct timestamps for **observed**, **received/downlinked if known**, **publicly released**, **fetched**, and **ingested**; unknown dates remain null.

### Instrument and product inventory — candidates, not browser-verified

- **FIELDS:** vector magnetic field, plasma waves, electric fields, spectral/waveform products. Prioritize time-tagged 1-minute magnetic vectors for first ingestion, then higher-cadence magnetic data (some products have ~3.4 ms resolution), electric-field and wave/spectral products. Record reference frame, calibration level, cadence, fill values, quality flags, and sampling-mode changes. High-rate waveform data are potentially large and bursty: fetch on demand by interval, never blindly poll entire archives.
- **SWEAP / Solar Probe Cup (SPC):** proton/alpha bulk moments, density, radial speed, temperature or thermal speed, and ion distributions as available. Certain products offer subsecond resolution (~0.2185 s), but availability depends on instrument mode, encounter and product. Treat those figures as nominal *sample spacing*, not public refresh rates.
- **SWEAP / SPAN-A / SPAN-B:** ion and electron velocity distributions, moments, composition where actually present, pitch-angle information and energy bins. Cadence ranges by product/mode; inspect each dataset's metadata rather than assigning a universal interval.
- **ISʘIS:** energetic ion/electron flux, spectra and particle event signatures. Preserve energy band, detector orientation, species and accumulation interval. Investigate EPI-Lo/EPI-Hi product families independently.
- **WISPR:** white-light coronal/heliospheric imagery and sequences, distinct from scalar time series. Preserve image observation time, pointing, exposure, geometry, calibrated versus browse/quicklook provenance, and licensing. Images may be downlinked and published on a different schedule from particle/field data.
- **PSP ephemerides / attitude:** authoritative spacecraft position, heliocentric distance, longitude, latitude, solar elongation and relevant coordinate transforms, with predicted versus reconstructed provenance. Geometry is **calculated**, not a spacecraft measurement.

### Discovery and acquisition endpoints

Use authoritative provider catalogs to identify **exact dataset IDs**, current coverage, data levels, field names, units and access conditions before implementing readers:

- NASA CDAWeb HAPI: https://cdaweb.gsfc.nasa.gov/hapi — discover datasets with \`/catalog\`, metadata with \`/info?id=...\`, and bounded series via \`/data?id=...&parameters=...&time.min=...&time.max=...\`. Confirm exact HAPI query semantics, browser CORS and response type against actual provider responses; never invent a dataset ID.
- NASA CDAWeb: https://cdaweb.gsfc.nasa.gov/ — CDF science archives and SPDF services.
- PSP FIELDS project: https://fields.ssl.berkeley.edu/data/ — mission/instrument data releases and files.
- PSP SWEAP project: https://sweap.cfa.harvard.edu/ — instrument documentation and release information.
- NASA PDS / mission instrument archives for ISʘIS and WISPR, where documented; resolve canonical links and machine-readable inventories before coding.
- NASA JPL Horizons / SPICE kernels or mission-provided ephemerides for orbital context, with clear source, epoch and frame.

Source lifecycle: **CANDIDATE → METADATA_DISCOVERED → HTTP_PROBED → BROWSER_VERIFIED → INGESTED → ANALYSIS_READY**. An available web page, dataset title or HTTP 200 without time-tagged records does not qualify as ingested. Record blocked CORS, missing data, archive delays and license constraints once, then pivot rather than repeatedly retrying.

### Collection schedule: discovery, incremental harvest and burst access

**Data production cadence ≠ public release cadence ≠ Observatory polling cadence.** PSP's onboard observations can range from milliseconds to minutes or longer depending on instrument and mode, while downlink, calibration, validation and public release are delayed, often encounter-based. Do not claim a fixed universal publication lag. The SWEAP policy's “within 90 days after final encounter data receipt” is not equivalent to 90 days after observation. Instrument release dates and coverage must be discovered from actual catalogs.

| Collection task | Initial cadence | Method and bounds |
| --- | --- | --- |
| Dataset discovery / release watch | Once daily | Query catalogs / published manifests and coverage metadata; compare IDs, coverage end times, versions, checksums/ETags if available; do not download unchanged bulk data |
| PSP position / trajectory | Daily for catalog refresh; compute geometry per selected epoch | Cache authoritative ephemerides and provenance; distinguish predicted/reconstructed |
| FIELDS low-rate vectors and SWEAP moments | On newly published coverage; otherwise daily metadata-only | Backfill only new time windows in bounded chunks; validate timestamps, quality, units, coordinates and source spacecraft |
| ISʘIS particle spectra | On newly published coverage; metadata check daily | Partition by instrument, species, energy and observation interval |
| WISPR image sequences | Check manifests daily; fetch on release / user selection | Retrieve browse/thumbnail first, calibrated imagery only as needed; cap bytes |
| FIELDS high-rate / SPC subsecond / distribution products | **On demand** for selected events | Fetch narrow intervals with explicit byte/sample budgets, downsample for display, preserve native-resolution raw evidence links |
| Historical backfill | Initial staged import, then opportunistic | Start with a few scientifically relevant encounters and quiet controls; expand progressively without blocking live L1/GEO collection |

**Operational guardrails:** preserve the inherited Lattice governor (max 2 concurrent globally / 1 per host, bounded queue, host pacing, dedup, timeout/backoff and caching). Archive checks must not starve near-real-time L1 and GOES requests. If a browser endpoint is blocked by CORS, evaluate a reproducible GitHub Actions archival import with versioned static artifacts rather than inventing a permanently running backend. Only schedule such a job after actual provider accessibility and repository/storage cost have been measured. Daily checks are a **planned application schedule**, not an assertion that a background automation has been installed.

### Normalization, persistence and provenance

Canonical sample/event metadata: \`{mission:"PSP",instrument,platform,productId,productVersion,level,observedAtUTC,receivedAtUTC,publicReleaseAtUTC,fetchedAtUTC,ingestedAtUTC,value,unit,frame,energyBand,position,heliocentricDistance,quality,fillMask,cadence,sourceUrl,sourceRecordId,calibration,kind:"observed"}\`. Store per-product coverage intervals and gaps. Derived geometry, transformations, interpolations, lag estimates and models carry \`kind:"calculated"\` or \`kind:"modeled"\`, never \`observed\`.

Prefer a small versioned manifest with dataset IDs, last-covered timestamps, retrieval status, checksums, sample counts, byte totals, quality statistics and release evidence. Keep full-resolution archive products at their authoritative sources unless caching is justified; persist only bounded normalized summaries and selected event windows. Avoid presenting local browser session history as a durable scientific archive.

### Planned synthesis and scientific tests

1. **Solar-origin context:** overlay PSP magnetic vectors, plasma moments, energetic particles and WISPR imagery along the spacecraft's actual orbit. Identify switchbacks, shocks, waves, heating and particle enhancements with instrument-aware thresholds and data-quality gates.
2. **Radial evolution:** compare PSP intervals with L1 solar-wind structures where heliolongitude, solar rotation, flow speed, radial distance and magnetic connectivity make correspondence plausible. Calculate a Parker-spiral / ballistic-mapping hypothesis with explicit uncertainty, not a simplistic fixed timestamp shift.
3. **Propagation into the terrestrial cone:** for *candidate connected events*, compare PSP → L1 → GOES GEO → ground time series, with separate plasma, energetic-particle and solar-photon pathways. Preserve physical transit mechanisms and frame conversions; a WISPR image is contextual evidence, not a scalar plasma reading.
4. **Cross-spacecraft triangulation:** compare PSP with ACE, IMAP, SOLAR1, and other heliophysics assets when simultaneous geometry supports it. Record relative heliolongitude, radial distance, time offset, observed quantities and gaps. Lack of connectivity is a valid negative result.
5. **Historical event replay:** choose solar-storm encounters and quiet controls, derive explicit event dossiers (times, instruments, data levels, measured changes, proposed lag, sample counts, alternative explanations, uncertainty, provenance). Test candidate associations on held-out intervals and correct for selection bias, autocorrelation and multiple comparisons.
6. **Interactive presentation:** add PSP as a separate **historical solar-origin layer** in Hermeticon, with orbital position and selectable encounter/time window; keep L1/GEO near-real-time labels and data freshness distinct. 👁 must expose product coverage, latest public release, acquisition state, coordinate frames, geometry assumptions and raw-source links.

### First implementation pass and acceptance gates

A. Enumerate actual PSP datasets from HAPI and mission archives; record field names, cadence, coverage, data level and access. B. Browser-probe one bounded FIELDS magnetic vector series and one SWEAP moment series with numeric observations and valid timestamps; collect 👁 proof. C. Obtain an authoritative ephemeris for the same interval and compute PSP–Sun–Earth geometry. D. Render one genuine historical interval and a compact acquisition report, clearly labeled archival. E. Add an incremental daily manifest comparison; fetch newly available bounded windows without disrupting L1/GOES. F. Select one event for physically defensible PSP/L1 comparison and one unconnected control. G. Expand to ISʘIS, WISPR and high-resolution bursts only after the baseline is verified.

**Done for this wave** means at least two independently validated PSP measurement products, truthful temporal/provenance metadata, orbit geometry, bounded retrieval, a reproducible historical playback and one evidence-based comparison hypothesis. A dataset listed in a catalog is not completion.
