# Hermeticon Institute · Observatory

**Live baseline:** https://bonoj.github.io/jit/observatory/  
**Runtime:** [index.html](index.html) · **Mission:** [SPEC.md](SPEC.md) · **Work log:** [CHRONICLE.md](CHRONICLE.md)  
**Inherited engine:** [JIT Lattice README](../lattice/README.md) · [Lattice runtime](../lattice/index.html) · [Lattice specification](../lattice/SPEC.md)

## Cold-start handoff

The Observatory is a **literal, unmodified runtime clone of JIT Lattice**. It is **not yet** the designed Observatory. It still presents Lattice's original UI and inherited channels. Preserve the proven transport, refresh, observability and publishing machinery; transform the experience only after source verification. The intended product is a pristine, white, sterile, exorbitantly boutique Hermeticon Institute instrument displaying three arcane experiments. **No emojis.**

**Verified measurement feeds: 0/3.** No one has established three numeric, timestamped observations from actual endpoints. API documentation or a dataset catalog is not a successful measurement.

## Where to begin

1. Read this handoff, then [SPEC.md](SPEC.md) for the product contract and [CHRONICLE.md](CHRONICLE.md) for tested facts and known failures.
2. Inspect [Lattice README](../lattice/README.md), [Lattice SPEC](../lattice/SPEC.md), and the cloned [index.html](index.html) before modifying runtime. Reuse its existing request governor, caching, dedup, pacing, timeout, retries, eye/telemetry, mobile shell, and deployment practices.
3. **Fetch observations directly in chat/tooling, independently of the web page.** For each source prove actual numeric value, UTC observation time, unit, station/instrument identity, provenance, HTTP/schema and freshness. Then check browser CORS or a documented permitted alternative. Preserve raw response examples in a small bounded evidence log (no secrets).
4. Only after validation: implement adapters through the **existing** Lattice governor, integrate the three experiments, then build the visual experience. Verify the published GitHub Pages URL, not merely the commit or CI.
5. If an endpoint fails, record precise evidence in CHRONICLE and investigate alternatives; never replace measurements with metadata counts or fabricated values.

## Three instruments

- **⊛ Cosmic Flux** — observed ground neutron count rate; NMDB is a candidate, not verified.
- **⌁ Geomagnetic Response** — observed terrestrial magnetic field; INTERMAGNET/HAPI is a candidate, not verified.
- **∿ Abyssal Exchange** — observed deep-water dissolved oxygen; OOI/ERDDAP is a candidate, not verified.

## Repository boundaries

- **README:** operational handoff and current verified status.
- **SPEC:** authoritative scientific, interaction and aesthetic contract, acceptance criteria.
- **CHRONICLE:** concise Observatory-only decisions, attempted endpoints, evidence and failures.
- **channels.json:** inherited Lattice inventory, **not** a verified Observatory source manifest; do not claim it defines working instruments.
- **index.html:** inherited functional Lattice baseline, untouched until verified changes are ready.

**No new backend by default. No new fetch stack. No speculative deployment.** `➡️` means advance the next unresolved verified acquisition step autonomously.
