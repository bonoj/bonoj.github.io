# Observatory — Lattice clone / initial handoff

**Runtime:** [index.html](index.html) · **Upstream:** [JIT Lattice](../lattice/) · **Original Lattice handoff:** [Lattice README](../lattice/README.md)

## State

This directory begins as an **unchanged functional clone** of JIT Lattice, not a completed Hermeticon Observatory. Its inherited channels, presentation, governor, and source definitions remain as-is. The three Hermeticon experiments are **not verified live instruments**; inherited candidate adapters are not proof of functioning observations.

## Contract

1. Preserve the existing Lattice machinery and publication/refresh semantics. Do not reinvent transport.
2. Before changing any instrument, independently fetch its actual data endpoint; validate numeric measurement, timestamp, units, provenance, and browser/CORS accessibility.
3. No fabricated readings, catalog counts substituted for observations, or claims of three working feeds before three independently verified measurements.
4. Specify changes, then implement, deploy, and verify from the published browser runtime.
5. Record verified endpoints, evidence, and failures here before promotion.

## Inherited artifacts

- [SPEC.md](SPEC.md), [CHRONICLE.md](CHRONICLE.md), and [channels.json](channels.json) are copied from Lattice for provenance; their Lattice scope is **not** automatically the Observatory specification.

## Proposed experiments — unverified

- ⊛ Cosmic Flux — neutron monitor observation
- ⌁ Geomagnetic Response — magnetic observatory measurements
- ∿ Abyssal Exchange — deep-ocean dissolved oxygen observation

**Status:** clone baseline; observational verification pending.
