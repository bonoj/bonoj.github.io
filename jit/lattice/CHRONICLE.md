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
