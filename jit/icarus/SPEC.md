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


### Structural lighthugger and emerging core loop — Requested (not implemented)
- **Human:** “We want messy as hell ice system around a locus informed by hull. So let's think about a lighthugger is. I see a string of nodes. It's a lot like the usg ishimura.” Follow-up: “Doc this. I think we're finding our core loop.”
- **Ship form:** A long **string of structural nodes**, an industrial spine with asymmetrically attached working masses and modules; **USG Ishimura** is a silhouette/visual-language reference, not a literal asset or a requirement to reproduce its design. Lighthugger scale and partly dormant spaces remain design context.
- **Topology:** Nodes represent physical hull/compartment/machinery loci and damage/attachment state. Edges represent actual connections that may eventually carry structure, energy, heat, materials, and crew. Define each connection's supported consequences before implementation; do not assume every edge carries every resource.
- **Ice system:** Messy, irregular forward **emoji clutter** (🧊), spatially attached to forward hull loci and potentially other chunks. Individual chunks can overlap visually, shelter others, be struck and lost, and leave holes. Clusters may detach when a supporting structural node/connection fails. Ice is finite matter, not a replenishing health bar; precise generation, collision, attachment and supply rules are still to be chosen.
- **Presentation candidate:** Vertical ship spine on portrait mobile, **forward at top**, engines aft, ice crown toward incoming debris, compact policy bar below. This orientation is a **model proposal**, not yet a human-locked invariant; the ship's physical forward vector remains authoritative.
- **Emerging core loop:** **directional threats → localized ice loss → exposed hull nodes → human policy adjustment → autonomous crew/material response → changed protection and survival consequences**. The commander acts at policy/locus level, not as a joystick for individuals. Policy choices must compete over real constraints; no free shield restoration.
- **First implementation frontier:** Choose the smallest playable vertical slice that exhibits an actual causal change in geometry/structure and a meaningful policy tradeoff. Exact policy commands, repair/supply mechanisms, and node/edge physics are open.
- **Status:** Requested design, not shipped. Existing shell's numeric ice reserve and approximate collision are placeholders.


### Solar-horizon ice arc and drone construction — Requested; in-chat prototype authorized (20 October 2026)
- **Human:** “We need drone bays. And a way for ice to be positioned into a solar shield via drones. So they naturally want to build an arc to protect drones and activity after. Think frozen soldiers in the battle room. Do we want sun at top? I think sun at top as a curve gives us a place for text if we need it.” Then: “Oh hell yes. That's beautiful. Doc this and then build it here in chat.”
- **Orientation:** Sun as a curved horizon at the **top** of portrait playfield, leaving an arc for sparse contextual text. Forward is sunward/up; structural spine extends downward/aft.
- **Topology:** Hull nodes on a longitudinal spine; paired drone bays; forward ice attachments form an irregular curved canopy with an interior sheltered work cavity.
- **Physical loop:** Finite ice inventory → drone retrieves a chunk → travels to an attachment site → installs a real chunk → occludes incoming sunlight/debris for zones behind it. Damage removes individual chunks and may expose drones/bays, creating repair work.
- **Autonomy:** Drone policy selects work priorities and sheltered routes; player commands policy, not individual drones. Favor emergent protection arcs from candidate placement scoring over pre-scripted instant semicircle construction.
- **First prototype:** In-chat interactive demonstration authorized. This does **not** authorize deploying changes to `jit/icarus/index.html` yet. Clearly distinguish illustrative sun/shadow rules from validated physics.
