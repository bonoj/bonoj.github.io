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


---

## Implementation campaign — October 20, 2026 (continuation)

This section records the subsequent development and human-provided runtime evidence. Unlike the initial verbatim archive above, this is a synthesized engineering chronicle. **Commits prove repository changes; human 👁 snapshots prove what actually ran in the browser.** Neither is interchangeable. Time is UTC unless stated otherwise.

### 53-channel inventory and normalization (turns 1–3 of 10)

- **Inventory:** `6d08658` introduced `channels.json` with 53 numbered candidates, 17 adapter families, source/provider identities, and explicit statuses; `9ec73b5` updated the README.
- **Extraction mappings:** `1afbd79` coded 25 of 53 channel field/unit/kind/sample mappings; the other 28 remained specified candidates, not live implementations.
- **Pure normalization seam:** `8d619b3` added `normalize.mjs`; `422c2e4` added `normalize.test.mjs`; `2af8ff2` recorded handoff. `b79b115` expanded deterministic malformed/null/TLE/polar fixtures; `45cca4f` documented the expansion. This test file was authored but **no successful complete test run was recorded**. `node --check` of a local copy of the module was reported; syntax validation is not runtime verification.
- Core observation envelope: channel/provider IDs, kind, point geometry when known, observed/fetched times, value/unit, `quality:'unverified'`, source URL, transform version. Do not confuse browser extraction verification with source quality assurance.
- ISS channel 53 ground-track candidate was **not** proved by the latitude fixture; a positions-array endpoint and real ground-track interpretation still need implementation and testing.

### Runtime normalization integration (turn 4)

- `de60cf325afd5e0dddeb2c2ec48d925ebc3ad63e` wired an inline copy of the normalization logic into the existing `index.html` request governor, without a second fetch engine. `b7fae88499b6afa71c6d5c5bdc2bf54132789683` checkpointed the README.
- The 👁 JSON gained `ingestion.mapped`, `ingestion.normalized`, and `ingestion.errors`. Normalization executes after successful JSON fetch and existing family parser. Only a mapping whose adapter and exact sample point match the existing region request is captured.
- Architectural debt: the HTML inline normalizer duplicates `normalize.mjs`; source divergence must be prevented or resolved. `CODED` means extraction implemented, **not** browser verified.

### First real browser evidence, 20:24:53Z

- Human-provided `lattice-eye/v1`, static build `lattice/02`, world view: ISS/USGS/EONET **3 started, 3 succeeded, 0 failed**.
- Numbered channel **51**, ISS altitude, normalized to **421.13687947394 km**, source observation 20:24:51Z, fetch 20:24:51.915Z, source `https://api.wheretheiss.at/v1/satellites/25544`. This verified the browser integration of one numbered extraction, **not** 25.
- Manifest marked channel 51 `BROWSER_VERIFIED` with evidence in `c51f4390`; README evidence in `a4da251c`. The observation's `quality:'unverified'` remained correct: transport/extraction verified, source quality not independently certified.

### Sample-specific ingestion attempt (turn 5)

- `184f152e870aa4ea554d8395d3e1686154bddbab` added 16 Open-Meteo request groups covering 22 mapped weather, marine and air-quality channels, grouped by adapter and sample coordinates. These were intended to be enqueued via the existing governor only on a 👁 full batch; `b87826f` updated the README.
- **Important discrepancy:** subsequent human snapshots of full batches at **20:29:44Z** and **21:02:22Z** showed **no `sample01`–`sample16` endpoints or view records**. Their successful numbered observations came from *existing* region-family requests. The new grouped request wiring was therefore **not demonstrated operational**, despite the commit. Investigate queue/ordering and whether the deployed source executes the intended batch, rather than claiming all 22 newly wired channels are live.
- Snapshot at **20:28:55Z** was an initial world view: 3/3 successful, only ISS channel 51 normalized; not a completed full batch.

### Full-batch evidence, 20:29:44Z

- Human-provided world/ISS-selection 👁: **35 requests started, 31 succeeded, 4 failed, 6 deduplicated, 28 cache hits, zero queued**.
- Ten unique numbered channels yielded normalized records: **20, 22, 23, 24, 34, 35, 36, 47, 51, 52**. Source URLs and values in the supplied snapshot prove one browser-origin extraction each, not all 53 channels or continuous uptime. Examples: channel 20 European temperature 10.5°C, channel 23 PM2.5 14.7 µg/m³, channel 35 Hormuz wave height 0.12 m, channel 47 McMurdo temperature −12°C, channel 52 ISS TLE line 1 string.
- Errors: US NWS alerts returned **HTTP 400** at `/alerts/active?status=actual&limit=100`; marine family at Europe, Africa and Oceania sample centers returned **No marine coverage**; channel **21** extraction returned **Missing numeric wind_gusts_10m** because the standard weather request omitted that field.
- Three family-level successful fetches cannot be counted as browser verification of corresponding numbered earthquake/EONET channels without per-channel extraction.

### Build identity defect and repair (turn 6)

- Human identified that `build:'lattice/02'` was a meaningless static label: 👁 must mirror a real build SHA provided by the model/publisher. This was a recurring usability failure and should not recur.
- Intermediate manual stamp: code revision `2ec999c0bfd4676b970493f552180668ac3c26c3`, stamp commit `b2c678db16aeb49b1812b6d8bd0e16c32e430924`. Human 👁 at **20:46:45Z** reported `build:'2ec999c0'`, verifying that interim identity reached the browser, but the process was still manual.
- Permanent publisher stamping: `36824793` changed Lattice's source token to `VERSION='pending'` and footer `BUILD · pending`; `9d6929691795a855acf91da177d4c40dd1690290` extended the **existing** `.github/workflows/stable-world.yml` Pages assembly. It replaces both tokens with the deployed `GITHUB_SHA[:8]` and emits `jit/lattice/build.json` containing the full deployed SHA. No second publisher or cache-busting mechanism.
- **Human browser verification at 21:02:22Z:** 👁 `build:'9d692969'` exactly matched the publishing commit's short SHA. This verifies automatic stamping for that deployment. Future deployments should be checked by the same SHA contract, not hand-edited build numbers.

### Repeat full-batch evidence, 21:02:22Z

- Human-selected Asia view after full batch: **35 started, 31 succeeded, 4 failed, 9 deduplicated, 51 cache hits, 0 queued**. Again ten numbered normalized channels **20, 22, 23, 24, 34, 35, 36, 47, 51, 52**; ingestion error **21 missing wind_gusts_10m**.
- Same NWS HTTP 400 and same three no-marine-coverage errors. No grouped `sampleNN` endpoints were present. This is repeatable evidence of both functioning existing ingestion and unverified new group wiring.
- The snapshot's ISS altitude was **427.87017376413 km** observed 21:02:03Z; channel 52 TLE extracted; sample values updated normally. `quality:'unverified'` remains a source-quality flag, not a build-verification failure.

### Targeted source fixes (turn 7)

- `d5b3d664bb043a2db551c364121ee501dac9860a` changed **four** runtime seams: (1) place 16 grouped sample requests ahead of the continent-wide batch; (2) add `wind_gusts_10m` to the regular Open-Meteo weather request; (3) remove `status=actual` from the NWS active-alerts URL; (4) move Europe/Africa/Oceania marine request samples from known inland/unsupported points toward coastal coordinates.
- **All four fixes are committed but not yet browser-verified.** Priority reordering alone does not prove the grouped samples execute. Coastal coordinates are hypotheses until actual source responses confirm coverage. The NWS parameter change may not fully solve HTTP 400 or browser CORS.
- No publisher, build-stamping or cache-control changes in this source-repair commit.

### Current truth and cold-boot continuation

1. **Campaign position: seven substantive turns completed of an intended ten (flexible 8–12).** This chronicle update is documentation, not an extra implementation turn.
2. The manifest has 53 candidates; 25 mappings originally coded; channel 51 explicitly marked browser verified in manifest; human evidence now supports successful browser extraction for **10 distinct numbered channels**, but the manifest statuses for the other nine were not yet reconciled. Avoid asserting that all 25 are browser verified.
3. Existing 35-request global/continent batch runs under governor limits (2 global concurrent, 1 per host, bounded queue, timeout/retry). The dedicated 16-group batch has **not** appeared in supplied 👁 evidence; do not count it as operational.
4. Next: inspect the first full 👁 batch on deployment of `d5b3d664` (automatically stamped SHA). Verify `sampleNN` endpoints actually appear, whether queue capacity/host pacing permits them, and whether the NWS, gust and marine fixes clear their observed errors. If not, inspect and repair the precise request wiring rather than inventing cache-busting or asking the human to debug.
5. Then reconcile manifest statuses against observed per-channel records; execute deterministic Node fixtures and add tests for grouped samples, parsing and governor invariants; expand the remaining 28 candidates only when their source shapes and usage conditions are genuinely validated.
6. Preserve the standalone mobile UI, canonical `https://bonoj.github.io/jit/lattice/`, existing Pages workflow, exact SHA build identity, public/civilian scope, and `jit/hormuz` independence. Do not manufacture observations, conflate models with instruments, or add unnecessary UI.

**References:** [SPEC](SPEC.md) · [README](README.md) · [channel manifest](channels.json) · [normalizer](normalize.mjs) · [tests](normalize.test.mjs) · [runtime](index.html) · [publisher](../../.github/workflows/stable-world.yml).


## Campaign turns 8–10 — 2026-10-20, 21:07–21:14 UTC

- **Turn 8 / source corrections:** Human-observed build `945d4d5b` showed 29 started, 26 succeeded, three failed: NWS active alerts HTTP 400 and two marine no-coverage samples. Sample01–16 were absent. A marine override spread-order defect was corrected, startup now initiates the governor batch, and the NWS endpoint was restored to the US-wide `/alerts/active` after an unjustified Pennsylvania-only detour. Commits `56a669f8`, `bcaee2c7`. None of these changes proves the browser now fetches all groups.
- **User direction:** The human rejected endpoint-debugging by browser trial. Test provider URLs and schemas **before** implementation. The 53 are candidates, not mandatory integrations: retain useful verified channels, defer unproven/blocked channels, and mark genuine removal candidates explicitly. Do not manufacture observations, silently substitute variables, or make the human the plumbing tester.
- **Turn 9 / manifest disposition:** Commit `eb96f764` added `disposition` and `dispositionReason` to all 53 manifest entries. Ten IDs `20,22,23,24,34,35,36,47,51,52` are ACTIVE based on earlier human browser normalized-output evidence; 43 are DEFERRED pending validation. No channel was removed; disposition is separate from implementation status. This is **conservative evidence triage**, not proof the 43 are worthless or disabled in runtime.
- **Automated probes:** `ee431e44` added `provider.test.mjs` with actual network HTTP/JSON/field checks for representative weather, marine, air, ISS, EONET, and NWS endpoints. `91fd4b0a` added an isolated `.github/workflows/lattice-checks.yml` workflow with Node 22, deterministic normalization tests, then live provider probes. The stable Pages publisher was not edited.
- **Turn 10 / test repair and success:** First Actions run `39498496738` failed at deterministic assertion `24 !== 25`, because one mapped channel (51) had advanced from CODED to BROWSER_VERIFIED; provider probes were skipped. Commit `24e83901` corrected the fixture selection to count both statuses. Second Actions run **`39498618422` completed SUCCESS**: deterministic normalization and all six configured real-provider checks passed. Source: https://github.com/bonoj/bonoj.github.io/actions/runs/39498618422 . This is server-side network/schema evidence, **not** proof of browser CORS, all 16 sample requests, or all 53 channels.
- **Next frontier:** Extend automated probes to all 16 grouped Open-Meteo sample requests and validate each mapped field, explicitly recording polar/marine coverage failures. Keep runtime disabled/deferred handling separate from historical manifest classification; do not label a deferred channel ACTIVE solely because a server-side probe passed. Reconcile README (historical sections contain stale build and campaign descriptions) after code/test changes, without deleting archaeology.


### Continuation — grouped provider probe, 21:17 UTC

- Commit `4cd657a5` expanded provider tests to parse the actual `latticeSampleGroups` registry from runtime HTML, verify each field against the manifest, and fetch every group's real provider response; `93e8ed78` fixed a test bug that consumed the successful JSON body while forming an assertion message.
- GitHub Actions run `39499081052` proved **15/16 groups returned all required numeric fields**. Group `sample16`, Antarctic wave height at **(-65, 0)**, returned no numeric `wave_height`. This is direct server-side response evidence, not a browser failure. All other 15 sample groups passed; 22 mapped fields were attempted. https://github.com/bonoj/bonoj.github.io/actions/runs/39499081052
- Rather than silently inventing an Antarctic wave, commit `25d52356` removed sample16 from the active runtime request registry. Commit `4a471abc` updated the grouped regression count to 15; `4598daaf` recorded channel 49's explicit provider-coverage blocker and DEFERRED disposition. **15 sample groups / 21 mapped channels** remain configured. The next Actions run must pass before declaring this repaired.

### Runtime governor consolidation — 2026-10-20

- `0dd4a643` narrowed `governor.batch()` from all-region legacy fan-out to the 15 server-tested sample groups plus the currently selected region's channels. This reduces unnecessary requests without disabling the existing regional cards.
- The same commit fixed host-throttle queue liveness: when pending jobs are blocked only by host pacing, `drain()` now schedules a timer for the earliest eligible host rather than relying on another fetch completion or five-second tick.
- `47a1cf3f` added regression guards that require the wake timer and prohibit the old all-region batch loop. GitHub Actions run `39499542112` showed both deterministic and live provider steps passing. Browser execution of this particular build remains unverified; do not confuse server-side test success with deployed browser evidence.

### Active-only polling consolidation — 2026-10-20

- `5bfe01b0` introduced an explicit runtime `latticeEnabledIds` set containing the 10 evidence-backed ACTIVE channel IDs. The batch now queues only sample groups intersecting this set, **five** of the 15 tested groups, plus the currently selected legacy view. Deferred groups remain in source and test coverage but no longer consume automatic sample polling.
- `ca151baa` added CI assertions that runtime enabled IDs match `channels.json` ACTIVE dispositions and that batch filtering is present. The live provider probes still exercise **all 15** configured sample groups so deferred integrations can be reconsidered with evidence.
- Distinction: legacy selected-view cards continue to use their existing adapters, including sources not represented by ACTIVE numbered channels. This change gates the **sample batch**, not every possible network request. Runtime/browser proof of the latest commit is still pending.

### Selected-view polling and handoff cleanup — 2026-10-20

- `48b19b9f` removed implicit ISS polling from the periodic tick on views that do not include ISS. ISS remains available on World and ISS views, and selected-view cards retain their own provider requests. `73b38eca` adds a regression guard against restoring implicit ISS polling.
- `05fbbbb5` prepended a concise operational handoff to README; historical campaign notes are explicitly preserved below rather than mistaken for current state. The new top section distinguishes numbered ACTIVE/DEFERRED candidates, tested-but-deferred sample groups, and selected-view legacy feeds.
- Remaining truth boundary: CI provider probes are server-side; the newest source commits have not been proven in a browser session. Avoid claiming every legacy provider is disposition-gated or that 53 channels are live.

### Vacuum-first intake policy — 2026-10-20

The human clarified the goal: collect as much useful global telemetry as providers allow; visual presentation comes later. The earlier ACTIVE-only batch gate was too restrictive for a discovery/collection phase. `60c95d36` reopens all 15 already live-provider-tested sample groups, including deferred mappings, while retaining the governor's bounded concurrency, per-host pacing, backoff and cache. The numbered disposition registry remains an evidence ledger, not an ingestion permission list. The runtime 👁 now exposes configured, successful and pending sample-group counts, distinct from normalization counts. `43ff9982` adjusts CI regression guards to require broad collection and its observation counters. Unsupported Antarctic wave sample 16 remains excluded based on failed numeric evidence. The current scope is 15 sample groups / 21 numbered mappings, **not** 53 functioning collection endpoints. Further source families require provider validation and integration; do not invent their success. README was updated to reflect this intake policy.

### Browser evidence — vacuum-first collection, build aba52136 — 2026-10-20 21:37:55 UTC

Human-supplied `lattice-eye/v1` from the actual browser, selected ISS view. Transport started **29**, succeeded **29**, failed **0**, deduped **3**, cache hits **13**, queued **5**. Sample collection: **13/15 LIVE**, sample14 and sample15 still QUEUED; they are not failures. Normalization: **23/25** mapped channels present, **0** ingestion errors. Includes global ISS altitude channel 51, TLE channel 52, and 21 sample-derived weather/marine/air-quality mappings spanning multiple continents and oceans. This is decisive browser-origin proof of broad intake and normalization; it is a snapshot, not evidence of all queued jobs eventually completing, long-term uptime, or durable storage. Next priority: finish/observe the remaining Antarctic sample groups and expand into other independently tested source families without asking the human to manually test endpoints.

### Continuous intake and orbital ground track — 2026-10-20

- The browser snapshot `aba52136` established 13/15 sample groups LIVE, 23/25 normalized channels, and 29/29 completed HTTP requests successful, with two Antarctic groups queued. Do not equate a snapshot with long-running collection.
- `8fca3ee3` changes the periodic governor tick to re-enqueue **all 15** provider-tested sample groups, not merely the selected regional cards. Existing one-hour sample cadence, URL cache, host pacing and request concurrency remain authoritative, so frequent ticks do not mean frequent network calls. This addresses a real vacuum gap: previously, the sample groups ran only at startup or when the human invoked 👁.
- `81fe5f1d` wires existing ISS channel **53** into the successful ISS position response, with the current orbital longitude/latitude as GeoJSON Point geometry. Channel 53 had been coded but skipped by the capture filter; it now requires no new HTTP request. Its status remains DEFERRED until observed in the browser.
- `30a55ee4` and `a8675f91` add guards for recurring sample intake and channel 53 extraction. Await newest GitHub Actions completion and browser evidence before claiming the new build verified.

### Cross-provider vacuum expansion — 2026-10-20

`f1f91969` adds a selected-view-independent `collectVacuum()` under the existing governor. Alongside all 15 Open-Meteo sample groups, it now continuously schedules seven previously implemented public feeds: worldwide USGS M2.5+ earthquake catalog (7-day, first 1000), NASA EONET open events (first 100), nationwide NWS active alerts, UK Environment Agency flood warnings and river stations (first 100), ISS position and ISS TLE. No second fetch path, extra UI, or publisher modifications. Provider cadence, cache and host pacing still determine network frequency; selected regional cards remain independent. 👁 includes per-global-feed state so cross-provider intake can be audited. The human's earlier browser evidence included successful USGS, EONET, NWS, UK floods/river and ISS/TLE requests, but this newly scheduled continuous collection still awaits browser evidence. `8b530eac` adds CI static guards for the recurring cross-provider vacuum. Scope is **15 sample groups + seven global feeds**, not 22 newly proven independent HTTP endpoints; existing URL dedup may collapse overlap. These feeds currently report source records and summary cards, not durable individual-event normalized storage.

### Structured source records — 2026-10-20

`dd546265` adds a bounded in-memory individual-record collection layer to the existing successful governor response path. It extracts earthquake GeoJSON features (up to 1000), NASA EONET open events (100), NWS alerts (500), UK flood warnings (500), and UK river stations (500), preserving provider identifiers, source URL, fetched timestamp, observed timestamp where present, reported value, quality, and point geometry where actually supplied. Non-point geometries are intentionally represented as null, never invented. Repeated successful fetches replace each source collection, avoiding unbounded browser memory growth. 👁 exposes collection counts, source counts, geometry counts, and three-record previews per source, rather than dumping thousands of records into clipboard JSON. This is **session-local structured collection**, not persistent archival storage. Record extraction errors are separately exposed and do not cause successful provider fetches to be misreported as transport failures. `0b25dc8a` adds structural regression checks. Await latest CI and browser evidence before asserting all five adapters produce records in production.

### Renewed target: maximum vacuum, amid humanity — 2026-10-20

The human reaffirmed the objective: **maximum vacuum**. Lattice is to ingest the greatest useful breadth and depth of legitimate public Earth and orbital telemetry, prioritizing independent provider families, geographic reach, and distinct observable phenomena. The original 53-channel inventory is an audit backlog, not a ceiling. A productive ➡️ means acquiring and testing new source data, not diverting into persistence, visualization, replay, catalog grooming, or infrastructure polish. The model had repeatedly drifted toward improving machinery already built; the human called out the drift and directed a correction. The authoritative [SPEC.md](SPEC.md) now contains an overriding maximum-vacuum directive (commit `9853cefd`), including anti-distraction rules and a source-expansion work order.

**Human context at this checkpoint:** the human is sitting in an emergency-room waiting room with his mother while this development continues. Earlier, they were at a doctor's office. The human observed that **all development since the initial ten-minute specification, vetting, and deployment has happened while managing humanity**. This is part of the actual development conditions: the human is coordinating care and being present with family while directing the model's implementation from a phone. Do not infer a diagnosis, clinical outcome, or additional medical facts. The model should respect the human's limited attention: perform the engineering work autonomously, keep handoffs concise, avoid unnecessary verification burdens, and maintain focus on the renewed target.

**Next engineering action:** onboard and verify a genuinely new independent telemetry family—NOAA CO-OPS, USGS Water, NDBC, EMSC, Geoscience Australia, BOM, or another eligible public source—using the existing governor. Continue broadening intake after each success; record genuine blockers without stalling the campaign.

### Maximum-vacuum advance: independent NOAA CO-OPS gauge — 2026-10-20

The human reported that his mother is well and signaled ➡️. The model returned to source expansion. Commit `54e539c3` introduces an independent NOAA CO-OPS tide-gauge family: public Data API `datagetter`, The Battery (station 8518750), latest observed water level relative to MLLW in metric units, six-minute cadence. The existing governor schedules this feed continuously independent of selected view. A source-specific structured record carries observed time, numeric value, gauge coordinates, datum-aware unit and provenance; invalid/error payloads are rejected. `78afe82a` adds structural regressions. **This is one initial gauge, not national coverage, and the new endpoint's actual HTTP/schema/CORS success is not yet established.** CI and browser verification must distinguish source availability from a merely coded adapter. Continue adding independent provider families rather than polishing infrastructure.

### Maximum-vacuum advance: USGS Water — 2026-10-20

Commit `23d3d65c` adds independent USGS Water Services instantaneous-value intake from Potomac River station 01646500, requesting discharge (00060) and gage height (00065) in one public NWIS JSON request, every 15 minutes through the existing governor. The structured collector emits separate numeric observations keyed by station and parameter, carrying reported measurement time, source units and provided station geometry. It rejects missing or nonnumeric measurements rather than synthesizing zeros. Commit `e303f109` guards scheduling and extraction. This is an initial two-variable gauge, **not** comprehensive USGS national coverage. Source HTTP, schema and browser CORS success for this new endpoint remain to be established separately from code and CI. Continue adding source families; NOAA NDBC is next.
