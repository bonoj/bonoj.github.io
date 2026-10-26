# Hermeticon · Observatory

## CURRENT COLD BOOT — 2026-10-26 · STACK/18 · GOES CHANNEL ACQUISITION VERIFIED

**Mission:** evidence-constrained, live ☀️ Sun → 🛰️ L1 → 🌐 GEO → 🌍 Earth scientific acquisition, with later heliospheric geometry, 2024-storm replay, and query-driven planetary instruments. **Read [SPEC.md](SPEC.md) as governing requirements.** Sun–Earth cone is a *geometric/model selection*, not a directly observed continuous flow or proof of causality. **Prioritize source quality, identity, geometry, and science over UI polish.**

**Current executable:** [Stack/18](https://bonoj.github.io/jit/observatory/stack/?v=a93f7759f1a84a0b3da3f0f37b2a05c6e842bcc2) · [source](stack/index.html) · [Chronicle §§41–46](CHRONICLE.md) · [SPEC](SPEC.md). Stack/18 code commit `a93f7759f1a84a0b3da3f0f37b2a05c6e842bcc2`. Browser 👁 `hermeticon-stack-stack-18-2026-10-26T07-05-05-475Z.json` captured **07:05:05.475 UTC** confirms **7/7 NOAA requests succeeded, 0 failed**. Source SHA in a query string is a cache-busting hint, not proof of current Pages content.

**Browser-verified acquisition:**
- Four visible, six-hour UTC lanes: GOES-18 solar X-ray 0.1–0.8 nm **measured at GEO**; active NOAA L1 magnetic GSM Bz; GOES local GEO magnetic total (currently **STALE**, despite HTTP 200); Boulder **station-derived K**, not global Kp. Four-way minute coincidence is timestamp coincidence, **not** independent physical co-observation or causal coupling.
- Fifth NOAA source: active SOLAR1 L1 plasma speed, density, temperature, Vy/Vz GSE. Stack/16 requires `overall_quality===0` for eligible rows; browser 👁 verified five fields with 996 eligible each and no active quality rejections at that capture.
- Sixth and seventh NOAA sources: GOES-18 **integral protons**, 8 energy-threshold channels, **568/568** accepted rows (71/channel), latest **06:55 UTC**; GOES-19 **EUV**, 8 channel labels, **440/2864** accepted rows (55/channel), latest accepted **01:59 UTC**. **303/358 EUV rows per channel were rejected by the current strict flags predicate**. This is an unresolved interpretation/QC question, not an asserted instrument outage. GOES `primary` does **not** mean the same satellite for all products.
- 👁 downloads `hermeticon-stack-eye/v1` including raw source provenance, channel identity, acceptance counts, alignment, staleness, and transport; ⧉ retains clipboard copy. GOES channels are `ACQUIRED_UNITS_UNVERIFIED`: raw flux/value units are deliberately **not** inferred. The four visible lanes were previously visually accepted after Stack/14; Stack/18 browser export verifies acquisition, not a fresh screenshot of rendering.

**Next ➡️ — instrument EUV rejection reasons, not appearance.** Inspect raw `flags` schema and separately count eclipse, lunar transit, geocorona, missing/malformed flags, invalid numeric values, and timestamp rejection. The current predicate demands all three flag values be explicitly `false`, causing 303/358 per-channel exclusions. Do not weaken the predicate or interpret excluded rows as bad data until reasons are known. Preserve spacecraft attribution and distinguish source freshness from freshness of accepted observations. After evidence, validate units/quality rules with NOAA documentation and expand GOES secondary or ephemeris/geometry according to SPEC.

**Scientific boundaries:** no guessed units, no conflation of GOES-18/19, no plasma propagation/arrival inference, no direct equivalence of L1 GSM Bz with GEO local total field, no K versus Kp substitution, no manufactured causal event detector. Source transport governor stays max two concurrent globally, one per host, pacing, bounded payload, timeout/backoff/cache. Do not mutate pristine [Observatory root](index.html), upstream [Lattice](../lattice/), or separate [L1](l1/), [solar](solar/), [GEO](geo/) instruments.

**Cold boot order:** this header → [SPEC current mission gate](SPEC.md) → [Chronicle §§41–46](CHRONICLE.md) → [Stack runtime](stack/index.html) → [Lattice contract](../lattice/README.md) → Sanctum/Gate contracts before writes. On ➡️ implement one bounded scientific advance, commit, provide SHA-busted URL, and request 👁; only browser 👁 confirms execution.

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
