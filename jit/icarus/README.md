# ICARUS — Lighthugger JIT

**Live target:** https://bonoj.github.io/jit/icarus/ · **Executable:** [index.html](./index.html) · **Change queue:** [SPEC.md](./SPEC.md) · **Development history:** [CHRONICLE.md](./CHRONICLE.md)

## Status

**Executable visual shell, not yet a playable spacecraft simulation.** Single-file HTML/CSS/Canvas committed to `master`; source inspected 20 October 2026. The published GitHub Pages runtime has **not been independently verified**. Earlier Icarus module-dashboard concepts were superseded by this lighthugger shell; their design reasoning and human turns remain in the Chronicle.

## What the current executable does

- Draws a large stylized ribbed lighthugger in a fixed position, with a blue ice nose, engine exhaust, starfield, Sun and forward arrow. The Sun and ship are **visuals**, not simulated orbital bodies or propulsion.
- Spawns small diagonal meteor streaks periodically, advances them across the canvas and removes offscreen particles.
- Applies an **approximate point-distance hit test** in a small forward region near the ship, rather than colliding with the rendered hull/shield outline. Each registered hit increments `impacts`, subtracts **0.14** from the initial `ice = 100` (floor 0), and logs an `ice-ablation` event. The ice is a scalar reserve; its rendered geometry does **not** erode.
- Tracks simulation seconds and a bounded event log (latest 2,500 events). **⏸ / ▶** pauses/resumes time and debris advancement; **↻** resets the run, ice, impacts and particles.
- **👁** downloads JSON with schema `lighthugger-shell-observer/v1`: `sourceCommit`, `runSeconds`, `paused`, `impacts`, `ice`, `events`, and an explicit shell-only geometry caveat. Filename: `icarus-<sha>-<dts>.json`, where `sha` is the eight-character build badge identifier or `unverified` and `dts` is a filesystem-safe UTC timestamp.
- Displays an eight-character source revision badge, resolved at runtime from the GitHub API's latest commit touching `jit/icarus/index.html`. **This is not a deployment-stamped identity**: when Pages lags, the displayed revision may differ from the actual HTML executing. On lookup failure it displays `unverified`.

## Not implemented

No actual ship translation, propulsion, trajectory, orbital/stellar physics, physical ice mass or shield geometry loss, accurate collision geometry, localized hull damage, heating, radiation, power, compartments, atmosphere, resource transport, crew, autonomous work, repair, defense strategy, or player command locus. No meaningful win/loss or emergent ship survival system. **Visual animation and a numeric ice counter are the entire current simulation.**

## Design invariants for future work

> **The enemy's gate is down.** Orient threats and defenses by the ship's forward vector, not screen gravity.
>
> **A sun is our greatest enemy and also our greatest ally.** Heat and radiation threaten; stellar energy can help.
>
> **Ablative ice is our friend.** Finite physical shield material should be lost where impacts occur.
>
> **It is always forward.** Preserve an advancing voyage and meaningful directional threats.

**Presentation:** one mobile viewport, no parent scroll, minimal icon-only HUD. **Agency:** eventual autonomous crew and strategic ship-level priorities, not manual actor driving. **Inspirations:** *Sunshine*, Reynolds's *Nostalgia for Infinity*, and tower defense × FTL × RimWorld × Ender-style commander control. These are **design direction, not shipped mechanics**.

## Working contract

- Append new requests and implementation/verification status to [SPEC.md](./SPEC.md).
- Record discussion, experiments, historical concepts, film-clock checkpoints, and abandoned approaches in [CHRONICLE.md](./CHRONICLE.md).
- Preserve existing JIT worlds (especially `jit/evermore-2/` and `jit/ender-forge/`); don't mutate them while working on Icarus.
- Distinguish **source committed**, **Pages published**, and **browser execution observed**. Never claim one proves the others.
