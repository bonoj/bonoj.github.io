# Hermeticon Institute — Observatory specification

## Purpose
Three real scientific instruments examining a single planetary system: **what arrives, what responds, what circulates**. Scientific rigor beneath a mysterious, restrained public experience.

## Experiments
**⊛ Cosmic Flux:** neutron monitor count rate, preferably Antarctic. Candidate: NMDB. Require actual numerical counts per documented unit, UTC observation time, station identity, provider, quality and freshness.

**⌁ Geomagnetic Response:** terrestrial observatory magnetic field components. Candidate: INTERMAGNET HAPI. Require numeric component readings, component-specific units (typically nT), UTC observation time, station, cadence, quality and provenance.

**∿ Abyssal Exchange:** deep-water dissolved oxygen. Candidates: OOI and BGC-Argo. Require measured numerical oxygen, units, UTC observation time, sensor/float, **measured depth**, provenance and QC. Prefer temperature as context. Catalog records are not oxygen observations.

All sources are **candidates, not verified feeds**. Current verified numerical feeds: **0/3**.

## Acquisition and acceptance
1. Discover official/documented source and usage restrictions.
2. Independently request data in chat/tooling **before** touching the runtime.
3. Save bounded raw evidence: request, HTTP status, numeric observed value, UTC observation timestamp, unit, station/instrument, source, QC and age. No fabricated data, no metadata counts standing in for measurements.
4. Verify GitHub Pages browser-origin CORS; server access alone is not enough. Document an authorized fallback only if needed.
5. Record success/failure in CHRONICLE; promote only verified sources into adapters through the **existing Lattice transport governor**.
6. Integrate, publish, then smoke-test the actual page and compare raw, normalized and displayed values.

## Experience
**Pristine white. Sterile. Exorbitantly boutique. Arcane.** Swiss institutional publication meets laboratory instrumentation. White porcelain and pale neutral ground; subtle hairlines; dark graphite precision typography; enormous negative space; restrained metallic accents. Three instruments marked **⊛ ⌁ ∿**. **No emoji.** Very little copy; beautiful, legible measurements, units and timestamps; provenance and quality discoverable without clutter. Honest loading, stale and failure states. Single page, mobile-first and desktop-composed, with usable touch targets and no scroll traps. Do not imitate a SaaS dashboard or dark cyberpunk control panel. No decorative fake signals.

## Architecture
The Observatory's index.html is an unchanged functional clone of [JIT Lattice](../lattice/). Preserve Lattice's existing single request governor, concurrency/host pacing, dedup, cache, retry, timeout, eye/telemetry, lifecycle and publishing conventions. Consult [Lattice README](../lattice/README.md) and [Lattice SPEC](../lattice/SPEC.md) before modifications. Inherited globe and channels are temporary baseline, not design requirements. No new backend or second fetch stack by default.

## Definition of done
Three independently verified browser-reachable observation feeds; numeric measurements with units, UTC times and provenance; oxygen depth; honest freshness and failure; pristine responsive white interface; live published browser verification; accurate README and CHRONICLE.

**Sequence: research → fetch → validate → implement → deploy → verify.**
