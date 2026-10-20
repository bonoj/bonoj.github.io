# HORMUZ — Development Chronicle

## 20 October 2026 · From SIGINT concept to a browser-native maritime observatory

### Original human request — verbatim POC brief

> For now just deploy a jit hormuz that pulls in a bunch of different public telemetry from the region. Get shipping shit and vessel traffic, too, if it's available. Don't slam endpoints with requests. Once every 5 seconds should be safe as long as that supports a full day (realistically no user would leave it running, and it's tied to their ip anyways not our static site).

This is the original request, preserved **verbatim** as the benchmark for evaluating the first Hormuz proof of concept, including in a potential Anduril-facing demonstration. It specifies the desired result and operational restraint without prescribing a framework, backend, architecture, or detailed implementation plan. The model's delivered artifact can be evaluated against it; the request alone is not proof that every browser feed worked. The five-second suggestion was implemented as a due-check scheduler rather than five-second polling of every endpoint.

### Request

The human requested a JIT named **Hormuz**, deployed immediately, that ingests a broad set of public telemetry for the Strait of Hormuz, including commercial shipping and vessel traffic where available. The human explicitly ruled out using Supabase to store telemetry snapshots: **the static site should ingest directly from source endpoints**. A five-second cadence was suggested as an upper-frequency check, with the proviso that it not overwhelm providers, including during a hypothetical full day of foreground operation.

This was an implementation authorization for the first Hormuz JIT, not an instruction to build the entire Alembic research program.

### Concept inherited from Alembic SIGINT

Source of design intent: [Hermeticon / codex / alembic / sigint.md](https://github.com/bonoj/Hermeticon/blob/main/codex/alembic/sigint.md).

**Alembic** is an incubator for combining heterogeneous observations into meaningful, inspectable signals. Its first geography is the **Strait of Hormuz**: Iranian coastline to the north, Musandam and Oman to the south, nearby islands and commercial shipping corridors. Its proposed expansion covers the Persian Gulf, Gulf of Oman, Gulf of Aden, and Red Sea.

The core conceptual pipeline is:

> **World geography → source observations → transforms / zip → derived metrics → visual consequence → inspectable report.**

In this vocabulary, **zip** means compositing or reducing data streams into useful metrics, *not* ZIP-file compression. A metric should be traceable back to its source streams, timestamps, transformations, spatial and temporal resolution, missingness, and uncertainty. Distinct metrics may disagree; the design rejects a single unexplained regional score.

The working note distinguishes four epistemic layers:

- **Observed:** public, time-stamped environmental and civilian maritime observations, with source and freshness.
- **Historical:** recorded datasets and published reports used for comparison or replay.
- **Synthetic:** explicitly identified simulated vessels, hypothetical conditions, model projections and what-if scenarios, never passed off as observations.
- **Derived:** transparent composites, for example vessel-flow deviations from baseline, wind/wave/traffic conditions, port-throughput proxies, or correlations between reported events and changes in commercial traffic. These are candidate analyses, not established conclusions.

The intended experience is a legible, phone-first maritime world with recognizable geography, expressive water, tappable phenomena and places, compact report cards, and a clock capable of live, historical-replay and hypothetical modes. Weather and marine data may be live or near-real-time; shipping data may be delayed, licensed, sparse or historical. Synthetic vessel flow may demonstrate movement before actual feeds exist. The note suggests reuse of existing Hermeticon/Abyss runtime and material BB grammar without demanding a new infrastructure stack.

The collection contract requires source URLs, observation and ingestion times, coordinate systems, resolution, assumptions, transformations, and uncertainty. Observed, historical, synthetic and derived information must remain visibly distinct. The scope is **civilian open-source maritime synthesis**, not reconstruction of sensitive collection coverage or precise tracking of military assets.

Open research questions remain: which two or three zipped metrics are most illuminating, what cadence and resolution actually matter, how material streams could depict age/flow/uncertainty, and which existing Athanor/Arcana/Codex machinery can be reused. No Alembic canopy icon has been authorized or created.

### Executable delivered

**Live target:** https://bonoj.github.io/jit/hormuz/  
**Source:** [index.html](index.html)  
**Operational handoff:** [README.md](README.md)

The model created a **single-file HTML/CSS/JavaScript JIT** under `bonoj/bonoj.github.io/jit/hormuz/`. It uses direct browser `fetch` calls to public providers. There is **no Supabase, proxy server, API credential, telemetry database or snapshot service** in this architecture.

The first instrument integrates five independently scheduled source families:

| Provider | Requested signal | Minimum request interval |
|---|---|---|
| Open-Meteo forecast | Wind speed/direction and atmospheric conditions | 15 minutes |
| Open-Meteo marine | Wave height, sea-surface temperature, ocean-current speed/direction | 30 minutes |
| hormuz.now | Aggregate AIS-visible 24-hour crossings, tanker crossings, fleet size, waiting vessels and status | 60 seconds |
| USGS earthquake catalog | Regional earthquakes of magnitude 2.5+ over the previous seven days | 30 minutes |
| Eagle Intelligence | Published maritime-risk status and report timestamp | 5 minutes |

**Polling behavior:** a five-second scheduler checks whether each source is due; it does not issue requests every five seconds. The tab stops polling when hidden, resumes due requests on return, uses 12-second fetch timeouts and exponential failure backoff (at least 60 seconds). A refresh control requests only sources whose intervals have elapsed. Collection status is visible per source; missing responses remain missing instead of being replaced with fabricated observations.

**Presentation:** a dark, mobile-first instrument with a schematic Strait of Hormuz canvas, illustrative Iranian/Omani coastlines and islands, animated **synthetic** vessel traffic, a model-driven wind arrow and wave animation, four environmental readouts, four AIS-aggregate readouts, earthquake count, risk publication status, source links, a UTC clock, and collection-health indicators. The geography is illustrative and not for navigation; animated boats are not individual observed AIS tracks. Forecast and marine-model estimates are labeled as model-derived rather than direct instrument measurements. AIS absence is not evidence that no vessel exists.

The initial JIT implements the **collection and presentation foundation** of Alembic. It does **not** yet implement full metric provenance/drill-down, historical replay, genuine AIS vessel tracks, calibrated geography, a general zip/derived-metric engine, or physically faithful coupled simulation. Those are future possibilities, not shipped capabilities.

### Measured turnaround — two minutes

The human reported the wall-clock interval for the initial request-to-artifact turnaround as **11:56–11:58 on 20 October 2026: two minutes**. This is a human-observed timing of the initial executable delivery, not a separately instrumented build-duration measurement. It does **not** include later chronicle writing or independent browser/runtime verification.

The notable result: a conversational request became a committed, inspectable single-file maritime observatory—with five public telemetry source integrations, per-provider polling, and a mobile visualization—within that reported two-minute window. The architecture required no new backend or deployment pipeline.

### Publication and evidence

- Executable created on the site repository's `master` branch: **`7ad970b1`**.
- README added with polling intervals, attribution, limitations and recovery notes: **`af1f620d`**.
- The executable was subsequently fetched from GitHub and its five source URL anchors and five-second scheduler were confirmed present.
- **Source committed and read back:** verified. **GitHub Pages publication, CORS compatibility, response schemas, and live browser retrieval:** not yet independently verified at this chronicle entry. The deployment URL is the intended published target, not proof of successful runtime data ingestion.

### Significance and next observation

This first build converted the Alembic note into an inspectable executable in a single implementation turn, without adding a backend or asking the human to shuttle data. Its engineering choice was to **poll each public source at its own useful cadence**, rather than interpreting a five-second user-interface tick as permission to fetch every source continuously.

Next: inspect the JIT running on a phone, observe which providers actually respond, validate field mappings and browser CORS, and adjust only evidenced failures. Then consider source provenance and the first genuinely **zipped** metric. Preserve the distinction between a fast executable handoff and a verified operational data product.
