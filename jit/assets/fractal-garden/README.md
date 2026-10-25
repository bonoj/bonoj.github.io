# Fractal Garden — Accretion Laboratory

A collection of related experiments in organic geometry, living structures, and growth grammars. **Do not overwrite older specimens when adding a new one.** Prefer sibling HTML entrypoints and document their behavior here.

## Specimens

| ID | Entrypoint | Live | Purpose |
| --- | --- | --- | --- |
| chromatic-garden | [index.html](index.html) | [Open](https://bonoj.github.io/jit/assets/fractal-garden/) | Original touch-reactive chromatic fractal painting; palette, bloom and pause |
| living-architecture-02 | [living-architecture-02.html](living-architecture-02.html) | [Open](https://bonoj.github.io/jit/assets/fractal-garden/living-architecture-02.html) | Experimental tip-to-node branch fusion, cross-braces, pruning and material refund; fusion is geometric, not yet structural simulation |
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

## Living Architecture II — Fusion trial

- Standalone sibling of v1; original garden and v1 remain untouched.
- Growing tips seek nearby nodes at similar elevation and can join them with a new `fusion` edge, consuming material budget. The shared graph now has non-tree edges.
- Pruning removes a descendant branch and its incident fusion edges and refunds the removed edges' exact stored costs. Cutting the basal edge or tapping the root resets to full budget.
- This is a first geometric connection trial: no load-bearing solver, architectural occupancy, enclosed-room detection, or guaranteed bridge formation. Fusion opportunities depend on geometry and the evolving architectural tendency.
- Controls: swipe pruning, root rebirth, pause, 1×/3×/8×, reset. Canvas 2D; no external dependencies.
- **Known caveat:** pruning a fusion edge currently prunes its endpoint's descendant tree; future versions should distinguish severing a cross-link from amputating a lineage.
- Source committed; browser runtime not independently verified.
