# Icarus — working specification and change queue

**Canonical:** https://bonoj.github.io/jit/icarus/ · [Executable](./index.html) · [Chronicle](./CHRONICLE.md)

Append requested changes here as the human identifies them. This is the operational change queue, not a retrospective changelog. Mark each item **Requested**, **Shipped (source)**, or **Observed (live)**. Never claim live verification based solely on a GitHub write. Keep Icarus and Ender Forge changes isolated.

## 2026-10-20

### 👁 Export filename — Shipped (source); live unverified
- Human: “Eye is just your icarus report. So name it icarus-<sha>-<dts>?”
- Export format: `icarus-<sha>-<dts>.json`.
- `sha`: first eight characters of the source revision resolved for `jit/icarus/index.html` by the existing build badge; `unverified` if unavailable. `dts`: UTC ISO timestamp with colon and period characters replaced by hyphens.
- Source implementation commit: `9360e80d`.
- Existing JSON payload schema remains `lighthugger-shell-observer/v1`; filename change only.
- **Known build-identity limitation:** revision currently comes from GitHub's latest-file-commit API at runtime, not an immutable deployment stamp. A lagging Pages deployment may display a revision other than the HTML actually executing. Fix build stamping separately if required; don't claim exact executable identity based on this API alone.

## Conventions
- Append human-requested changes in order; don't silently discard unresolved items.
- Preserve the single-screen, icon-first mobile experience and the four lighthugger doctrines.
- Source readback verifies a commit; only the browser verifies published execution.
