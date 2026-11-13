# ROCINANTE
Navigation reconstruction · Television continuity · Seasons 1–6

We're starting over with the chronology and celestial mechanics as the foundation. No viewer yet. First we need a coherent solar system, a continuous clock, and a route ledger that tells the simulation where the Rocinante must be and when.

The objective is to watch a spacecraft cross a **moving, gravitationally coherent solar system**, not draw lines between episode locations.

## 1. Establish the clock

The television chronology is generally placed between **2350 and 2356**, but its precise dates are not consistently established on screen. Some sequences have explicit durations; many do not.

I propose a provisional simulation epoch:

**SIMULATION EPOCH · PROPOSED**

**2350-01-01 00:00 UTC**

T = 0 · Heliocentric inertial reference frame

This is a computational anchor, **not a claimed canonical date** for the Canterbury's destruction. The exact placement of story events within the year remains adjustable.

We'll use three different notions of time: continuous simulation seconds for orbital motion, reconstructed story dates for spacecraft operations, and episode references for canon verification.

The simulation must never move a planet merely to make a narrative event convenient. We adjust an uncertain departure date or solve a different intercept.

## 2. The solar system at T = 0

All eight planets will be present from the beginning. Their positions will be computed from orbital elements propagated to the chosen epoch, not invented starting angles.

**Planetary scale and orbital periods**

| Body | Mean distance | Orbital period |
|---|---:|---:|
| Mercury | 0.39 AU | 88 days |
| Venus | 0.72 AU | 225 days |
| Earth | 1.00 AU | 365 days |
| Mars | 1.52 AU | 687 days |
| Jupiter | 5.20 AU | 11.86 years |
| Saturn | 9.58 AU | 29.45 years |
| Uranus | 19.2 AU | 84 years |
| Neptune | 30.1 AU | 165 years |

These are approximate reference values. The actual state initialization will use eccentricity, inclination, orbital orientation, and epoch-dependent mean anomaly, not just circular radii.

At 2350, a modern planetary ephemeris may be outside its validated high-precision interval. We should distinguish a physically consistent extrapolation from an independently verified 2350 astronomical position.

## 3. The celestial-body inventory

We need the entire relevant system, not just planets that appear in individual episodes.

| System | Bodies to model |
|---|---|
| Sun | Solar gravitational center |
| Mercury | Mercury |
| Venus | Venus |
| Earth | Earth, Moon |
| Mars | Mars, Phobos, Deimos |
| Main Belt | Ceres, Vesta, Pallas, Hygiea, Eros, selected smaller asteroids |
| Jupiter | Io, Europa, Ganymede, Callisto |
| Saturn | Titan, Enceladus, Rhea, Iapetus, Mimas, Tethys, Dione |
| Uranus | Titania, Oberon, Ariel, Umbriel, Miranda |
| Neptune | Triton, Proteus |
| Outer system | Pluto, Charon, Sol Ring |

This gives us 8 planets, 23 explicitly listed moons, a dwarf planet and its moon, and selected asteroids, with room to add others.

Every natural satellite has a parent body and a state relative to that parent. We won't place Ganymede or Io directly on heliocentric circular tracks.

**Special objects:**

- **Tycho Station:** A mobile artificial station, not a fixed asteroid. Its trajectory will be reconstructed with uncertainty.
- **Eros:** Starts on a natural orbit, then leaves ordinary gravitational dynamics when the protomolecule propels it toward Venus.
- **The Ring:** An artificial, effectively stationary destination in the outer solar system over our six-year simulation.
- **Medina:** An artificial station within Ring space, not a satellite of the Sun.
- **Ilus:** An extrasolar planetary system, simulated separately and connected through the Ring network.

For the eight planets, NASA JPL publishes an approximate Keplerian model explicitly covering 3000 BCE through 3000 CE. That includes 2350–2356, so we can use its published elements and correction terms directly.

The moon and asteroid models need their own orbital data and validation. We should not assume the planetary approximation covers them.

## 4. The complete six-season route ledger

This is the first-pass **Rocinante flight ledger**, with story-year placements based on the television chronology. It tracks the ship, not every character's independent travels. The year labels are provisional; the episode order is the stronger constraint.

### Season 1 — The Tachi becomes Rocinante
**2350** · Episodes 1–10 · Initial acquisition and escape

1. **Donnager encounter** — Tachi departs the doomed Martian battleship; this is our first Rocinante state.
2. **Tycho Station** — Repairs, disguise, transponder changes.
3. **Anubis asteroid** — Investigation of the abandoned stealth vessel.
4. **Eros** — Arrival, protomolecule outbreak, emergency departure.

### Season 2 — Eros and Ganymede
**2350–2351** · Episodes 1–13 · Outer-system operations

1. **Thoth Station** — Assault against Protogen.
2. **Eros interception** — Pursuit of an asteroid accelerating under alien propulsion.
3. **Tycho** — Regrouping after the Eros incident.
4. **Ganymede approach** — The Rocinante enters the Jovian system.
5. **Ganymede operations** — Alex maneuvers among Jupiter's moons; the crew confronts the protomolecule hybrid.

### Season 3 — Io and the Ring
**2351–2353** · Episodes 1–13 · Two major story arcs

1. **Jovian space** — The Rocinante becomes entangled in the Earth–Mars conflict.
2. **Io** — Approach and engagement near the hybrid research facility.
3. **Intervening period** — Time jump before the Ring expedition.
4. **Sol Ring approach** — Interception with the coalition flotilla.
5. **First Ring transit** — Entry into the Slow Zone.
6. **Ring Station crisis** — Maneuvers under the alien speed restriction.
7. **Return to Sol** — Exit after the network opens.

### Season 4 — Ilus
**2354** · Episodes 1–10 · First extrasolar expedition

1. **Inner-system preparation** — Modifications enabling atmospheric landing.
2. **Sol Ring** — Departure from the Solar System.
3. **Ring space** — Transit to the Ilus gate.
4. **Ilus system** — Approach to New Terra.
5. **Ilus surface and orbit** — Landing, orbital operations, and the crisis involving the *Barbapiccola*.
6. **Return transit** — Ilus gate → Ring space → Sol.

### Season 5 — The Free Navy
**2355** · Episodes 1–10 · Crew separation and pursuit

1. **Tycho Station** — Rocinante dry dock and major repairs.
2. **Belt departure** — Holden takes the repaired ship out after the protomolecule theft.
3. **Zmeya pursuit** — Interception of the Free Navy vessel.
4. **Belt operations** — Continued movement through contested space.
5. **Naomi rescue** — The Rocinante supports the final rescue sequence after her escape from the *Chetzemoka*.

### Season 6 — The final campaign
**2355–2356** · Episodes 1–6 · The Free Navy war concludes

1. **Inner-system patrol** — Operations against asteroid attacks.
2. **Azure Dragon** — High-speed interception and boarding.
3. **Ceres-bound journey** — Interception by the *Pella* and escorts.
4. **Coalition operations** — Preparation for the final Ring campaign.
5. **Sol Ring assault** — Engagement and entry into Ring space.
6. **Medina Station** — Final operations and the establishment of the Transport Union.

One especially useful anchor: the television chronology places the Ring flotilla's arrival approximately **187 days after Ring formation**, in 2353. We can preserve that duration even before deciding the exact calendar day.

The ledger also exposes gaps we need to resolve before fitting trajectories: where the Roci spends its off-screen months, how long major repairs take, and which events represent sustained operations rather than instantaneous arrivals.

## 5. The orbital and flight model

We'll separate the motion of natural bodies from the motion of the ship.

**Natural bodies**

Planets follow epoch-dependent orbital elements. Moons orbit their moving parent planets. Asteroids follow their own orbital solutions where available.

**Rocinante**

The ship begins with the position and velocity of its departure location. Epstein-drive thrust changes that velocity continuously. Gravity continues to act throughout the journey.

**Mission solver**

Each journey has a departure window, destination, arrival window, acceleration limits, and optional maneuver constraints. The solver targets where the destination **will be**, not where it was when the ship departed.

**Ring network**

Transit is a change of spatial domain. The ship's solar-system state is preserved in its history, and a new trajectory begins inside Ring space. Entering the Ilus gate transfers it into a separate stellar reference frame.

The central numerical model is:

```math
\ddot{\mathbf r}=
-\sum_i\frac{GM_i(\mathbf r-\mathbf r_i)}
{\lVert\mathbf r-\mathbf r_i\rVert^3}
+\mathbf a_{\text{drive}}(t)
```

We can implement this with adaptive numerical integration and configurable thrust, rather than manually positioning the Rocinante at successive stops.

The simulation needs to support a real flip-and-burn maneuver: accelerate toward a future interception point, rotate the ship, and decelerate to match the target's velocity.

## 6. What remains unknown

We must not confuse chronological plausibility with canonical certainty.

| Constraint | Treatment |
|---|---|
| Planetary positions in 2350 | Computable from JPL's long-range elements |
| Major moon positions | Compute from satellite orbital models |
| Eros and other asteroid positions | Obtain suitable orbital elements |
| Exact Tachi departure date | Reconstructed, not canonical |
| Tycho Station's changing location | Requires an explicit station trajectory assumption |
| Precise Ring position and orientation | Canon-constrained, with remaining geometry inferred |
| Individual Epstein burn durations | Solve subject to story and acceleration constraints |
| Ilus system orbital parameters | Fictional model, constrained by what the series shows |
| Off-screen Rocinante travel | Interpolated, visibly distinguished from canonical events |

The starting positions of all celestial bodies are therefore **defined by the epoch and orbital models**, not yet calculated into a numerical state table. That table is the next concrete deliverable.

## 7. Build order

1. **Ephemeris foundation** — Calculate and validate all eight planets at 2350-01-01. Add the selected moons and asteroids. Establish deterministic positions and velocities for arbitrary simulation dates.
2. **Chronology dataset** — Convert the route ledger into structured events with episode references, time intervals, locations, confidence, and required spacecraft states.
3. **Flight reconstruction** — Fit continuous trajectories between the canonical encounters. Expose transit time, acceleration, maximum speed, flip point, and arrival velocity.
4. **3D observatory** — Render the full moving solar system, the ship's actual trajectory, velocity vectors, burn phases, and a continuous timeline.
5. **Ring and Ilus** — Add the Ring as a physical gateway into a separate space, then reconstruct the Ilus expedition.
6. **Six-season playback** — Integrate all route segments and verify that every major television encounter occurs at the correct moving destination.

**The first acceptance test is simple:** advance the clock from 2350 to 2356 with no Rocinante present. Every planet and modeled moon must move continuously and return to a reproducible position when the clock is scrubbed backward. Then introduce the Tachi at its reconstructed departure state and solve the first intercept with Tycho.

No more fixed dots, decorative orbital rings, or scripted jumps masquerading as spacecraft navigation.

This is the foundation I'd build against.
