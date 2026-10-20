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


### Lighthugger policy-control playfield — Requested (not implemented)
- **Human:** “Alright. Now then. Reorienting. We want a playable dashboard for lighthugger policy control. Ablative ice can be a clustered forward emoji clutter.”
- **Visual references:** Human provided screenshots of Tiffany Survivors and Ender Forge: one mobile viewport, dense spatial emoji populations and material clusters, strong center playfield, prominent icon-only controls. Use as presentation inspiration, not authorization to copy their underlying systems.
- **Target:** Ship is the battlefield; dashboard is a compact **policy** command surface, not a numerical engineering panel or direct actor joystick.
- **Ice:** A visible forward-facing cluster of individual 🧊 elements, with spatially localized meteor interception and consumptive loss. The cluster should become visibly perforated, rather than decrementing only a scalar reserve.
- **First playable causal loop:** incoming directional meteors → local ice interception/erosion → openings/exposure → player changes policy → autonomous response/consequences. Make policies materially consequential and observable; do not invent specific policy controls or resource-generation shortcuts before choosing their rules.
- **Status:** Direction recorded; implementation and verification pending. Preserve current shell until the playable slice is specified or authorized.
