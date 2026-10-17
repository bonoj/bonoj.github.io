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

## Working conventions

Use the existing source, build, deployment, and recovery machinery. Keep edits isolated to the intended experiment, read back GitHub writes, and distinguish a successful commit from verified browser execution.
