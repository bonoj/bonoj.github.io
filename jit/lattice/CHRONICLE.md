# LATTICE — Development Chronicle

## Verbatim conversation archive

**Scope:** complete visible user–assistant turn pairs beginning with the worldwide Lattice SPEC request, immediately preceding the VET request. These are preserved as authored messages, including their rendered-response source markup where present. Tool calls and tool results are not conversation turn pairs and are not reproduced here. The present request to add this chronicle is documented after the completed pairs.

---

### Pair 1 — Worldwide Lattice specification

**Human timestamp (reported):** 2026-10-20 12:47 Eastern local time (EDT, UTC−04:00). The human originally labeled this “EST”; local civil time was EDT.

**Human (verbatim)**

> Take hormuz and make jit lattice spec. Worldwide. Give it way more data streams. Spec it. Find 50 different public telemetry streams. Include all continents including Antarctica and iss as another.

**Model (verbatim; consecutive visible final messages joined in original order)**

<badge color="success"><icon name="check" size="xs" inline/> Specification committed</badge>

# 🌍 LATTICE — Earth + Orbit

[Read the worldwide JIT specification](https://github.com/bonoj/bonoj.github.io/blob/master/jit/lattice/SPEC.md)

Built from Hormuz's architecture, I've committed a specification for **53 distinct public telemetry channels**, spanning all seven continents and the International Space Station.

<box gap={2}>
  <AsyncImage query="NASA Blue Marble full Earth planet from space high resolution" aspectRatio="16:9" width="100%"/>
  <grid columns={2} gap={2}>
    {#each [{name:"North America",n:12},{name:"South America",n:7},{name:"Europe",n:8},{name:"Africa",n:6},{name:"Asia",n:8},{name:"Oceania",n:5},{name:"Antarctica",n:4},{name:"ISS / Orbit",n:3}] as item}
      <box border radius="lg" padding={3} gap={1}>
        <text color="secondary" size="xs">{item.name}</text>
        <title size="xl" tabularNums>{item.n} <text color="secondary" size="xs" inline>channels</text></title>
      </box>
    {/each}
  </grid>
</box>

The 53 are distinct observation channels, not 53 independently operated APIs. The specification includes source entrypoints, proposed polling intervals, data contracts, and verification requirements. It does **not** claim they're all working browser integrations yet.

## The architecture

<box border radius="xl" padding={3} gap={2}>
  <box background="surface-secondary" radius="md" padding={3} align="center" gap={1}>
    <icon name="globe-2" size="xl"/>
    **One interactive Earth**
    <caption>Seven continents + ISS orbital layer</caption>
  </box>
  <row justify="center">
    <icon name="arrow-down"/>
  </row>
  <grid columns={3} gap={2}>
    {#each ["Weather","Oceans","Earthquakes","Rivers","Wildfires","Air quality","Maritime","Orbit"] as name}
      <box background="surface-secondary" radius="md" padding={2} align="center">
        <text size="xs" weight="medium" textAlign="center">{name}</text>
      </box>
    {/each}
  </grid>
  <row justify="center">
    <icon name="arrow-down"/>
  </row>
  <box background="surface-secondary" radius="md" padding={3} align="center" gap={1}>
    **Shared world engine**
    <caption>Normalize · Timestamp · Compose · Visualize</caption>
  </box>
  <row justify="center">
    <icon name="arrow-down"/>
  </row>
  <box border radius="md" padding={3} align="center" gap={1}>
    **Executable regional worlds**
    <caption>Generated from reusable WorldSpecs</caption>
  </box>
</box>

The ISS layer includes position, altitude, velocity, and orbital data from a documented public API. <Cite ref="turn292416search1"/> NASA EONET supplies a candidate global natural-events layer. <Cite ref="turn292416search6"/>

The key design decision is that **a region is a configuration of the world engine, not another application to build**.

No Supabase. No new mandatory backend. No pretending forecasts are measurements or synthetic tracks are observed traffic.

The specification also defines a repeatable benchmark for generating 50 regional worlds, with actual feed success, deployment time, and human intervention measured separately.

**Commit:** `ff632477`

The specification is committed; the worldwide executable has not been deployed yet. 🐉

---

### Pair 2 — VET

**Human timestamp (reported):** 2026-10-20 12:50 Eastern local time (EDT; UTC−04:00).

**Human (verbatim)**

> Take one turn to verify everything and lay yourself clean implementation hooks and persist in a new doc called vet.

**Model (verbatim; consecutive visible final messages joined in original order)**

<badge color="success"><icon name="check" size="xs" inline/> VET committed</badge>

**[Read `jit/lattice/VET.md`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/lattice/VET.md)**

Commit: `3e053218`

I reviewed the Lattice specification against Hormuz's actual source and public API documentation, then persisted the implementation contracts and cold-boot instructions.

The audit identified several things worth correcting before construction:

- **53 channels ≠ 53 independent sources.** Multiple channels should share provider requests.
- **ISS:** The position-history endpoint requires timestamp parameters. The initial build should use the documented current-position endpoint.
- **NASA FIRMS:** Its API may require a key; no credentials belong in public client code.
- **Antarctica:** Polar model coverage must be checked rather than assumed.
- **Maritime, BOM, and other candidate feeds:** Some URLs still need actual response-schema, licensing, and browser-CORS verification.

The VET also specifies the source registry, normalization contract, five-second due-check scheduler, globe renderer, reusable regional WorldSpecs, runtime eye, and regression tests.

**Readback verified.** The document is persisted and ready for a fresh implementation thread.

The first build is scoped to five provider families: Open-Meteo weather, marine, air quality, USGS earthquakes, and ISS positioning.

One important boundary remains: **documentation has been reviewed, but live browser ingestion across all 53 channels has not been verified.** The VET makes those checks explicit rather than treating them as completed.

Next cold boot can go directly from **VET → implementation → tests → deployment**, preserving Hormuz untouched. 🐉

---

### Pair 3 — Dracarys build

**Human timestamp (reported):** 2026-10-20 12:55 Eastern local time (EDT; UTC−04:00).

**Human (verbatim)**

> I took a submariner shower. Build and deploy. Dracarys.

**Model (verbatim; consecutive visible final messages joined in original order)**

**Dracarys. 🐉🔥**

The first worldwide Lattice executable is committed.

<text color="secondary" size="xs">Build `061f90de` · Earth + Orbit</text>

[Open Lattice](https://bonoj.github.io/jit/lattice/)

It includes a rotating-view Earth with seven selectable continents, an ISS orbital layer, UTC clock, regional source cards, and six public-data adapter families: weather, marine conditions, air quality, earthquakes, NASA natural events, and ISS positioning.

The globe, source scheduler, and regional selection are implemented in one browser-native application. No Supabase or new backend.

**Source readback passed:** all six adapter families are present in the committed executable.

GitHub's publication workflow has started for `061f90de`, but it was still running at the last check. I couldn't independently verify the public page or live browser feeds yet, so I'm not calling the deployment confirmed.

[Open Lattice](https://bonoj.github.io/jit/lattice/) · [Source](https://github.com/bonoj/bonoj.github.io/blob/master/jit/lattice/index.html) · [Publication workflow](https://github.com/bonoj/bonoj.github.io/actions/runs/39461801533)

The worldwide world is built. The remaining gate is **live publication and runtime verification**.

---

### Pair 3 — Post-build functionality snapshot (retrospective annotation, not verbatim dialogue)

**Evidence:** [README.md](README.md), first authoritative cold-boot handoff committed as `ad55cbcec15e42d63c7c03f035a18ff0af037b12`; implementation [index.html](index.html) at `061f90de787322e64029be1e0bf846a387b5d7a4`. This snapshot documents what Pair 3 **actually delivered**; it is not part of either speaker's verbatim messages above.

**Executable delivered:** mobile-first, standalone HTML/CSS/Canvas/JavaScript Earth + ISS observatory with a UTC clock, regional telemetry cards, and source-state displays. Seven continent selectors (North America, South America, Europe, Africa, Asia, Oceania, Antarctica), plus World and ISS views. The globe is an orthographic schematic with stylized hand-authored coast outlines, graticule, continent markers and visible-hemisphere ISS marker. Region selection recenters the globe; there is **no automatic globe rotation, free dragging, or canvas gesture navigation**.

**Six coded public-data adapter families:** (1) Open-Meteo weather forecast/model (temperature, wind, humidity, precipitation requested); (2) Open-Meteo marine model (wave height, SST, ocean current velocity); (3) Open-Meteo air-quality model (PM2.5, NO₂, dust); (4) USGS ComCat regional M2.5+ earthquake reports, seven-day window and 1,000-event cap; (5) NASA EONET curated *global* open-event list, 100-event cap; (6) Where the ISS At position, altitude, velocity and timestamp. Continental weather/marine/air views sample **one fixed point each**, not continental grids; inland marine sample points can fail. EONET is global, not filtered by selected region. No live AIS/vessel positions.

**Scheduler:** every five seconds checks which feeds are due; it does **not** fetch every feed every five seconds. Weather 15 minutes; marine, air quality, earthquakes and EONET 30 minutes; ISS 60 seconds. At most two requests launched per scheduler pass; concurrent same-host requests suppressed; 12-second timeout; hidden-tab pause and visible-tab resume. No proven 429 Retry-After handling, true exponential backoff, request cache/deduplication across regions, or conditional requests. ↻ runs due-check, not force-refresh.

**Instrumentation:** 👁 toggles a **local-only** JSON observer (`lattice-eye/v1`) showing build label `lattice/01`, UTC, selected region, ISS state, request counts and feed status/error records. No Supabase, no backend, no POST/GET memory loop, no persistent telemetry storage. A single `EYE_ENABLED` code switch gates the inspector.

**Verification boundary:** source committed and GitHub publishing workflow later succeeded at **12:57:03 EDT** (workflow `39461801533`), but neither live public-page loading nor browser fetch/CORS success for the six adapters was independently verified in this work. The 53-channel SPEC remains a **candidate inventory**, not 53 active channels. The build footer is a static `LATTICE/01` label, not a source SHA. No deterministic adapter test suite or reusable WorldSpec engine was demonstrated.

**Cold boot:** [README.md](README.md) is authoritative for current functionality, known issues, invariants, and next steps. [VET.md](VET.md) holds source audit and implementation hooks; [SPEC.md](SPEC.md) the future candidate catalog; this chronicle the historical record. Do not substitute the retrospective snapshot for the verbatim Pair 3 dialogue.

---

### Current archival instruction — human verbatim

**Human timestamp:** not independently established; occurs after the 12:55 Dracarys request. Do not assign 12:55 to this turn.

> Add chronicle. Preserve all turn pairs verbatim from "Take one turn to verify everything and lay yourself clean implementation hooks and persist in a new doc called vet."

**Archive boundary:** this instruction is recorded verbatim. The model's response to this current turn cannot be reproduced as a *completed prior turn pair* at the moment the chronicle is committed. Do not invent it.

## Artifact ledger (supplementary; not part of the verbatim conversation)

- Worldwide SPEC request was the first turn at 12:47 EDT, followed by VET at 12:50 and Dracarys at 12:55.
- VET specification and implementation handoff: [VET.md](VET.md), commit `3e053218e49721cdb046c80f7edf4fac3aa3f5e0`.
- Worldwide candidate source inventory: [SPEC.md](SPEC.md), commit `ff632477dedbd46d7fc992058894b6448f122f29`.
- Executable: [index.html](index.html), commit `061f90de787322e64029be1e0bf846a387b5d7a4`.
- Initial Lattice JIT entrypoint created in commit `9820dfb547caa568a127365bb3c47ed88680e3ce`.
- The deployment workflow for the executable was reported *in progress* at the time of the model's last observation. No later success or live-browser verification is implied.
- The exact messages above are conversation evidence; the ledger is separate operational context.

## Publication verification — 2026-10-20 12:57 EDT

The GitHub Actions workflow for executable commit `061f90de787322e64029be1e0bf846a387b5d7a4` completed with **success**, as independently checked through GitHub's workflow API (`run 39461801533`, `status=completed`, `conclusion=success`, `updated_at=2026-10-20T16:57:03Z` = **12:57:03 EDT**). This verifies a successful publishing workflow at the requested minute, **not an independently loaded public page or successful client-side telemetry fetch**. Public URL: https://bonoj.github.io/jit/lattice/ . Do not conflate successful workflow with browser runtime verification.

**Timestamp convention:** the three human turns are reported as SPEC 12:47, VET 12:50, Dracarys 12:55; the GitHub publication workflow succeeded at 12:57:03. The later Chronicle request has no verified minute. The requested abbreviation EST is historically incorrect on October 20, 2026: daylight saving time is still in effect, so the accurate abbreviation is EDT (UTC−04:00).


---

## Transport-governor frontier — 2026-10-20 (time not independently verified)

### Human direction (verbatim)

> Inspect the hormuz good api call behavior vs lattice.

> Lattice needs one contract for any endpoint to use. Good behavior forced.

> Let's add to chronicle.

### Source inspection and architectural synthesis

The model read the executable `jit/hormuz/index.html` and `jit/lattice/index.html`, not only their README files. Hormuz's fixed-source collector uses a five-second **due-check**, per-source cadence, 12-second abort timeout, hidden-tab pause, explicit online recovery, and capped exponential retry backoff. Lattice retains due-checks and timeouts, adds multi-region channels and host-level in-flight suppression, but introduces a linear retry-delay expression instead of exponential backoff; shares EONET/ISS request keys globally while retaining redundant world/ISS USGS identities; lacks an explicit online listener; and skips busy-host work until a later scheduler pass rather than maintaining a proper queue. This was a **static source inspection, not measured browser network traffic**.

The model initially recommended a transport-hardening pass. The human sharpened that into a stronger invariant: **one contract for every endpoint, with good behavior enforced by the machinery rather than expected from adapter authors.** This is not merely a patch to the six existing adapters. It is the admission contract for all future telemetry sources.

### Persisted design decision

[TRANSPORT_CONTRACT.md](TRANSPORT_CONTRACT.md) created in commit `2c2f8aa83ebc39c185d6233a9ad963009bc9a8ad`. [README.md](README.md) updated to make the contract the mandatory next cold-boot implementation in commit `725d7b8173525900ea07e03a9e16cd5e20365d2a`.

The contract separates **endpoint declaration → transport governor → normalized observations → world**. Adapters declare request construction, source policy and parsing; only the governor may perform network I/O. Its required controls include validated registration; canonical request identities; cross-view deduplication; per-endpoint and per-host budgets; bounded fair queues and concurrency; capped exponential backoff with jitter and Retry-After; timeout and abort; offline/hidden pause with controlled resumption; bounded caching and stale-data preservation; provenance and source timestamps; and centrally inspectable 👁 request statistics. Manual refresh cannot bypass provider limits. Tests must exercise failure and rate-limit scenarios under fake clocks and fake fetch, including 50+ registered channels.

**Verification boundary:** these controls are **specified and committed as documentation, not implemented or tested in Lattice's executable**. The six current adapters still use their original scheduler. Next model must implement the governor, migrate all six adapters, prove deterministic transport invariants, then resume source expansion. Hormuz remains untouched. Do not claim that the contract already enforces anything at runtime.

### Why this matters

The previous six-adapter implementation was a coherent one-turn vertical slice, not completion of the requested 53-channel worldwide inventory. Scaling should not multiply custom fetch loops, provider load, or failure modes. The intended property is compositional: a 54th endpoint receives good behavior by registering with the same transport, without inventing a scheduler of its own.


### Dracarys — implementation and consolidation (2026-10-20)

Human: **“We don't need a separate document. Implementat it verify working.”** After a blocked first write, the human invoked **“Sanctum contract and dracarys.”** The model read Sanctum CONTRACT and Gate README, recovered using a smaller GitHub Contents update, and committed the transport governor in `49540de89fb9c98f85577990137ca2a36bd199d3`. The implementation retains six adapters and a single fetch call site, adds canonical-URL deduplication, bounded queue, global/host concurrency controls, backoff, Retry-After, stale preservation, online recovery, and 👁 counters. Source readback confirmed the governor and all six adapter definitions; JavaScript syntax compilation passed. **No live browser request verification or deterministic fake-clock transport tests have been demonstrated.** The earlier standalone transport contract was folded into README and removed in commit `223d1841008cd5edaffc956afe919cf9be775aad`. Do not confuse source validation with runtime verification. The original transport contract's more ambitious controls (fairness guarantees, comprehensive host rate windows, provider policy validation, and deterministic test suite) remain incomplete.


### Expansion pass — NWS alerts (2026-10-20)

After a user-supplied live 👁 observation showed three successful World requests and zero failures, the human directed **“Engage.”** The model added a seventh adapter family, **US National Weather Service active weather alerts**, to the North America view. Its public endpoint is `https://api.weather.gov/alerts/active?status=actual&limit=100`; minimum cadence five minutes; response is a GeoJSON feature collection, displayed as a count with explicit first-100 cap. The adapter is routed through the same governor and does not introduce another fetch call site. Commit `6202176c385b954d231be01b0a084643e9917a84`. GitHub source readback and JavaScript syntax compilation passed, and the single-fetch-site invariant remained true. **Live NWS browser fetch/CORS and deployed Pages runtime are not independently verified.** World observation establishes success for ISS/USGS/EONET only; no claim of regional adapter success is justified by that observation.


### Batch instrumentation pass — 2026-10-20

Human requested multiple endpoint integrations and verification instrumentation in one pass. Commit `dd7f9f1cc86e53794864f2574085d8e69be30bfb` adds three governed adapters: ISS TLE orbital elements (ISS view), UK Environment Agency flood warnings and level-monitoring station list (Europe view). Together with the prior NWS alert adapter, this is **ten coded adapter families**. The 👁 button now queues every configured region's endpoints through the existing governor, waits up to 45 seconds for the batch, and copies a JSON report with per-request URL, status, last success, next due, failure count, error, transport counters and view states. The report may show PENDING work after timeout; it must not mislabel unfinished work as verified. All work obeys normal host concurrency and cadence, with no direct adapter fetch. Readback, JavaScript syntax and single-fetch-site check passed. **Real provider responses, browser CORS, batch completeness, and live Pages deployment have not yet been verified.** Source IDs/URLs in diagnostics are public endpoints; no private telemetry is intended.


---

## Archived specification — pre-ingestion-contract revision (2026-10-20)

The following is preserved as the earlier SPEC text, including historical aspirational claims and phase planning. Current authority is SPEC.md.

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
