# Hermeticon · Observatory

## CURRENT COLD BOOT — 2026-10-26 · STACK/09

**Mission:** live near-real-time **☀️ Sun → 🛰️ L1 → 🌐 GEO → 🌍 Earth** observational stack. The older L1-only mission below is historical. [Current instrument](https://bonoj.github.io/jit/observatory/stack/?v=5bc4cb71c91904c687acc1f4e002207cf4ca0bfd) · [runtime](stack/index.html) · [Chronicle](CHRONICLE.md) §§22–27 · [SPEC](SPEC.md). Preserve the standalone solar, L1 and GEO instruments and untouched root Lattice clone.

**Verification boundary:** **stack/08 browser-evidenced** by downloaded user 👁 `hermeticon-stack-stack-08-2026-10-26T06-27-01-474Z.json`, captured 06:27 UTC. Four NOAA endpoints HTTP 200 and RECENT_DATA, no acquisition errors, four cache hits in transport snapshot. Browser download works. This is ordinary successful acquisition, not a governor stress test. **stack/09 committed** `5bc4cb71c91904c687acc1f4e002207cf4ca0bfd`, changing the stale footer STACK/07 and JavaScript build label to STACK/09; **browser verification pending**. Commit or query string is not proof of Pages deployment.

### 🔭 Approved emoji observation handoff

| Instrument | Latest from stack/08 👁 | Six-hour minute-slot coverage |
| --- | --- | --- |
| ☀️ Solar | GOES-18 0.1–0.8 nm X-ray flux 2.945 × 10⁻⁷ W/m² | 356/360 |
| 🛰️ L1 | Active GSM Bz +1.45 nT | 321/360 |
| 🌐 GEO | GOES local total field 82.67 nT | 356/360 |
| 🌍 Earth | Boulder local K index 0.20 (**not planetary Kp**) | 355/360 |

**User-approved presentation convention:** concise emoji status, grounded instrument table, relevant acquisition counters, explicit verification status, and **next frontier**. Keep measured ≠ inferred ≠ unknown, source provenance, timestamps, frames, quality and uncertainty intact. Solar-origin X-rays are observed at GEO; L1 is a point measurement; GEO measures local field; Boulder K is a station-derived index, not an independent one-minute magnetic vector. Do not assert CME cone geometry, fixed transit time or causality from these four lanes.

**Runtime and export:** one viewport, four six-hour sparklines, latest sample UTC/age/status. 👁 downloads a timestamped full JSON `hermeticon-stack-eye/v1`; ⧉ copies the same report. Source registry contains latest raw record, traces, window-scoped coverage/cadence/gap statistics and acquisition errors. Transport snapshot exposes governor activity/cache statistics. Timezone-less NOAA source timestamps are interpreted as UTC. Stack/08 integrated Lattice-style shared transport (2 global concurrent, 1 per host, pacing, timeouts, dedup, cache, backoff and bounded payloads); it is a local adaptation, not a literal imported module.

**Next executable frontier:** browser-check stack/09 identity with 👁; then implement inspectable **timestamp alignment, missingness and uncertainty** across the four lanes without treating Boulder K as a one-minute independent physical sample. Test governor behavior across refresh and failure cases. On ➡️ advance a substantial bounded step and deploy; on 👁 inspect actual browser evidence. Read order: this section → Chronicle last chapters → SPEC mission gate → stack runtime → Lattice README/transport → Gate contract.

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
