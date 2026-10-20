# Icarus — active specification

**Executable:** https://bonoj.github.io/jit/icarus/ · [Chronicle](./CHRONICLE.md) · [Ice Cathedral reference](./ice-cathedral.png)

This is the **forward-looking design contract**, not the development diary. Completed experiments and film-clock history live in the Chronicle. The human and model will discuss and agree the final ship design **before implementation**. Do not silently treat a proposed design as authorized.

## Proven baseline — observed live

- Build `ae96c5c1`: autonomous meteor storms, eight asymmetric bays, full initial discrete ice canopy, 12 ice pushers, water/garden/processing/ice chains. The 36.8-second observer trace proved actual water delivery, growth, ice manufacture, hauling and placement; also exposed duplicate placement and unfavorable erosion rate.
- Build `07eca833`: lethal meteor-to-module collision, severed connections, exclusive ice destination reservations, 👁 tap-to-copy compact geometry snapshot, 👁 long-press full JSON download.
- Human-provided `icarus-eye/v2` snapshot at 11.8 s, seed 741, viewport 384 × 694: 41 meteors, 18 hits, 5 ice destroyed, 87 ice surviving, 12 pushers, one destroyed 💧 bay, three severed links, no reported violations. The water bay at (0.19, 0.62) died while the remaining modules stayed powered but became vulnerable to downstream feedstock starvation.
- The model reconstructed a dark portrait hub-and-spokes schematic from the compact coordinates: a pale-blue ice crescent across the top, ⚙️ central, 🧊 upper-left, ⚗️ right, paired 🛰️ midship, 🌱/🌳 lower-right, dead 💧 isolated lower-left. **The human confirmed this exactly matched the running screen.** Compact 👁 geometry is therefore a validated visual-development instrument, not merely telemetry.
- GitHub source commits and human runtime observations are distinct evidence. The build badge currently resolves the latest GitHub file revision; it is not an immutable deployed-build attestation.

## Current assignment — final Ice Cathedral ship design (DISCUSSION, not yet authorized to build)

Create a **badass, unmistakably industrial, asymmetrical lighthugger** with an elongated structural spine and dense working masses, inspired by the broad silhouette language of the USG Ishimura but not copying its asset. The [Ice Cathedral image](./ice-cathedral.png) is the visual reference. The human wants to be blown away by the finished ship **and** wants genuine ablative protection, not a cosmetic blue crescent. Preserve causal systems from the observed baseline. **Do not modify the executable until the final build is agreed in chat.**

### Non-negotiable geometry and causality

1. **Portrait, forward up.** Warm curved solar horizon at top, without a literal sun disk or decorative arc stroke. The vessel extends down/aft through the viewport; silhouette must remain legible on a phone.
2. **Physical ship, not a network diagram.** Replace bare hub-and-spokes with a coherent, substantial asymmetric hull: a main longitudinal structural keel/spine, varied connected hull compartments, offset industrial assemblies, machinery and visible drone/processing infrastructure. Every bay has a meaningful spatial footprint and attachment, not just an emoji at a point. Exposed machinery is vulnerable. Structural connections have explicit topology and failure consequences.
3. **True ablative shield.** The initial ice is a crowded, irregular, opaque cluster of individually simulated 🧊 chunks with solid blue footprints. Ice has position, collision size, HP, origin, support/attachment and physical occupancy. No single shield-health bar, alpha-only glow, decorative halo, dashed guide line, ghost slot or invulnerable drawn ice outline. A meteor is intercepted **only** if its swept physical trajectory intersects an existing intact ice chunk **before** reaching hull. Impacts damage/remove that chunk; resulting holes expose the actual geometry behind it. Hits on exposed modules destroy them immediately (current established rule).
4. **Shield must cover the vessel, not merely sit above it.** Design armor placement and meteor incidence together. For each bay, account for threat direction, forward/side exposure, ice occlusion, and possible breach routes. No claim of protection without actual ray/segment interception tests. Irregular crown, shoulder armor and selective lateral cladding are candidates for discussion; do not silently lock their shapes.
5. **No magical repairs.** Ice is finite physical material: ⚙️ power → 💧 circulation → ⚗️ precursor → 🧊 physical chunk at source → 🛰️ worker claims, loads, transports and installs it. 🌱 competes for water and grows 🌳. Destroyed sources and broken links interrupt real transfers; no production without supply.
6. **Real consequences.** Vectored downward micrometeor storms with angled left/right components, continuous swept collision, earliest actual target along path, localized impact/fire, destroyed bay wrecks, severed physical connections and downstream stalls. Drone bodies and carried ice are vulnerable. Preserve deterministic fixed-step seeded reset and meaningful event provenance.
7. **Autonomy, not gameplay.** No joystick, player policies, shop, win/lose overlay or invented controls. Only unobtrusive pause, reset, and 👁. Cap active pushers around 12, adjusted only for legibility/performance.

### Visual contract

- Industrial vessel should be identifiable **even if emoji icons are hidden**: distinct bow, spine, midship machinery, protruding structures, asymmetrical silhouette, aft engineering mass.
- Large readable bay icons belong **inside or on physical modules**, not as disconnected labels.
- Ice must appear densely packed and solid, with legible individual chunks and localized holes. It must visibly surround or armor the forward hull and exposed shoulder machinery, while allowing selected aft equipment to remain vulnerable.
- Visual layering is meaningful: meteors in front of shield, shield in front of sheltered hull, workers/cargo moving through real gaps, structural hull beneath. No purely illustrative collision proxy that differs from rendered geometry.
- Use the Ice Cathedral image for composition, not as a collision mesh or pasted background. Ship, ice, workers, fire and impacts must be drawn from live state.
- Single-page, no parent scroll, mobile-first. Preserve a coherent dark-space/ice/industrial palette and avoid HUD clutter.

### 👁 contract — two distinct observation scales

- **Tap:** copy a **thin** `icarus-eye/v2`-compatible spatial snapshot, small enough to paste in chat. Include exact normalized module locations, HP, links, active ice positions/HP, workers/cargo/targets, meteor positions/velocities, chain health, short recent event tail, seed, time, build and viewport. Expand only where needed for geometry comprehension: hull footprints, orientation, armor attachment/occlusion, module exposure, powered/supplied/producing/stalled state. Do not dump full event history on tap.
- **Long press:** download full JSON history with event provenance, IDs, all ice and modules (including dead), resource transfers, workers, collisions, destroyed connections, counters, invariant violations and truncation counters.
- One instrumentation switch should be capable of disabling runtime eyes without changing simulation dynamics. Runtime geometry must be faithfully representable by the thin eye report. The model should be able to reconstruct the rendered vessel from it and compare that reconstruction with the human's screen.
- Retain the existing build-identity caveat until actual execution SHA stamping is fixed.

### Acceptance tests for the final build

1. **Spatial shielding:** deterministic meteor rays strike outer ice first; removing a particular piece permits a repeatable strike on the module behind it. Lateral rays can reach deliberately unshielded parts. No shield-hit credit for a miss.
2. **Lethal exposed hit:** an unblocked meteor striking a bay kills it on that hit, visibly leaves wreckage, and interrupts actual connections/resources. No invulnerable hidden module center.
3. **Logistics:** produced ice begins at 🧊; one worker owns one chunk and one placement reservation; cargo travels with worker; placement changes subsequent collision results; no overlap, teleport or phantom stock.
4. **Cascade:** destruction of 💧 stops downstream supply and eventually ice manufacture; severing links can isolate modules; surviving powered modules may nevertheless be stalled for lack of material.
5. **Visual correspondence:** compact 👁 describes the actual hull footprints, ice geometry and module positions well enough to reconstruct the on-screen silhouette. Human compares it with the live display.
6. **Regression:** no negative inventories, orphan claims, double placement, uncontrolled populations, production from dead bays, or tunneling meteors; stable mobile frame rate and reset reproducibility.
7. **Verification:** JS syntax, GitHub readback, preserved reference image and live human 👁 after deployment. Do not claim browser verification from source readback.

## Decisions to make together before building

**Hull:** exact silhouette, length and width, mass distribution, bow, central keel, aft engines, asymmetry and exposed equipment.

**Armor:** shape of initial shield, whether shoulder/lateral coverage extends along hull, how chunks attach and what support loss does; threat-angle envelope and how protection is demonstrated.

**Materials and motion:** how much ice production can offset storms, how workers route through hull/armor, whether wreckage or detached armor remains physically interactive.

**Presentation:** visual density and rendering language at 384 × 694, readability of 🧊 and modules, and how to show active causal flows without decorative guides.

**Status: SPEC CLEANED; FINAL DESIGN DISCUSSION NEXT. NO FINAL BUILD AUTHORIZED YET.**
