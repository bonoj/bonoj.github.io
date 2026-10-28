# Autology

**Language made physical.**

First experiment: **DECAY**. The word is rendered as ordinary Georgia typography, then sampled into a fixed inventory of BBs proportional to glyph ink area. Until released, the original glyph mask is drawn unchanged. A top-down release front turns constrained BBs into falling particles with gravity, wall/floor bounce and local BB collisions. BBs are never intentionally deleted during the transition; counts are exposed in the interface.

## Entry point

- [Live experiment](https://bonoj.github.io/jit/autology/)
- `index.html`: standalone HTML/CSS/JS; no dependencies, telemetry, or network calls.

## Design status

This is an initial physics/typography proof of concept, **not** a settled site UX. A selectable word/behavior bank is a future exploration, not implemented here. The user explicitly deferred deciding site behavior. Possible future semantic materials: MELT, BLOOM, FRACTURE, ORBIT, REMEMBER. Preserve the original glyph raster before release and preserve BB identity/count across transitions. Current simple collision solver is an experiment, not a physically rigorous packed granular simulation.

## Second phase — GROWTH (2026-10-28)

After DECAY's release and settling interval, the action becomes **Growth**. The same BB objects are assigned to a bottom-up sampled mask of `growth`, with a central trunk-like upward path that branches laterally toward target glyph pixels. The number of available BBs caps how much of the new word can be reconstructed; no particles are minted. Reset restarts the experiment. This is a first-pass visual growth trajectory, not yet a physically simulated branching tree.
