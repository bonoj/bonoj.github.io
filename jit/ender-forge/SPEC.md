# 🐉 Ender Forge — working specification

**Status:** Steady-state baseline. **No next direction is selected or authorized.**

## Scope and authority

- Independent JIT: [live world](https://bonoj.github.io/jit/ender-forge/) · [source](./index.html) · [handoff](./README.md).
- Work only within `jit/ender-forge/`. **Never modify `jit/evermore-2/`**, the preserved Tiffany baseline.
- The human chooses new objectives; the model may inspect, discuss, and maintain the current system but must not treat historical proposals as instructions to build.
- The complete previous specification and the explanation for retiring it are preserved in [CHRONICLE.md](./CHRONICLE.md#retired-working-specification--preserved-verbatim-19-october-2026). The old cognition implementation and micro-model are in [archive/](./archive/). Neither is an active dependency or roadmap.

## Current executable contract

- Ender is a **brainless random walker**, not a learning or planning agent. It moves with random heading changes and avoids arena edges, central exclusion, and tower obstacles. It does not choose goals, pursue workers, acquire resources, construct, or issue commands.
- Ender has a local snapshot bounded by `ENDER_SENSE=125`, witness-only actor tags, bounded identity and event-grounded relationship records, and local semantic event reception. Sightings and witnessed transitions are distinct; offscreen behavior is not inferred as fact.
- A tap/copy or long-press/download on Ender exports a factual `ender-wanderer/v1` report: executing build fingerprint, local entities, witness records, and explicit `control.mode='random-walk'`. No heuristic diary, synthetic shadow predictions, learned weights, or decision history is active.
- Tiffany and the five-land civilization retain their existing economy, ecology, combat, workers, towers, HUD, and interactions. Ender has no privileged access to their inventory or command system.

## Non-negotiable world invariants

- Physical resource flow: real source → exclusive claim → travel → harvest/pickup → visible cargo → physical delivery/drop → inventory or construction. No teleportation, duplicated claims, remote credits, free materials, or invented outcomes.
- Preserve local perception and ordinary physics/obstacle constraints. Do not create a second movement engine or bypass the existing simulation to make Ender appear capable.
- Preserve Tiffany's world and user-facing interface; no new UI, resource grants, actors, or behavior without a new decision.
- Source readback, Pages publication, and executing-browser verification are separate claims. The visible eight-character identifier fingerprints executing inline script, **not necessarily the Git commit**. A Git commit alone is not runtime proof.

## Handoff and verification

Read [README.md](./README.md) first, then current [index.html](./index.html). Consult [CHRONICLE.md](./CHRONICLE.md) only for history, rationale, evidence, or a specific unresolved question. Historical plans are **not** queued work.

Steady-state checks: Ender moves without a goal; local observations and reports remain available; no neural or heuristic policy runs; Tiffany continues normally. Preserve the last human-confirmed browser observation as evidence of its own build only; do not assert that later source changes have been browser-verified without a new witness.

**Frontier: intentionally blank. Await the human's decision.**
