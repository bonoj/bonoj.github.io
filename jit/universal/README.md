# UNIVERSAL

**Every story. The same story.**

[Screening room](preview.html) · [Specification](SPEC.md) · [Execution contract](EXECUTION.md) · [Chronicle](CHRONICLE.md)

## Feature-scale autonomous prototype — November 2026

The screening room now imports `src/story/feature.js`, not the earlier fifteen-scene fixture generator. Select one of twelve genres and press **Next Picture** to receive another seeded, deterministic screenplay draft. Previous Picture and Fountain export remain available. No user-directed actions or interactive causal decisions.

The prototype generates 65–90 scenes per picture, with five characters, roughly 14–24 dialogue lines per scene, genre-specific settings and objects, and 24 available event types across knowledge, concealment, social conflict, commitments, custody, access, resources, damage, deadlines, authority, and movement. It records state snapshots and an event fingerprint. It does not require dropped objects, retrieval arcs, or any one plot event. Character lines deliberately favor unremarkable everyday speech.

The older fixture generator (`src/story/film.js`), ontology, abstract planners, and laboratory remain in the repository for reference; they are **not** the default screening-room experience. The 555 primitive labels remain a catalog, not 555 executed behaviors.

## Validation and limitations

`test/feature.mjs` defines a 1,200-film corpus check (100 seeds × 12 genres), including length, deterministic Fountain output, dialogue density, operator breadth, and structural fingerprints. This test was added but has **not been executed** in this environment. Browser execution and GitHub Pages propagation have not been independently verified.

**Feature-scale is not yet feature-quality.** The screenplay compiler is a broad stochastic prototype with state-changing events and repeated dialogue patterns; it does not yet construct deep goal-directed causal plots, truly contextual dialogue, or robust narrative closure. Structural fingerprints do not prove semantic distinctness. The generated dialogue is intentionally average, but some repetition and incoherence remain. This is a usable breadth-first draft engine, not a claim of 1,200 accepted finished movies.

Run `node test/feature.mjs` from the `jit/universal` directory to execute the new corpus check.
