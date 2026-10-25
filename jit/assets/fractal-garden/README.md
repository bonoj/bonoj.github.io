# Fractal Garden — Accretion Laboratory

A collection of related experiments in organic geometry, living structures, and growth grammars. **Do not overwrite older specimens when adding a new one.** Prefer sibling HTML entrypoints and document their behavior here.

## Specimens

| ID | Entrypoint | Live | Purpose |
| --- | --- | --- | --- |
| chromatic-garden | [index.html](index.html) | [Open](https://bonoj.github.io/jit/assets/fractal-garden/) | Original touch-reactive chromatic fractal painting; palette, bloom and pause |
| living-architecture-01 | [living-architecture.html](living-architecture.html) | [Open](https://bonoj.github.io/jit/assets/fractal-garden/living-architecture.html) | Autonomous branching with swipe pruning, material budget recovery, and age-varying architectural/vegetal growth tendencies |

## Living Architecture v1 — interaction and accounting

- Swipe through segments to remove their descendant subtrees.
- Pruning refunds each removed living segment's original growth cost into a capped shared reserve.
- The surviving parent can emit a replacement growing tip.
- Cutting the basal segment, or tapping the root marker, begins a new life with the **entire** budget restored.
- Growth tendencies drift over age: canopy, foliage, trunk/lattice, and vault/masonry labels indicate the current bias. These are stylistic tendencies, **not** genuine load-bearing structural calculations or chamber generation.
- Controls: pause/resume, 1×/3×/8× speed, regenerate.
- Technology: standalone Canvas 2D HTML, no external dependencies; mobile pointer gestures.
- No runtime smoke test has been performed; source presence and commit do not prove deployed browser behavior.

## Research direction

This is **not a Prune clone**. Goal: tree → inhabitable architecture → forest, using evolving local growth rules and a common structural graph. Next explorations: branch fusion and arches, negative space/chambers, load and light, material exchange, differentiated botanical/architectural species, and population interaction.

Relevant source: [Hermeticon Arcana populations](https://github.com/bonoj/Hermeticon/tree/master/arcana/populations) — especially Mycelial Lace (surface-following networks), Glassfall (inverted growth), and Cinder Chimneys (hollow bead-ring walls). Preserve accepted Hermeticon populations; experiments here are independent.

## Accretion contract

1. Keep each specimen directly linkable and independently executable.
2. Preserve previous experiments; add a new sibling or intentionally version an existing one.
3. Describe interactions, invariants, known limitations and live URL.
4. Keep the root [JIT Assets inventory](../README.md) synchronized with added entrypoints.
5. Verify source and deployment independently; never infer live success from a commit.
