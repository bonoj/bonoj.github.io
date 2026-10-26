# Hermeticon · Observatory

## CURRENT COLD BOOT — 2026-10-26 · STACK/12 · SPEC REORIENTATION

**Mission:** broad, composable, evidence-driven **☀️ Sun → 🛰️ L1 → 🌐 GEO → 🌍 Earth** scientific observation network, ultimately extending to heliospheric/other spacecraft and on-demand planetary sensors. The **Sun–Earth observational cone is geometric selection, not a continuously measured material tube or proof of causality**. **Priority: acquisition, spatial identity, geometry and scientific validation — NOT UI polish.** Read [SPEC.md](SPEC.md) as governing plan, particularly the current mission gate, source waves, cone geometry, PSP Earth-Connection Filter and lazy Planetary Sensor Registry. The older L1-only instructions below are retained history, not the current execution frontier.

**Working baseline:** [🔭 Stack/12 live instrument](https://bonoj.github.io/jit/observatory/stack/?v=bacdcc9d0a69748d34e81d734b31c4af70a346d5) · [runtime](stack/index.html) · [Chronicle](CHRONICLE.md) §§33–36 · [SPEC](SPEC.md). Preserve separate [solar](solar/), [L1](l1/), [GEO](geo/) instruments and the untouched root Lattice clone. The query-string commit identifies the source revision; it is not independent proof of current Pages deployment.

**Browser evidence:** user 👁 `hermeticon-stack-stack-12-2026-10-26T06-40-49-899Z.json`, build `stack/12`, captured 06:40:49.899 UTC: four NOAA endpoints HTTP 200, 4/4 successful governed fetches, zero failed, **310/360** four-way timestamp-coincident minute slots. Each lane passes `observed+missing=360` and `leading+internal+trailing=missing`. Counts (observed / leading / internal / trailing): ☀️ 356/1/0/3; 🛰️ 321/1/33/5; 🌐 342/1/0/17; 🌍 355/1/0/4. **Data/export browser-verified; visual strip layout not screenshot-verified.** Gaps and trailing latency are *not* diagnosed outages. These minute bins are not independent physical samples.

**Stack/12 scope:** four six-hour traces, UTC freshness, NOAA GOES primary solar X-ray 0.1–0.8 nm **measured at GEO**, active L1 GSM Bz, GOES GEO local magnetic total, and **Boulder local derived K index** (not planetary Kp or a direct magnetic vector). 👁 downloads and ⧉ copies `hermeticon-stack-eye/v1` with raw provenance, coverage, alignment, missingness, and governor counters. Lattice-style local governor: two concurrent globally, one per host, pacing, dedup/cache, timeout/backoff, bounded queue/payload. No inferred CME arrival, propagation delay, causal association, or inter-frame equivalence. Source quality and spacecraft geometry remain incomplete.

### 🧭 Spec-to-runtime gap and next frontier

**Implemented in Stack:** four-source live acquisition, bounded transport, basic provenance, UTC alignment, explicit missingness and truthful uncertainty warnings. **Partial:** quality flags, source identity, cadence interpretation, source lifecycle. **Not integrated:** L1 plasma/vector breadth, GOES primary+secondary energetic particles/EUV and spacecraft mapping, ephemerides and actual sunward/sun-visible/eclipse geometry, full normalized registry, physically grounded lag comparisons, replay/holdout testing and event dossiers. PSP archive/Earth-Connection Filter and planetary sensor adapters are specified but not implemented as Stack capabilities; do not claim otherwise. Other separate prototypes exist; this is a Stack-specific audit.

**Resume in this order (substantial bounded steps, browser 👁 verification):**
1. **Source registry and provenance**: inspect existing L1/GOES instruments and actual raw schemas; define normalized record and lifecycle `CANDIDATE → PROBED → BROWSER_VERIFIED → INGESTED → CORRELATABLE`, with spacecraft/station, instrument, frame, observed/fetched UTC, units, QC, source kind, active selection, cadence, latency and error. Avoid silently mixing spacecraft or interpreting model outputs as measurements.
2. **Expand acquisition**: reuse existing NOAA RTSW plasma+magnetic and GOES primary/secondary feeds; browser-verify new actual measurements, source attribution and quality before promotion. Protect working channels.
3. **Geometry**: authoritative ephemerides, Sun direction, spacecraft positions, separate `sunward` / `sun-visible` / `eclipsed`, moving terrestrial terminator; represent propagation as estimated and uncertain, never as observed continuous flow.
4. **Investigate/test**: lag-aware comparison, quality-gated detection, 2024 storm plus quiet controls and holdouts using frozen tests; then machine-readable event dossiers. Only later expand PSP Earth-Connection Filter and query-driven planetary adapters as supported by source validation. No arbitrary channel ceiling and no continuous global polling.

**Explicit stop:** Do **not** spend the next turn polishing availability strips or sparkline alignment. Stack/12 is a preserved reference, not the destination. The user requested reorientation and spec comparison; **no new implementation was made during that audit**. On ➡️ advance registry/acquisition work rather than UI. Do not jump directly to a detector ahead of quality, identity and geometry. Keep the approved concise emoji report, verification boundary and next frontier.

**Cold boot read order:** this section → [SPEC current mission gate and execution sequence](SPEC.md) → [Chronicle §§33–36](CHRONICLE.md) → [Stack runtime](stack/index.html) → [L1 runtime](l1/index.html) → [Lattice contract](../lattice/README.md) → Sanctum/Gate contracts before writes.

---

**Live L1 instrument:** https://bonoj.github.io/jit/observatory/l1/  
**Runtime:** [L1 source](l1/index.html) · **Approved layout study:** [study/](study/) · **Legacy Observatory root:** [index.html](index.html)

## Legacy L1-era cold-start contract (superseded by CURRENT section)

The working mission is **Sun–Earth L1 spacecraft telemetry**, not the original three speculative terrestrial experiments. The public presentation is restrained, white, Swiss-typographic, and unexplained. Real readings only; no invented signals, ownership claims, or institutional narrative. Keep the single **👁** control as the sole handoff: it copies a JSON report of acquisition status, raw evidence, timestamps, spacecraft, channel validity, and errors. One viewport, mobile-first, no page scrolling.

**Working browser evidence (2026-10-24 00:16 UTC):** [l1/](l1/) fetched two NOAA RTSW JSON streams over HTTPS with HTTP 200, 162/169 ms latency, 3,418 plasma and 3,522 magnetic records, no fetch failures. Source spacecraft observed: **SOLAR1, ACE, IMAP**; active source **SOLAR1**. Nine displayed channels had numerical observations. Most recent active measurements were 00:11 UTC (~5 minutes old). An older proton-temperature reading exposed a timestamp ordering bug; fix committed `8bba56e6`, **not yet browser reverified**. Check freshness per field, not just per stream.

## Current acquisition

| Feed | Endpoint | Display |
| --- | --- | --- |
| Plasma | `https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json` | proton speed, density, temperature, GSE transverse velocity Y/Z |
| Magnetic | `https://services.swpc.noaa.gov/json/rtsw/rtsw_mag_1m.json` | field magnitude Bt, GSM Bx/By/Bz |

The provider supplies multiple spacecraft in each payload. Preserve **source**, **active** flag, observed UTC, quality flags, raw and normalized values, missing-value sentinels, sample counts, HTTP status and age. A stream can succeed while one channel is stale. Prefer quality-valid observations from the active spacecraft; make fallbacks explicit rather than silently mixing spacecraft. Sort by timestamp, not payload order. No simulated traces: derive sparklines from genuine timestamped history.

**Next work:** reverify the temperature correction; expose additional actual L1 measurements already present in the feeds (GSE/GSM vectors, proton velocity X, alpha channels when populated, angular components, quality and sample metadata); expand to genuinely distinct spacecraft payloads if accessible. Do not spend turns on generic earthquake feeds or unverified catalog counts. Do not replace existing working feeds while expanding.

## Lattice inheritance — retain this plumbing contract

The Observatory root [index.html](index.html) remains a **literal functional clone** of [JIT Lattice](../lattice/). Its [README](../lattice/README.md), [SPEC](../lattice/SPEC.md), [runtime](../lattice/index.html), and [channels.json](../lattice/channels.json) are the reference implementation and historical inventory. **Do not discard or reinvent its proven transport.** In particular:

- One bounded request governor: max **2 concurrent requests globally**, **1 per host**, queue limits, host pacing, timeout, backoff/retries, deduplication and cache.
- Shared observation/👁 diagnostics, honest loading/stale/error states, source provenance, browser-CORS validation, bounded payloads and no fabricated measurements.
- Existing GitHub Pages / GitHub Actions publisher, SHA-stamped build identity, canonical URL and cache-refresh conventions; do not invent a second deployment/cache-busting system.
- Preserve root Lattice clone and its `channels.json` until an intentional migration. The current `l1/index.html` is a **separate lightweight acquisition wall** with its own fetch loop, not yet migrated onto Lattice's governor. Its existence does **not** mean Lattice's transport has been integrated.

When extending L1 substantially, read the Lattice contract and consolidate fetches through its governor rather than building more ad hoc transport layers. Avoid modifying Lattice upstream or other JITs.

## Other retained work

- [telemetry/](telemetry/) — earlier browser acquisition of ISS orbital vector, Kyoto auroral electrojet, and seismic events. ISS position and seismic transport returned real readings; Kyoto numerical acceptance was unresolved. **Not the L1 mission.**
- [acquisition/](acquisition/) — endpoint/CORS probes; includes recorded failed or incomplete NMDB, INTERMAGNET, Kyoto and OOI experiments.
- [study/](study/) — approved white, one-viewport design reference with **HERMETICON**, **Zürich, Switzerland**, uncaptioned **CHF 250’000**, discreet **Correspondence**, and small instrument traces. It was later modified to request Open-Meteo feeds; those feeds are **not** the desired mission data. Preserve layout intent, not those sources.
- [channels.json](channels.json) — inherited Lattice candidate inventory, not proof of Observatory ingestion.

## Development conventions

On `➡️`, advance one substantial, testable instrumentation step. Fetch and validate actual browser-visible numerical observations; deploy; use 👁 evidence to diagnose. Never call a successful commit a verified live deployment. The public README is **technical continuity only**; personal/interview positioning belongs elsewhere. Chronicle and SPEC are active again for the live four-lane mission; preserve browser evidence and exact verification boundaries in them.
