# Lattice — operational handoff (2026-10-20)

**Canonical:** https://bonoj.github.io/jit/lattice/ · **Source:** `jit/lattice/index.html` · **Manifest:** [channels.json](channels.json) · **Chronicle:** [CHRONICLE.md](CHRONICLE.md).

Lattice is a mobile-first global/ISS telemetry viewer. The **53 numbered channels are candidates**, not 53 promised live endpoints. Ten have human-provided browser normalization evidence and are marked `ACTIVE`; 43 remain `DEFERRED`. There are 25 implemented normalization mappings, including one explicitly browser-verified manifest status. A channel's `CODED` status is **not** proof of browser operation or data quality.

**Transport contract:** one in-browser governor, HTTPS-only, max 2 concurrent requests / 1 per host, bounded queue, pacing wake-up, timeout/backoff, URL dedup and cache. Initial batch now gathers **all 15 previously provider-tested sample groups**, including deferred channel mappings, plus the currently selected region's legacy cards. The periodic tick fetches only selected-view cards; there is no implicit ISS poll on unrelated views. The 15 sample groups cover 21 numbered mappings; their collection does not automatically promote channels to ACTIVE. 👁 reports configured, successful and pending sample-group counts. The selected-view legacy cards are distinct from numbered channels and may use additional providers.

**Evidence:** GitHub Actions [Lattice provider checks](https://github.com/bonoj/bonoj.github.io/actions/workflows/lattice-checks.yml) runs deterministic normalization/manifest guards and real HTTP/schema checks for six representative providers and all 15 sample groups. Antarctic wave channel 49 was deferred after a missing numeric wave value at (-65, 0); its request group was removed. Server-side probe success does not prove browser CORS or live rendering. Latest commits should be verified via CI and deployed build SHA; no invented cache-busting or manual build labels.

**Development invariants:** Preserve the existing [stable-world publisher](../../.github/workflows/stable-world.yml), SHA-stamped HTML and `build.json`, canonical URL, standalone UI, and independent Hormuz project. Do not introduce a second transport, expose keys, substitute different scientific variables, or classify channels ACTIVE without browser evidence. The inline normalizer currently duplicates `normalize.mjs`; keep them aligned until a tested single-source build is implemented.

**Next:** confirm the latest CI and Pages publication, establish browser-level evidence for sample-group intake, and expand the intake catalog beyond the 15 already-tested groups where provider access is demonstrated. Do not ask the human to debug endpoint plumbing. Do not ask the human to debug endpoint plumbing. Detailed history and the ten-turn campaign are retained in [CHRONICLE.md](CHRONICLE.md).

---

## Historical campaign notes (superseded by the operational handoff above)

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

## Ingestion campaign — turn 1/10

The [53-channel manifest](channels.json) is committed as `lattice-channels/v1`: 53 unique stable IDs, 17 provider/adapter groups, each currently `SPECIFIED` with no browser-verification claim. This is inventory plumbing, not 53 working integrations. Existing runtime remains `lattice/02` and unchanged. Next: bind manifest to reusable parsers and normalized observations, add deterministic fixtures, then exercise browser-origin source tests. Preserve [SPEC](SPEC.md) acceptance and [CHRONICLE](CHRONICLE.md) history.

## Ingestion campaign — turn 2/10

[channels.json](channels.json) retains 53 stable IDs; 25 Open-Meteo/ISS field extraction mappings are now `CODED` (not SOURCE_TESTED or BROWSER_VERIFIED). [normalize.mjs](normalize.mjs) provides pure normalization and manifest validation; [normalize.test.mjs](normalize.test.mjs) contains deterministic fixtures for the mapped fields, missing-value rejection, and 53-ID integrity. Tests are committed but **not yet executed**; browser runtime and governor remain unchanged at `lattice/02`. Next: execute tests, resolve any failures, integrate normalization through the existing governor without a second fetch path, then implement remaining provider mappings. No UI or publication changes.

## Ingestion campaign — turn 3/10

Expanded deterministic regression cases for null/NaN numeric fields, malformed TLE pairs, Antarctic sample geometry and model-kind classification in [normalize.test.mjs](normalize.test.mjs). Manifest integrity and 25 mapped fixture inputs were statically inspected. **Node execution was not achieved** because the local test runtime could not retrieve GitHub sources; this is not a green test result. The browser governor and public UI remain unchanged. Next priority: execute tests in a runtime with the repository sources available, then integrate normalized observations through the existing governor with a safe rollback boundary.

## Ingestion campaign — turn 4/10

Committed runtime integration at `de60cf32`: the existing governor's **successful response path** now captures normalized observations for matching manifest samples (and ISS position/TLE), without a second fetch path or new controls. 👁 includes `ingestion.normalized` and per-channel extraction errors. This is an additive diagnostic seam, not 25 verified feeds: existing regional samples often differ from the manifest, and channel 53 ground-track positions are not wired. Browser-origin execution and Node fixture suite remain **unverified**; source-level inspection and local `node --check` of the separate normalization module are not equivalent to browser verification. Next: execute deterministic tests against repository files, check the live origin, then align grouped provider sample points and add proper provider endpoints. Preserve the canonical URL, publisher and existing build identity; no cache-busting changes.

## Browser evidence — 2026-10-20 20:24:53 UTC

Human-supplied `lattice-eye/v1`, build `lattice/02`: World region issued three successful requests (ISS position, global USGS earthquakes, NASA EONET), zero failures. Normalization emitted channel **51** ISS altitude 421.13687947394 km, observed 20:24:51Z and fetched 20:24:51.915Z; zero ingestion errors. This is browser-origin evidence for one extraction, not all 25 mappings, and not a claim of source quality or long-term uptime. Channels 01/18/etc. are **not** browser-verified by the global aggregate views because the numbered region-specific filters are not implemented. Manifest status for 51 updated to BROWSER_VERIFIED with evidence. Next: align source samples and verify further numbered channels without changing the shared publisher.

## Ingestion campaign — turn 5/10

Runtime commit `184f152e` adds 16 grouped Open-Meteo sample requests covering 22 mapped weather, marine and air-quality channels (shared by provider and coordinates). These are enqueued **only by the existing 👁 batch** through the original governor, not as an extra periodic poller. Each response attempts per-channel normalization with extraction errors visible in `ingestion.errors`; successful observations appear in `ingestion.normalized`. ISS channel 51 remains the only browser-verified numbered channel from supplied evidence. Grouped sample fetches, polar/marine coverage, and current-field availability **await browser evidence**. Existing UI and publisher unchanged. Next: inspect post-batch 👁 results and fix actual source/parse issues; do not equate queued requests with success.
