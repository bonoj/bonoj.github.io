# Observatory — development chronicle

The inherited Lattice history is preserved at [Lattice CHRONICLE](../lattice/CHRONICLE.md). This file tracks **Observatory-specific** decisions and evidence only.

## 2026-10-23 · Failed prototype removed
A premature themed implementation was published before validating the feeds. Screenshot showed **0/3 SOURCES**. Guessed NMDB graph request aborted; guessed BGS HAPI path returned HTTP 400; OOI ERDDAP search failed and its parser would have counted catalog results, not oxygen readings. The user rejected the implementation; it was deleted in commit `ce9512ae`.

## 2026-10-23 · Clean Lattice clone
Cloned `index.html`, `README.md`, `SPEC.md`, `CHRONICLE.md` and `channels.json` from `jit/lattice/`. The runtime was copied **unchanged**; upstream Lattice was untouched. Clone sequence ended at commit `8d961837`.

## 2026-10-23 · New mission and cold handoff
Three experiments established: **⊛ Cosmic Flux** (neutron counts), **⌁ Geomagnetic Response** (terrestrial magnetic field), **∿ Abyssal Exchange** (deep-ocean dissolved oxygen). NMDB, INTERMAGNET HAPI, OOI ERDDAP/BGC-Argo are **candidate** source families. Prior research surfaced documentation and metadata, but **no verified numerical observations**. Browser CORS not yet verified. User specified **pristine white, sterile, exorbitantly boutique** design with arcane experiments. README and SPEC now govern the new project; full Lattice history remains upstream.

## Verified acquisition ledger
**0/3 feeds.** No source has passed numerical observation, UTC timestamp, unit, instrument identity, provenance, freshness and browser-origin accessibility. Never report API metadata as a measured observation.

## Next action
Fetch and validate actual numerical readings directly in chat/tooling, before implementing. For each source record endpoint/query, HTTP status, bounded raw evidence, parsed value, UTC observation time, unit, identity, quality/freshness and CORS. Investigate alternate providers if blocked. Only then connect to the inherited Lattice request governor and design the white experience.
