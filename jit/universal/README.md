# UNIVERSAL

**Every story. The same story.**

Universal is an independent fictional studio and an experimental deterministic screenplay compiler. [System specification](SPEC.md) · [Development chronicle](CHRONICLE.md).

## Implementation status

**Phase 1 in progress.** The repository contains a deterministic fifteen-function planner, an event-sourced state engine, one Thriller scene realization fixture, screenplay AST blocks, Fountain export, and Node tests. The Thriller fixture is a **15-scene short screenplay skeleton**, not a feature film. It currently uses one underlying plot and recurring dialogue with varied names, institutions, and evidence. It does **not** meet the specification's diversity, causal-event integration, natural dialogue, or thousands-of-distinct-films acceptance gates.

Run `npm test` in `jit/universal/` to execute Phase 0 and Phase 1 tests. `generateFilm('thriller', ordinal)` is the developer entrypoint. No public reader or genre selector is deployed yet.

## Identity

The public-facing brand is **UNIVERSAL**, not Universal Pictures. The engine is **The Universal Screenplay**. This project is not affiliated with the existing Universal Pictures studio.
