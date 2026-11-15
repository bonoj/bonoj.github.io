# HOLES — Seven Material Worlds
Status: **concept specifications, not implemented experiences**. Added 2026-11-15. These are a second collection alongside the existing seven chambers; do not overwrite the original cabinet.

## Shared design contract
- Seven independently buildable, mobile-first, orbitable interactive experiences; each with a coherent physical subject, beautiful default state, and minimal controls.
- Prefer genuine 3D spatial state, geometry, and material/light behavior. No screen-space 2D stand-ins for inherently volumetric processes.
- Each experience separates **observed physics**, **reduced-order approximations**, and **artistic visualization** in its README and UI. No claims of scientific accuracy without validation.
- A good first minute must reveal the mechanism without requiring setup. Gesture orbit/pinch, pause/reset, time scale and one or two subject-specific interventions. Never silently substitute screenshots for a working simulation.
- Budget GPU/CPU on mobile; deterministic seeded replay, simulation timestep independent of rendering, clear errors on shader failure, performance readout in development. No mandatory network assets.
- Ship each built specimen separately to jit/assets and cross-link here only after it works. These seven entries are specifications, not demos.

## 01 · The Magnetic Labyrinth
**Premise:** A cloud of magnetic micro-particles organizes into moving chains, loops, bridges and clusters under a manipulable 3D magnetic field.
**Experience:** Orbit a transparent chamber; drag a dipole magnet in space. Chains grow and break, particles follow field gradients, and a second magnet competes with the first.
**System:** 3D particle positions/velocities, induced or permanent dipole orientation, dipole-dipole interactions with near-field softening, Brownian noise, viscous drag, collision exclusion and spatial hashing. Explicitly separate magnetic field lines (visual aid) from particles (physical state).
**Controls:** field strength, viscosity/temperature, magnet placement, polarity reversal, pause/reseed.
**Milestones:** (1) single dipole and tracers; (2) particle chaining; (3) competing fields and reversible rearrangement.
**Validation:** chains align with a dipole; behavior changes continuously with strength and noise; no unbounded kinetic energy or particle interpenetration.
**Scope:** qualitative magnetorheological toy, not a solved ferrofluid free surface.

## 02 · The Color Factory
**Premise:** Structural color emerges from 3D periodic packing, not colored pigments.
**Experience:** Compress and shear a transparent bead lattice. White illumination produces angle-dependent iridescence; imperfections broaden and mute the reflection.
**System:** 3D sphere packing, lattice spacing, local order and defects; wavelength-dependent scattering/reflection using a physically motivated Bragg/photonic approximation, with spectral-to-display conversion. Show lattice and reflected spectrum together.
**Controls:** bead diameter, spacing/strain, refractive-index contrast, disorder, lighting angle.
**Milestones:** (1) ordered FCC/HCP bead crystal; (2) view-angle spectral response; (3) defects and heterogeneous domains.
**Validation:** wavelength shifts with lattice spacing and view angle; removing index contrast removes structural color; no arbitrary hue slider disguised as physics.
**Scope:** approximate optical model, not full Maxwell FDTD.

## 03 · The Shape of Sound
**Premise:** Vibrations organize grains into the nodal structures of a resonating plate.
**Experience:** A 3D plate hums under excitation. Grains jump, slide and settle into changing Chladni figures; sweep frequency to pass through modes.
**System:** discretized elastic plate eigenmodes or finite-difference thin-plate displacement, forcing/damping, gravity, contact/friction, grain advection from local acceleration and repeated impacts. The visible patterns must arise from simulated vibration and grain motion, not prepainted curves.
**Controls:** drive frequency, amplitude, damping, grain count, excitation point.
**Milestones:** (1) vibrating plate and modal readout; (2) grains responding to motion; (3) multi-mode excitation and sweeps.
**Validation:** grains accumulate near low-vibration nodes; modes depend on boundary conditions; pause retains current grain state.
**Scope:** physically inspired granular transport, not full acoustic-solid coupling.

## 04 · The Underground Internet
**Premise:** A living fungal mycelium grows a resource transport network through porous 3D soil.
**Experience:** Cut away the soil to expose roots, hyphae, mineral pockets and nutrient flows. Add a food source and watch tips explore; remove one and observe redistribution.
**System:** 3D branching graph embedded in a heterogeneous substrate; tip chemotaxis and stochastic exploration; carbon/nutrient budgets, edge conductance, growth cost, decay, fusion/anastomosis and constrained transport. Flow must consume resources and be observable in graph edges.
**Controls:** nutrient deposits, moisture, obstacle painting in 3D, growth rate, section plane.
**Milestones:** (1) exploratory tips; (2) resource uptake/transport; (3) pruning, fusion and competing colonies.
**Validation:** no growth without resources; conservation ledger for biomass/nutrients; obstacles redirect tips; starvation causes regression.
**Scope:** conceptual fungal ecology, not a species-calibrated physiological model.

## 05 · The Last Soap Bubble
**Premise:** A suspended soap film drains, changes optical thickness, develops surface motion and ultimately ruptures.
**Experience:** Orbit a delicate iridescent sphere. Color bands drift as the film thins; touch the surface to introduce a wave. A thinning patch nucleates rupture and the film retracts.
**System:** triangulated closed 3D surface with thickness field, gravity-driven drainage and surface diffusion, tension-driven shape modes, thin-film interference computed spectrally from local thickness and view angle, rupture threshold and moving rupture front.
**Controls:** gravity, initial thickness, evaporation, disturbance, light direction, replay.
**Milestones:** (1) thin-film interference on a 3D sphere; (2) evolving thickness and waves; (3) rupture propagation and reset.
**Validation:** color follows thickness/angle, drainage accumulates downward, thickness stays nonnegative, rupture is topological and irreversible within a run.
**Scope:** reduced thin-film dynamics, not full surfactant hydrodynamics.

## 06 · Lightning in a Bottle
**Premise:** Electrical breakdown turns a gas-filled 3D vessel into branching luminous discharge paths.
**Experience:** Move two electrodes inside a transparent chamber, change pressure and voltage, and watch ionized channels emerge, flicker and fade.
**System:** electrostatic potential on a coarse 3D grid with electrode boundary conditions; electric-field gradients drive stochastic breakdown probability; ionization, conductivity memory, charge/energy budget and recombination. Render volumetric channels and glow without substituting random branching drawings for field coupling.
**Controls:** electrode placement, applied potential (dimensionless), pressure proxy, gas composition preset, pulse duration.
**Milestones:** (1) field solver and equipotentials; (2) breakdown growth; (3) pulsed discharges and fading afterglow.
**Validation:** no discharge without field, growth responds to electrode geometry, energy stays bounded; clearly label all dimensionless quantities.
**Scope:** visual educational plasma model, not a validated high-voltage engineering simulator. No real-device construction guidance.

## 07 · The Impossible Aquarium
**Premise:** A sealed ocean-in-a-sphere exchanges energy with its surroundings but no matter. Can its ecology persist for a thousand simulated years?
**Experience:** A 3D glass biosphere contains water, mineral substrate, producers, consumers, detritus and microbes. Orbit and inspect it, then accelerate time; observe cycles, collapses and rare long-lived equilibria.
**System:** finite closed inventories of carbon, nitrogen, phosphorus, oxygen and water; explicit reservoirs and transfer fluxes; light input, heat loss, photosynthesis, respiration, decomposition, mineralization, growth, predation and mortality. Individuals may be agents; chemistry must remain conserved at system level.
**Controls:** initial population and nutrient mix, illumination cycle, temperature boundary, time acceleration, inspect organism/reservoir; no matter injection during a sealed run.
**Milestones:** (1) closed mass-balance ledger and abiotic cycles; (2) producer/decomposer loop; (3) consumers, ecological succession, stability/failure scenarios.
**Validation:** every material transfer balances, total element inventories remain constant to tolerance, no perpetual growth without energy, failures explainable from telemetry. A thousand-year survival is an experiment, not a guaranteed win condition.
**Scope:** coarse-grained closed-ecosystem model, not a prediction of real biosphere survival.

## Build priority
1. **Shape of Sound**: rapid physical feedback, strong observability, achievable staged solver.
2. **Last Soap Bubble**: rich 3D optics and time-evolving surface.
3. **Impossible Aquarium**: highest systems-design depth; start with conservation ledger before visuals.
4. Color Factory, Underground Internet, Magnetic Labyrinth, Lightning in a Bottle as independent investigations.

## Completion gate
A specification becomes an implemented experience only when its runnable artifact is committed, indexed in jit/assets, smoke-tested for initialization and interaction, and its model limitations documented. Do not mark these concepts as shipped simulations.
