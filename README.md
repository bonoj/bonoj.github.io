# bonoj.github.io

Personal GitHub Pages home and JIT experiment shelf.

## Hermeticon

- **Enter:** https://bonoj.github.io/Hermeticon/
- **Source and orientation:** [bonoj/Hermeticon](https://github.com/bonoj/Hermeticon)
- **Current handoff:** [Hermeticon/HANDOFF.md](https://github.com/bonoj/Hermeticon/blob/main/HANDOFF.md)

Hermeticon is its own project. Follow its README and handoff, and use its own deployment machinery; do not stage Hermeticon changes through this site's JIT directory.

## JIT

- **Experiments:** [jit/](jit/)
- **Published paths:** https://bonoj.github.io/jit/
- **Chaos:** [jit/chaos/](jit/chaos/) — disposable Entropy specimen; see [Chaos README](jit/chaos/README.md) for setup and current verification status.

JIT experiments live in this repository under `master:jit/` and are published through this site's Pages workflow. Individual experiments may have their own instructions; read those before editing. A committed file is not proof that the corresponding Pages artifact is live.

## Protected root — invariant

**https://bonoj.github.io/ is the stable front door.** Its existing appearance, behavior, and dependencies must remain intact during JIT experiments or deployment changes.

- Experiment only under `jit/` unless a separate root change is explicitly requested.
- Never repoint the root to Chaos, Abyss, or another experiment as a side effect of publishing.
- Changes to `.github/workflows/` must preserve the established pinned root release and must not silently change what `/` serves.
- Verify the deployed root after publisher changes; a successful commit or workflow is not sufficient proof.
- If a proposed change risks the root, stop and isolate the experiment instead.

This rule applies to the root Pages publisher as well as to individual experiments.

## Working conventions

Use the existing source, build, deployment, and recovery machinery. Keep edits isolated to the intended experiment, read back GitHub writes, and distinguish a successful commit from verified browser execution.
