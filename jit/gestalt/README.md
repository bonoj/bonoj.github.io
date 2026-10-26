# JIT Gestalt — model-directed UI workbench

**Status:** Initial experiment (2026-10-26). Not Pinterest's official Gestalt, nor an Android runtime. Isolated to `jit/gestalt/`.

## Thesis

A language model authors and revises a small **declarative UI contract**. The browser renders an interactive approximation immediately. Independent translators emit **Jetpack Compose** and **Android XML** representations without requiring an Android SDK or emulator.

The **contract is the source of truth**, not generated HTML. We want to investigate whether model-driven prototyping can preserve design intent, component semantics, tokens, state, and interactions across render targets.

## Open

- [Workbench](./index.html) — web preview, contract editor, Compose and XML generators
- [Initial contract](./contract.json)
- [Live site](https://bonoj.github.io/jit/gestalt/)

## Starting scope

- `mini-gestalt/v1`: tokens for background, surface, ink, accent, radius and spacing.
- Screen title, subtitle, ordered components.
- Components: `hero`, `chips`, `card`, `button`.
- Web preview has local chip selection and card saved state.
- Compose output is **illustrative**, not compile-verified; XML output is a **layout skeleton**, with styling/behavior requiring Android binding code.
- No claim of exact visual or behavioral parity across targets.

## How to iterate with ChatGPT

1. Describe a screen or a change conversationally.
2. Have the model revise `contract.json` according to `mini-gestalt/v1`, rather than hand-authoring HTML.
3. Refresh the workbench to see the web equivalent; inspect Compose and XML.
4. Compare intent, semantics, tokens, and interaction state across targets.
5. Extend the schema/renderers only when an actual experiment exposes a limitation.

The workbench also permits manual JSON editing with **Apply**; this is an escape hatch, not the primary model-driven workflow.

## Research questions

- Can generated UI remain constrained to a known component and token vocabulary?
- How should actions, state, accessibility, responsive layout and navigation be represented independently of runtime?
- Can the model propose a design without breaking the renderer contract?
- How should Compose and XML outputs share semantic structure while differing in idiom?
- How can we measure fidelity and drift instead of relying on visual plausibility?

## Connection to Pinterest

Pinterest's Gestalt design system motivates this experiment, but the implementation is deliberately independent. The interesting problem is **designer intent → governed UI contract → executable preview → native implementation**. Hausgeist (`../hausgeist/`) is an example of model-directed visual generation; this experiment adds explicit design constraints and multiple render targets.

## Deployment and safety

Repository: `bonoj/bonoj.github.io`, branch `master`, folder `jit/gestalt/`. Follow the repository root README and existing JIT/Pages publication machinery. Do **not** modify the protected root or publishing workflow. Git commit != verified Pages deployment. On each change, inspect source SHA, then confirm the live site separately. Avoid stale browser results with a cache-busting query parameter.

## Next

Move from toy-specific renderer branches to a reusable component registry; add explicit events/state and accessibility metadata; establish a fidelity test fixture; then try a second, radically different design contract without changing renderer code.
