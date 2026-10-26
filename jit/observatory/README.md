# Hermeticon · Observatory

## CURRENT COLD BOOT — 2026-10-26 · STACK/07

**Primary mission:** live, near-real-time **Sun → L1 → GEO → Earth observational stack**; do not revert to the older L1-only mission described below. Canonical instrument: https://bonoj.github.io/jit/observatory/stack/?v=0490619b . Runtime: [stack/index.html](stack/index.html), current committed build **stack/07**, commit `0490619b0b98312467b18733f9c2a8e706b6e0ec`. GitHub Pages browser verification of **stack/07 is pending**. Preserve [solar/](solar/), [l1/](l1/), [geo/](geo/) and untouched [root Lattice clone](index.html).

**Browser evidence:** user-supplied 👁 JSON established all four NOAA endpoints HTTP 200 and RECENT_DATA at **stack/04**, captured 2026-10-26 06:02 UTC (Chronicle §25). User uploaded a downloaded **stack/06** 👁 JSON captured 2026-10-26 06:09:36 UTC; it confirms download transport and genuine six-hour source traces and coverage diagnostics, but is **not verification of stack/07**. Download is now the primary 👁 action; **⧉** separately copies identical JSON to clipboard. Report schema `hermeticon-stack-eye/v1`. No modeled cone or inferred causal propagation.

**Four active source lanes:** solar GOES primary 0.1–0.8 nm X-ray flux (solar-origin photons measured at GEO); L1 NOAA RTSW active quality-valid GSM Bz (upstream magnetic point measurement); GEO GOES primary magnetometer local total field; Earth NOAA Boulder local K index (station-derived dimensionless index, **not Kp**, not an independent one-minute vector observation). Each lane shows latest sample, UTC/age/status and six-hour sparkline. 👁 includes raw latest record, source provenance, six-hour traces and coverage/gap/cadence summaries. Timezone-less NOAA timestamps must be interpreted as **UTC**, never browser local time. Source-specific payload caps: L1 2.5 MB, solar/GEO 800 KB, Boulder 250 KB. No global shared request governor in stack yet; current bounded staged fetches are **not** the Lattice governor.

**Stack build progression:** 01 three lanes; 02 L1 payload bound fix; 03 UTC timestamp fix (browser verified); 04 Boulder Earth feed (browser verified); 05 six-hour traces/coverage; 06 👁 download + ⧉ clipboard (download verified); 07 scope coverage diagnostics to displayed six-hour window (**browser verification pending**). See [CHRONICLE.md](CHRONICLE.md) §§22–26 and [SPEC.md](SPEC.md) for science and next priorities.

**Next executable turn:** obtain fresh stack/07 👁 and validate four HTTP statuses, recent timestamps, coverage-window statistics, gaps, trace points and download/copy controls; then consolidate stack acquisition onto the **existing Lattice governor** (max 2 global/1 host, pacing, retries, dedup, caching) without disrupting sources. Only after trustworthy temporal alignment, investigate physical travel-time hypotheses with uncertainty and negative controls. On ➡️ implement a concrete bounded step; on browser evidence inspect it; on Red investigate. Commit ≠ browser verification.

**Reading order for cold boot:** this CURRENT section → [CHRONICLE.md](CHRONICLE.md) last chapters → [SPEC.md](SPEC.md) mission gate → [stack/index.html](stack/index.html) → [../lattice/README.md](../lattice/README.md) and transport source. The legacy README sections below are historical and must not override this status.

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
