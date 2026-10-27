# 👑 Hilltop — Rock Paper Saddam

[Play Hilltop](https://bonoj.github.io/jit/hilltop/) · [Source](./index.html)

## What it is

A small, touch-first, three-way **emoji king-of-the-hill toy**. Three rival banks of agents send contenders into a shared central arena. Tap an emoji to deploy one; tap repeatedly to send a swarm. Once deployed, agents move and fight autonomously. Whoever reaches and survives on the central hill can hold the crown until defeated.

This is deliberately a **silly interactive experiment**, not a balanced strategy game or finished tournament simulator. Its origin is the idea of a playful, visual creature-battle book, explored through the existing JIT emoji-ant-farm style: **tap → march → collide → something ridiculous happens**.

## Implemented (source as of October 27, 2026)

- **Three distinct factions**, each with four selectable agents:
  - 🟥 **Beasts:** 🦖 🦍 🦂 🐝
  - 🟦 **Ocean:** 🦈 🐙 🦀 🐡
  - 🟩 **Oddities:** 🛸 🍄 🔥 🪨
- **Tap-to-deploy:** every tap spawns an independent instance near its faction's entrance. Repeat taps to create groups. Maximum **55 concurrent living agents**; further deployment is rejected until space clears.
- **Autonomous motion:** agents march toward the hill; when an opposing king holds it, they target that king. Nearby opposing units can also divert movement and engage in combat.
- **Combat:** opposing units within 39 screen pixels exchange randomized damage, gated by approximately 500–900 ms per clash. Each species has fixed power and speed coefficients; initial health derives from power. Agents can both die in the same exchange.
- **Hill ownership:** if no king exists, a surviving unit within 26 pixels of the arena center can be crowned. The king remains centered and visually highlighted until killed. When killed, the hill becomes vacant and may be claimed again.
- **Crown counts:** each faction records how many times one of its units has been crowned. These are **crown events**, not time held, round wins, or persistent high scores.
- **Visual feedback:** crown glow, crown banner, emoji impact bursts, defeat status text, faction-colored banks, and three approach paths.
- **Controls:** **↺ Reset** clears agents, effects, king, and scores; **🎲 Chaos** attempts to deploy three randomly chosen agents from each faction (nine total).
- **Implementation:** single self-contained `index.html`, inline HTML/CSS/JavaScript, DOM-positioned emoji units, SVG background paths, and `requestAnimationFrame` simulation. No external assets, libraries, backend, or persistent storage.

## Actual behavior and limits

- This is a **continuous skirmish**, not discrete rounds. The human controls deployments, not individual unit movement or attacks.
- Faction allegiance prevents attacks on teammates. There are **no** explicit special abilities, matchup rules, elemental interactions, terrain modification, resources, respawning, or upgrade trees.
- Combat uses **simple proximity and numerical damage**, not physical collision simulation, line of sight, sophisticated AI, or authored animations. A dinosaur does not yet squash another creature with a visible foot.
- **No formal win condition.** Crown counts are the only score; they do not end play.
- The arena is sized in browser pixels. Movement is based on elapsed animation time, and effects are transient DOM nodes. The implementation is a lightweight prototype, not a stress-tested game engine.
- **Important current behavior:** once crowned, a king stays in place even if no enemies remain. Other friendly agents can gather at the hill. There is no automatic round reset or attrition.
- There is **no independent Runtime Eyes telemetry** or automated gameplay test in this version. Source inspection establishes what was implemented, **not** that a particular browser/device has successfully executed it.

## Interaction contract

1. Open the single page.
2. Tap any faction's emoji to deploy a contender.
3. Watch agents approach the shared hill and fight opposing agents.
4. Keep tapping to escalate the melee; optionally use **🎲 Chaos**.
5. Watch crown changes and counts; use **↺ Reset** to start fresh.

**Design intent:** extremely low-friction, readable cause-and-effect. No configuration or instructions should be necessary to begin playing. Preserve the three distinct banks and shared central hill as the core of this experiment.

## Possible directions — not implemented

- More expressive, visually legible outcomes (squashing, swallowing, trapping, ricochets, aftermath).
- Persistent shells, bones, debris, and other traces of previous battles.
- Special behavior per emoji rather than only speed/power differences.
- Three-way interactions and environmental consequences.
- Optional authored encounters or tournament-book progression.

These are **ideas**, not promises or part of the present build.

## Repository and publication

- **Repository:** `bonoj/bonoj.github.io`
- **Branch:** `master`
- **Entrypoint:** `jit/hilltop/index.html`
- **Live path:** https://bonoj.github.io/jit/hilltop/
- **Initial source commit:** `9eeb6e45251d21edaeabfa682d7fe8c035dc1113`

When modifying the toy, inspect the current source and this README first. Fetch the current blob SHA, make a targeted commit, read back the committed source, and distinguish **GitHub source updated** from **Pages published** and **browser behavior verified**. Do not claim the latter two without checking.
