# Lattice — Earth + Orbit

**Cold-boot handoff and authoritative implemented-state README.** Read this first. Live target: **https://bonoj.github.io/jit/lattice/**. Source: [index.html](index.html). Latest observed source change: `2bdee2286bbca7cb086aa8cb970be17166796d1e` (2026-10-20). Browser-observed `lattice/02`; see evidence below.

## What this is

A mobile-first, single-page, browser-only, explorable Earth and ISS public-signal observatory. The *world* is the interface, not 50 disconnected dashboards. It is an initial executable slice of the [worldwide 53-channel candidate specification](SPEC.md), **not a 53-channel implementation**, an operational command platform, or a verified replacement for any existing product.

The app lives in one standalone HTML file with inline CSS/JavaScript and no backend. It does **not** use Supabase. It leaves the [Hormuz JIT](../hormuz/) untouched.

## Implemented state — 2026-10-20

- **Runtime:** one standalone mobile-first HTML/CSS/Canvas/JS page with nine selectable views (World, seven continents, ISS), schematic orthographic globe, source cards, UTC clock, ↻ and 👁. Coastlines are illustrative, not accurate geodata; canvas is not draggable.
- **Ten coded adapter families:** Open-Meteo weather, marine and air quality; USGS earthquakes; NASA EONET natural events; Where the ISS At current position and ISS TLE; US NWS active alerts; UK Environment Agency flood warnings and river-level stations. These are coded adapters, **not ten browser-verified feeds**. Regional sampling is sparse, marine samples can be inland, and EONET remains global. [SPEC.md](SPEC.md) catalogs 53 candidates, not 53 active feeds.
- **Universal transport governor:** one fetch path, URL deduplication, two concurrent requests globally, one per host, queue cap, 12-second timeout, bounded body, Retry-After handling on 429/503, failure backoff, last-good cache, hidden/offline suspension and recovery. Five-second due-check, not five-second polling. `governor.batch()` queues configured channels across all regions; `snapshot()` reports request statistics, endpoint states and views. Batch may take time and does not certify endpoint success.
- **👁 clipboard-only:** one tap copies the current `lattice-eye/v1` snapshot synchronously, **then** starts the background batch; a later tap copies accumulated results. No JSON tray or 45-second wait. The single `EYE_ENABLED` switch gates the instrument. No backend, Supabase, or persistent telemetry collection.
- **Build label:** `lattice/02` in footer and 👁, manually maintained; **not** a source SHA or automatic cache buster. Canonical URL is unchanged. Do not invent fingerprinting, query-string cache busting, or publisher changes. Follow the existing JIT Chaos publication contract and protected-root invariant before any shared workflow change.

## Evidence and handoff checkpoint

- Latest source change for 👁: commit `2bdee2286bbca7cb086aa8cb970be17166796d1e` (synchronous copy before nonblocking batch). GitHub readback verified; JS syntax passed; single fetch call site confirmed.
- **Human-observed browser runtime:** `lattice/02`, UTC `2026-10-20T19:26:04.927Z`. Clipboard successfully returned JSON; World ISS, USGS and EONET were LIVE, three requests succeeded, zero failures, zero queued/active. This confirms the observed browser's clipboard and three World adapters, **not** the ten-family cross-region batch.
- Batch behavior is the immediate unfinished verification: 👁 first captures current state then queues the batch. Allow requests to finish and tap 👁 again; examine `batch.endpoints`, `batch.views`, failures and CORS/schema errors. Do not infer cross-region success from the first three-endpoint report.
- **Publication:** Chaos README and ASTRA_CONJOINER describe the shared stable-root Pages workflow and protected-root rules. The workflow configuration/run history was not accessible during the latest inspection. No evidence yet justifies modifying the shared publisher; no new cache scheme has been authorized. A GitHub commit, Pages deployment and browser-executing build are distinct evidence levels.

## Data flow

`Region selection → channels → governor enqueue/dedup/host pacing → provider fetch/parse → records → cards/globe → 👁 snapshot`. Batch requests use the same governor, not a separate fetch path. The normalized WorldSpec architecture in [VET.md](VET.md) remains future work.

## Next actions — cold boot

1. **Verify batch:** inspect the next browser 👁 JSON after background collection; classify all ten adapter families as PASS/ERROR/BLOCKED/NOT REQUESTED. Fix actual CORS/schema errors rather than expanding the candidate catalog blindly.
2. **Preserve publication:** canonical https://bonoj.github.io/jit/lattice/ ; inspect existing shared Pages workflow only if a real publication failure occurs. Do not change protected root or unrelated JITs. Build label `lattice/02` is manual; maintain consistency between footer and 👁 until the human requests another scheme.
3. **Improve coverage and fidelity:** accurate attributed coastlines, offshore marine sample points, observation timestamps and provenance, normalized contracts, deterministic parser/transport tests, and eventual reusable WorldSpecs. Keep the world central, mobile-first, and API-friendly.
4. **Cold boot reading order:** this README → [index.html](index.html) → [CHRONICLE.md](CHRONICLE.md) for historical decisions → [VET.md](VET.md) and [SPEC.md](SPEC.md) for planned architecture. For publishing, inspect [Chaos README](../chaos/README.md) and [ASTRA_CONJOINER](../chaos/ASTRA_CONJOINER.md); for GitHub write recovery consult [Sanctum Contract](https://github.com/bonoj/Sanctum/blob/main/CONTRACT.md) and [Gate](https://github.com/bonoj/Gate/blob/main/README.md).
5. Make minimal changes only in `jit/lattice/`; test, commit, read back, and distinguish source/deployment/browser evidence. Keep implementation state in README and development history in Chronicle.

## Invariants

**Public civilian and environmental data only.** No live military tracking. No fake AIS, no synthetic values labeled observed. Preserve data-source attribution, uncertainty and age. No secrets in browser source. No Supabase for raw telemetry. No backend required. No blanket five-second network polling. Keep mobile-first single-page presentation and clear operational states. Keep the world itself central to the UX. Maintain distinct labels for **specified, coded, committed, published, browser-verified**.

## References

- [SPEC.md](SPEC.md) — proposed worldwide inventory and architecture
- [VET.md](VET.md) — provider audit, implementation seams and acceptance plan
- [CHRONICLE.md](CHRONICLE.md) — verbatim human–model turn archive and build chronology
- [Hormuz JIT](../hormuz/) — original regional instrument, independent of Lattice
