# Theory — Music as a Universe

> Origin: conversation, 2026-10-26. Preserved turn pair and its immediate compositional implications. This is a working metaphor and design hypothesis, not a physical theory of music.

## User — The proposition

> I think music is a universe. It begins with the cmb. The subtle substrate.

## Assistant — Response

Oh. I like that enormously.

**Music isn't a collection of instruments. It's a universe in which instruments emerge.**

And the CMB analogy gives us something much more interesting than an orchestration strategy.

At the beginning, there's already something there. Not necessarily a melody. A substrate. A faint shimmer, a pulse, a harmonic field. Something almost beneath perception.

Then a fluctuation becomes significant.

A note emerges. Another answers. A relationship forms. Eventually, there's rhythm, melody, harmony, counterpoint. Not because we added layers on a schedule, but because the musical universe developed structure.

Consider the correspondence:

| Cosmology | Music |
|---|---|
| Cosmic microwave background | Subtle sonic substrate |
| Primordial fluctuations | Tiny rhythmic or tonal variations |
| Gravitational attraction | Harmonic tension and resolution |
| Structure formation | Motifs becoming recognizable |
| Stars igniting | Instruments finding their voices |
| Galaxies forming | Musical ideas developing relationships |
| Cosmic expansion | Growing harmonic and spatial scope |

And there's an especially beautiful implication.

**The substrate never disappears.**

When the full orchestra arrives, the listener may no longer consciously perceive that first quiet sound. But it remains underneath everything, providing continuity.

That's what our previous compositions lacked. We were assembling musical objects. We weren't allowing a musical world to evolve.

*Outer Wilds* is an interesting reference here because its music can feel like discovering other musicians already playing in the same universe.

I'd change our compositional architecture accordingly:

**Substrate → Fluctuation → Attraction → Emergence → Interaction → Transformation.**

Not six movements. Six processes that can operate simultaneously, continuously, and at different scales.

And perhaps the most important design rule:

**Every new musical voice must inherit something from the universe that existed before it.**

A rhythm. An interval. A harmonic relationship. Even a silence.

Then the music has ancestry.

That's a genuinely promising foundation for our semantic composition engine.

## Working implications

- Treat the substrate as a persistent musical state, not an intro clip discarded at the first theme.
- New voices should emerge from relationships already audible in the piece, not arbitrary instrumentation schedules.
- Develop intensity through interaction, harmonic motion, phrasing, and transformation rather than stacking every instrument.
- Preserve continuity across changes: rhythmic, melodic, harmonic, timbral, or even deliberate negative space.
- Evaluate with listening, not only with a mechanically valid score. The metaphor must produce better music.

## Context

This followed several local orchestral studies. The listener found the earlier study fragmented, disliked the brass, and questioned the habit of throwing all instruments into the arrangement at once. *Outer Wilds*' intimate opening suggested a different approach: a musical world with a subtle underlying substrate and emergent voices.

## Page specification — Theory / 001: The Universe Laboratory

**Status:** Specified, not implemented. Build within the existing single-page JIT Music shell; do not create a separate standalone HTML page.

### Purpose

An interactive musical universe assembled by toggling autonomous, overlapping phenomena. **Not a conventional mixer or sequencer.** Each switch controls a musical process, not a prerecorded song section. The listener explores emergence, inheritance, and musical continuity.

### Interface

- Mobile-first, single viewport, no parent-page scroll.
- Title: **THEORY / 001**; subtitle: **Emergent composition laboratory**.
- Six independently operable toggle rows. Each has an icon, short name, one-sentence description, and clear on/off state.
- Show the number of active phenomena and a **Silence all** action.
- Initially enable **CMB** only. Do not autoplay: mobile audio starts only after a user gesture; the initial enabled state is a *requested* state until audio is unlocked.
- A gentle fade-in/out on toggle changes. No intrusive decorative controls.
- Preserve existing JIT Music experiences and their independent audio lifecycles.

### Phenomena

| Toggle | Description | Audible contribution |
|---|---|---|
| CMB | A faint, persistent harmonic substrate | Extremely soft, slowly evolving drone and subtle beating |
| Fluctuations | Small disturbances and wandering tones | Sparse delicate pitches arising within the harmonic field |
| Attraction | Notes pull toward harmonic destinations | Suspensions, passing tones, tension and resolution |
| Structure | Recognizable motifs begin to recur | A melodic figure that develops instead of mechanically looping |
| Ignition | Distinct instrumental voices emerge | One expressive, restrained instrumental voice |
| Interaction | Voices answer, overlap, and transform | A second voice that listens and responds rather than merely doubles |

### Playback and timing contract

1. **ON:** Start the selected process in the shared musical universe, with a short audible fade-in after audio is unlocked.
2. **OFF:** Fade out its contribution and **pause its local musical clock**.
3. **ON again:** Resume the same process from its paused local position; do not reset its phrase.
4. **Overlap:** All combinations of the six toggles must work, including any single toggle, all six, or none.
5. **Isolation:** Switching one process must not interrupt or restart another.
6. **Shared context:** Processes may read the same tempo, tonal/harmonic field, and semantic relationships without requiring any other toggle to be enabled.
7. **Silence all:** Pause every process and fade every contribution to silence; individual paused positions remain available for resumption.
8. **Audio lifecycle:** Schedule audio against an audio clock, never inside the render/animation loop. Switching away from Theory must stop or gracefully suspend its audio per the JIT Music shell contract.

**Unresolved design choice:** A toggle should respond audibly almost immediately (gentle fade), while its underlying musical structure may emerge gradually. Validate by listening.

### Musical constraints for the first implementation

- No brass, no percussion, no automatic wall-of-sound crescendo.
- Favor strings, harp, and potentially woodwinds, but avoid adding instruments without a specific relational function.
- The substrate should remain present beneath later phenomena, when CMB is enabled.
- Every new voice must inherit a rhythm, interval, harmonic relation, timbre, or deliberate silence from the universe already established.
- Make each individual process interesting enough to audition alone, and each pairing musically coherent.
- Musical coherence and listener response matter more than mechanical correctness.

### Acceptance tests

- Each of six toggles produces a distinguishable audible process on its own.
- Toggle OFF → ON preserves the process's phrase position.
- Switching one toggle does not cause clicks, restart another, or interrupt the shared audio engine.
- Any combination, including all six, can play without clipping or masking everything into noise.
- All-off is silent; navigating away does not leave orphaned audio.
- On mobile, the first user interaction unlocks audio without unsolicited autoplay.
- The listening test: does adding a process feel like a relationship emerging rather than another instrument being piled on?

### Origin

Specified in conversation immediately after the **Music as a Universe** theory. User: “So now let's spec the page we'll build for theory. It'll be a series of toggles that can all overlap. When on, they play, when off, they pause.” The design above captures the proposed six-process interface and its timing contract.


---

## Turn pair — Music as particles, waves, fields, maps, and volumes (2026-10-26)

**User**

> We should treat music like particles and waves affected by fields and maps in a volume (or lack thereof).

**Assistant**

Yes. **Music as a dynamical system rather than a sequence of notes.**

This connects to the observation about growing trees: topology can anchor populations, propagate fields, and change the behavior of everything living on it. A musical universe can work the same way.

### The musical field

| Primitive | Musical interpretation |
| --- | --- |
| **Particles** | Notes, attacks, plucks, breaths, percussive events |
| **Waves** | Sustained tones, vibrato, resonance, rhythmic oscillations |
| **Fields** | Tonality, harmonic attraction, tension, rhythmic gravity |
| **Maps** | Instrument timbre, articulation, musical topology |
| **Volumes** | Rooms, acoustic environments, spatial relationships |
| **Boundaries** | Reflection, absorption, resonance, silence |
| **Agents** | Musicians that respond to the fields and each other |

**Sound waves are physical; harmonic attraction is a compositional metaphor.** Model both without conflating them: a harmonic field governs musical choices; an acoustic field governs propagation of the resulting sound.

### The Kesh as a field experiment

Imagine the melody as a moving trajectory through a tonal landscape. Its notes are not merely independently scheduled objects: they manifest a musical path, with rhythm, articulation, and phrasing arising from the trajectory.

A fiddle and flute can follow the same path but interpret it differently through their instrument maps and performer dynamics.

Introduce a pub: its volume modifies propagation; performers hear each other through the environment; timing and dynamics respond to one another. The music becomes a coupled system.

**The volume can also be absent.** Run the same music in an abstract acoustic space without walls, reverberation, or simulated audience.

### Multiple resolutions

- A high-level harmonic field governs where musical motion tends to go.
- A performer model governs how a musician follows or resists that motion.
- An instrument model translates performance into sound.
- An acoustic volume transforms sound before it reaches the listener.

This is tractable on a phone without simulating every molecule of air or every vibrating string.

The more powerful operation is not simply *add an instrument*, but:

> **Introduce a field. Observe what the existing music does in response.**

A tension field pulls toward unresolved intervals. A rhythmic field makes musicians lean into a jig's pulse. A spatial field encourages a performer to answer another across the room. The music changes because its world changes.

**Next experimental direction:** a small executable musical world with **The Kesh** as its first recognizable inhabitant—not a particle visualization that happens to make sounds, but a musical simulation whose state produces the performance.

**Status:** conceptual turn pair captured; not an implementation claim.


---

## Experience 005 specification — Musical ECS / Conditions, Not Events (2026-10-26)

**Status:** Specified only. Do not implement until requested. Preserve experiences 001–004 and the single-page navigation contract.

### Origin and hypothesis

Experience 004 established an important asymmetry: changing **Pulse** transforms the entire performance, while Harmonic Gravity, Performer Coupling, and Acoustic Volume are barely perceptible. Pulse acts structurally on the timing of all events; the others currently act mostly as decorations, thresholds, or quiet effects.

**Hypothesis:** A musical Entity–Component–System (ECS) world can make composition, performance, and acoustics emergent consequences of shared state. The user specifies **conditions** (fields, populations, topology), not a stream of notes. The resulting sound should change audibly when the conditions change, even at fixed tempo.

This is an architectural experiment, not a claim that ECS itself guarantees musicality or acoustic realism.

### Design constraints

1. One page, one new navigable **05 · Musical ECS** panel in `jit/music/index.html`. No separate site.
2. Mobile-first, no parent-page scrolling, no autoplay; audio begins on user gesture.
3. Preserve all previous experiences and stop/fade 005 when navigating away.
4. Audio events must be scheduled ahead against `AudioContext.currentTime`, **never synthesized or scheduled in the visual render loop**.
5. Keep 005 self-contained and computationally modest; no network or external sound assets required for the first prototype.
6. Retain a recognizable musical seed (The Kesh's 6/8 trajectory) as an **initial condition / reference attractor**, not an immutable playlist.
7. Avoid fake physics: distinguish actual acoustic wave propagation from abstract tonal and rhythmic potential fields.

### World model

**Entities** are stable identities, not hard-coded oscillator instances:

- **Performers:** lead fiddle, responding flute, plucked accompaniment; each can listen and react.
- **Motifs:** reusable musical trajectories with ancestry, tension, and phrase position.
- **Events:** transient note attacks, releases, breaths, plucks, and accents.
- **Sources / resonators / boundaries:** optional spatial objects affecting sound and performer feedback.
- **Field emitters:** tonal centers, pulse sources, rhythmic accents, tension sources.

**Components** are composable data:

| Component | Example state |
| --- | --- |
| `Transform` | Position, orientation, optional volume membership |
| `Phase` | Rhythmic phase, local tempo, phase velocity |
| `PitchState` | Continuous pitch, target pitch, velocity, tonal confidence |
| `Energy` | Loudness, breath/bow capacity, excitation, decay |
| `Memory` | Recent motifs, intervals, accents, heard events |
| `InstrumentMap` | Fiddle/flute/pluck response, articulation, register |
| `Listening` | Sensitivity, latency, attention, neighbor weights |
| `Motif` | Contour, phrase boundaries, ancestry, variation constraints |
| `Boundary` | Reflection, absorption, delay, openness |
| `FieldResponse` | Coupling coefficients for each system |

**Systems** operate on compatible components, independent of how many entities exist:

1. **Pulse / synchronization:** advances rhythmic phase; phase coupling allows entrainment, swing, hesitation, and independent clocks.
2. **Harmonic attraction:** evolves pitch targets and tension continuously under a tonal potential, with bounded deviations that preserve melodic identity.
3. **Listening / interaction:** performers observe neighbors through latency, distance, attention, and memory; they can imitate, answer, harmonize, or diverge.
4. **Motif inheritance:** new phrases inherit contour, rhythm, interval, or silence from prior phrases; transformations are traceable.
5. **Excitation / articulation:** energy and instrument maps produce attacks, sustains, releases, and noise appropriate to each performer.
6. **Acoustic propagation:** dry output and optional spatial/reflection model; acoustic feedback can alter what performers hear.
7. **Event extraction / audio scheduling:** converts state transitions into bounded, timestamped audio instructions.
8. **Observation:** exposes live state and measurable system effects without controlling audio timing.

### Update order and clocks

```text
User gesture → AudioContext unlock
Fixed simulation tick (e.g. 30–60 Hz; deterministic seed)
  → sample external field settings
  → evolve pulse and harmonic state
  → propagate heard events / acoustic feedback
  → update performer attention, memory, and phase
  → update motif and pitch trajectories
  → emit timestamped attack/release/articulation events
Audio scheduler (short lookahead, AudioContext clock)
  → render events with per-performer instrument maps
Visualization (requestAnimationFrame)
  → observe snapshots only; never drive audio
```

Simulation and audio clocks must be reconciled explicitly: bounded scheduling lookahead, no scheduling in the past, predictable stop/cancel behavior, and no orphaned sound on navigation. Deterministic seeds permit A/B listening comparisons.

### The experiment's controls

**Keep pulse fixed for the primary listening test.** Expose a small set of structural interventions:

- **Gravity (0–100%)**: from weak harmonic preference to strong, continuous tonal attraction. Affects pitch motion, tension, resolution, and phrase boundaries—not occasional threshold-based substitutions.
- **Coupling (0–100%)**: from independent performers to shared phase, listening, imitation, and call-and-response. At zero, agents do not borrow one another's events. At maximum, they strongly coordinate without becoming identical copies.
- **Topology / proximity**: move performers or alter connections in the listening graph. Changes who hears whom, when, and with what influence.
- **Volume / boundaries**: unbounded/dry at zero; progressively reflective space with audible propagation delay, filtering, and feedback into performer listening. Separate acoustic wetness from agent responsiveness in the internal model.
- **Pulse**: retain as an explicit reference/control variable, but do not use tempo changes to mask weak field effects.

Prefer a compact interactive world visualization (nodes, edges, field contours, transient events) to decorative particle motion. Every visual feature should correspond to actual simulation state.

### Interactions and invariants

- Fields may interact: volume changes hearing; hearing changes coupling; coupling alters rhythmic synchronization and harmonic decisions.
- The melody remains recognizable across a useful range of settings, while its **performance relationships** change substantially.
- Muting a performer removes its acoustic contribution and its influence on listening only when explicitly configured; avoid ambiguous semantics.
- Removing the acoustic volume must not remove musical structure.
- No slider dead zones: every substantial movement must produce a measurable state change, though not necessarily an immediate note.
- Instrument realism is secondary to convincing **interaction**. Do not add more instruments to conceal weak dynamics.
- Sound should remain bounded: no runaway feedback, clipping, excessive voices, or accumulated nodes.

### Acceptance tests

1. **Fixed pulse, one field at a time:** sweep Gravity, Coupling, Topology, and Volume from low to high. Each must cause a distinct, unmistakable musical change without breaking the jig.
2. **Causality:** changing a connection between two performers changes their interaction, not just their stereo positions.
3. **Volume off:** zero boundaries/wetness produces dry sound while performers continue independently of acoustic reflections.
4. **Ancestry:** identify a recognizable motif inherited and transformed by a second performer.
5. **Reproducibility:** identical seed and controls produce comparable event traces; differences can be attributed to field interventions.
6. **Observability:** show current phase, pitch attraction, listening edges, and event counts or a compact diagnostic snapshot.
7. **Lifecycle:** no unsolicited audio, no audible tails after stop/navigation, no duplicate schedulers after rapid play/stop.
8. **Performance:** usable on a phone; visual frame rate and audio scheduler remain independent.

### First implementation slice

Build the smallest credible world: **two performers, one motif, one pulse source, one tonal attractor, and an optional reflective boundary**. Establish fixed-pulse A/B listening before adding a third performer, elaborate room modeling, or richer instruments.

**Success criterion:** the listener hears the world responding to changed conditions—not merely a fixed song with new effects layered on top.

### Research orientation

Adjacent lines of work include agent-based generative music, coupled oscillators / swarmalators, interactive sonification, algorithmic composition, and game-audio ECS architectures. Treat these as inspirations, not proof that a canonical musical ECS architecture already exists. Validate individual sources before turning them into implementation dependencies.


---

## Experience 006 — The Musical Tree (2026-10-26)

**Origin:** After experiences 004–005, the listener reported that gravity and performer distance had little audible effect, and that music ought to be as mathematically tractable as growing and pruning a tree. This is a change of primitive, not an attempt to repair the ECS sliders.

### Hypothesis

**Music is a recursively transformable relational structure.** A short musical seed (ordered pitch intervals, durations, and rests) can grow into recognizable variations through a small algebra of operations. Tree structure is the compositional source of truth; the synthesizer is a renderer. No simulated performers, spatial physics, or ornamental field controls are necessary.

### Minimal grammar

- **Seed:** an audible two-bar motif with interval, duration, and rest data.
- **Grow:** append a child phrase inheriting the parent motif with a deterministic variation.
- **Branch:** add a sibling phrase; siblings may play as successive phrases or simultaneous counterpoint.
- **Prune:** remove a chosen subtree and its scheduled descendants.
- **Graft:** copy a chosen phrase into another parent and transpose or rhythmically transform it.
- **Transform:** apply a concrete operator: transpose, invert intervals, augment/diminish duration, retrograde, ornament, or introduce rests.
- **Repeat:** reuse a subtree without copying its definition.

The prototype needs only **Grow**, **Prune**, **Transform**, and **Reset**, with optional **Graft** if the first three work. Avoid speculative knobs.

### Data and invariants

```text
Motif = { intervals: number[], durations: number[], rests?: boolean[] }
Node  = { id, parentId, children[], motif, operation, depth, voice }
Tree  = { rootId, nodes, selectedId, seed }
```

A node's audible phrase must derive from its parent's phrase and recorded operation. Parent-child relationships must be visible and inspectable. Tree growth and pruning must change the **actual sequence of scheduled notes**, not just a visualization. Cap tree size/depth and polyphony. Seed and operation sequence should be reproducible.

### Musical interpretation

Depth can map to phrase scale; siblings can be ordered as variations; an explicit counterpoint operation can turn a branch into a second voice. Harmony is a relationship between simultaneous phrases; rhythm is nested duration. Preserve a clear tonal center and recognizable contour so structural complexity remains listenable. Silence is a first-class musical event.

### UX and implementation

Add **06 · Musical Tree** to the existing JIT Music page. Render an interactive branching tree where nodes correspond to phrases. Tap a node to select it; **Grow** creates an audible descendant, **Prune** removes a selected non-root subtree, **Transform** cycles a meaningful variation, **Reset** restores the seed. **Play / Stop** schedules the current tree as a finite, looping passage via Web Audio with lookahead scheduling independent of `requestAnimationFrame`. Never schedule music in the render loop. User gesture unlocks audio; switching experiences stops playback. Keep all earlier experiences untouched.

### Acceptance tests

1. Play root alone: a short recognizable phrase.
2. Grow: the performance becomes longer or acquires a distinct related phrase, with a visible branch.
3. Transform: the selected phrase audibly changes in a mathematically identifiable way.
4. Prune: the branch and its notes disappear; root cannot be pruned.
5. Reset: exact seed and structure return.
6. Repeated operations do not create runaway notes, audio tails, duplicate timers, or broken navigation.
7. On a phone, the diagram and controls remain legible and touch-operable.

**Success:** growing, transforming, and pruning the tree are immediately audible and causally legible. Musicality is judged by listening, not by the number of implemented operators.


---

## Experience 007 — Three Spectra / The String Instrument (2026-10-27)

**Origin:** A note is not a distinct object; pitch is a continuous position on a logarithmic frequency spectrum. Deforming a sustained note with smooth noise is analogous to deforming a height field. Instead of constructing a composer or a note-event list, begin with **three independently vibrating strings** and a minimal vocabulary of gestures: slide, hammer-on, pull-off, mute. The user referenced Tool as a musical direction: interlocking, recurring rhythmic cells and expressive tension, **not** imitation of a specific recording.

### Hypothesis

A small number of continuous, resonant trajectories with memory and mutual influence can sound musically alive without discrete note scheduling. **Pitch is a coordinate; excitation is an event; vibration persists.** Continuous sound synthesis is the instrument. A gesture changes a string's state, not a playlist.

### Mathematical model

For each string \(i\), track continuous log-pitch \(p_i\), target \(u_i\), velocity \(v_i\), energy \(e_i\), and phase \(\phi_i\). Frequencies use \(f_i = 440\cdot 2^{(p_i-69)/12}\). Dynamics:

- Slide: a continuous target displacement with damped spring response \(\dot p_i=v_i,\ \dot v_i=k(u_i-p_i)-cv_i\).
- Hammer-on: raise target and inject a sharp excitation impulse, while the oscillator **never restarts**.
- Pull-off: lower target, release a softer excitation, and preserve residual energy.
- Mute: rapidly damp energy and remove ongoing sustain.
- Energy: decays according to damping and is renewed by touch; no indefinitely loud oscillator.
- Smooth deformation: band-limited slow drift/noise of pitch, amplitude, or timbre, with explicit bounded amplitude.
- Resonance: shared low-gain sympathetic coupling between strings, driven by proximity to simple frequency ratios; bounded so it cannot self-excite without input.

The model is **an expressive synthesizer**, not a physical string simulation. Its acoustic waveforms and harmonic partials are real audio; its sympathetic resonance is an approximation.

### Interface

Add **07 · Three Spectra** to the existing single-page JIT Music. Show three horizontal pitch tracks. Touch or drag along a track to **slide** its string; quick tap above its current position is a **hammer-on**, below is a **pull-off**; provide explicit Hammer, Pull, and Mute buttons for discoverability and accessibility. The strings are tuned to a coherent low-register interval relationship (e.g. D2–A2–D3). Touching a string excites it; dragging continuously changes its target frequency. Each string shows its current pitch and energy. A subtle waveform/trajectory trace must correspond to actual state.

Controls: **Awaken / Stop**, a **Damping** slider, and a **Drift** slider. Optionally a **Pulse** toggle for recurring accents, but first version should work without a metronome or predetermined melody. A visible **3 ↔ 6 strings** switch is a later extension, not required for 007.

### Architecture

- A single AudioContext unlocked by user gesture.
- Three persistent oscillator banks (fundamental plus a few partials) with continuous frequency and gain automation; **never create one oscillator per note**.
- A control-rate simulation/update interval (or AudioWorklet if warranted), independent of animation; audio-time-based smoothing prevents zipper noise.
- Visual animation reads string state and never drives oscillator scheduling.
- Stop and navigation mute/disconnect safely, prevent duplicated oscillators/timers; restart cleanly.
- Touch input and drag gestures work on mobile; no page scroll interference within the instrument.

### Acceptance tests

1. Awakening the instrument yields silence until excitation.
2. Slide produces an uninterrupted glide without reattacks or gaps.
3. Hammer-on creates a distinctly sharper rising attack; pull-off descends and retains audible decay.
4. Mute immediately damps the chosen string.
5. With no new input, vibration decays naturally; increasing damping shortens sustain.
6. Drift creates subtle, smooth variation, not random note jumps.
7. Exciting one string can subtly influence another when harmonic relationships are close; no runaway feedback.
8. Three strings can be played in overlapping gestures; moving one does not restart the others.
9. Rapid navigation and repeated play/stop do not leak audio or timers.
10. Musicality is assessed by listening, not inferred from code. The reference to Tool is about relational rhythm and gesture, not a claim to reproduce the band's sound.

**Success:** the listener feels that they are touching a persistent vibrating system, rather than triggering samples or stepping through a score.


---

## Experience 008 — Three-String Lute / Minor Strum Stick (2026-10-27)

**Intent:** A direct, playable touchscreen instrument, not a generative toy. Three independent strings, a strum-stick-style diatonic fretboard, and a separate soundboard. The player can **hold a fret on one string while another finger strums across all three**, with immediate hammer-on and pull-off articulations. Multitouch is essential.

### Tuning

The request referenced D–A–D and dropping a string to make the open strum minor. Simply lowering D to C gives C–A–D, which **does not** contain the minor third F. Use **D–A–F** (low to high; D3/A3/F4) as a playable D-minor triad, and label the actual pitches clearly. This changes the upper D to F rather than lowering the lowest D; treat it as a pragmatic initial interpretation, subject to the player's ear.

### Fretting and touch semantics

- Show three **separate strings** across a diatonic fretboard, open position at the nut, with scale-based frets analogous to a strum stick. Frets per string correspond to D-natural-minor scale steps across an octave: 0, 2, 3, 5, 7, 8, 10, 12 semitones; a chosen fret offsets the individual string's open pitch. Label positions and current notes.
- **One finger can fret one string**. Pointerdown in a fret region selects that string's fret; pointermove to a higher fret while held creates an audible hammer-on, and to a lower fret a pull-off. Pointerup releases to open, sounding a pull-off if the string was fretted and vibrating.
- The soundboard is a **separate hit surface**. A pointer sweeping vertically through the three string lanes plucks them in order; the opposite direction reverses the strum. A tap plucks a single lane. Do not retrigger repeatedly while dwelling within the same lane.
- Multiple independent pointer IDs: one or more fingers can remain fretting while another pointer strums. No global drag state that conflates pointers.
- Open strings ring when strummed; fretting does not require a strum to select pitch, but hammer-on/pull-off on an already vibrating string changes pitch with a short articulated excitation.
- Sound decays naturally. Stop/navigation silence all voices. Never schedule audio from canvas rendering.

### Synthesis

Use Web Audio plucked-string-like voices with decaying harmonic partials, a small transient and resonant body filtering. A string retains its current sounding energy and pitch when its fret changes; new strums excite its current fretted pitch. Avoid uncontrolled feedback, infinite sustain, and the overly broad pitch glides of experience 007. Three strings must be independently polyphonic, with overlapping decay.

### Acceptance

1. Open downward strum sounds a clearly minor triad.
2. Fretting one string alters only that string.
3. Hold a fret with one pointer and strum with another; pitch selection remains stable.
4. Hammer-on and pull-off are distinct and audible while a string rings.
5. Releasing a fret returns the string to open without requiring a new strum.
6. Opposite strum directions produce opposite note orders; one sweep plucks each crossed string once.
7. Repeated taps, pointer cancellation, navigation, and stop do not leave hanging voices.
8. Mobile-first layout keeps the fretboard and soundboard large enough for finger use.

**Success:** playable touch mechanics and convincing minor resonance, not an autonomous composition system.


---

## Experience 009 — Baba Yaga's Dancing Hut / A Harmonic Minor Harp (2026-10-27)

**Unlock:** Construct a playable instrument with a limited, coherent pitch topology, then let a score **play that instrument programmatically**. A strumstick, harp, or harmonica is an instrument model and gesture vocabulary, not a generic oscillator pretending to be a musician. Experience 009 uses a small **A harmonic minor harp** (A B C D E F G♯), including its distinctive raised seventh, to perform an original, darkly playful dance for Baba Yaga's hut. The reference is folklore and mood; do not copy a specific existing composition.

### Instrument

- 15 harp strings spanning A2–A4 with notes **A2 B2 C3 D3 E3 F3 G♯3 A3 B3 C4 D4 E4 F4 G♯4 A4**.
- Every pitch is a physical/virtual string with its own resonance and pluck response. There is no chromatic note allocation: the harp's tuning constrains the composition.
- Gestures: **pluck(string, velocity, time)**, **sweep(strings, direction, spacing, time)**, **damp(string, time)**. A sweep is a scheduled series of actual plucks, not a new synthesized chord sound.
- Web Audio plucked partials and envelopes, stereo placement, body filtering, finite voice count, no samples or network assets.

### Original composition / performance

A repeating, intentionally arranged dance with four contrasting sections: **stalking footsteps**, **crooked ascent**, **the hut spins**, and **landing on its feet**. Distinct rhythmic accents and rests; low-string ostinato, upper-string melody, periodic broken-chord sweeps. Use an asymmetric rhythmic cell (e.g. 3+2+2 eighth-note groups) to make the hut lurch and dance; do not rely on random pitch selection. A harmonic minor's G♯ should pull strongly to A, particularly at cadences. Reprise motifs with transformations, not stochastic wandering. Use a finite looping 4-section score and a visible phrase indicator.

### UI and lifecycle

Add **09 · Baba Yaga's Harp** to the existing single-page JIT Music. Show a compact 15-string harp visualizer, current plucks and active phrase, Play / Stop and a tempo control. The strings should also be tappable for manual plucking while the automated performance plays, demonstrating the same instrument engine. Programmatic plucks are scheduled ahead on \`AudioContext.currentTime\`, never inside \`requestAnimationFrame\`. Navigation stops and silences the experience; prevent duplicate schedulers and orphaned voices.

### Acceptance

1. Open notes are exactly A harmonic minor, including G♯ (not G).
2. The original tune has an audible melodic contour, asymmetric dance pulse, repeating motifs, and harmonic resolution.
3. All generated music is played through the same harp pluck function as manual touches.
4. String sweep order and timing are audible; overlapping resonances decay naturally.
5. Tempo changes affect scheduling without pitch changes.
6. Play, stop, and navigation work reliably on mobile without stray sound.
7. The tune should evoke a dancing, slightly menacing wooden hut; verify by listening rather than claiming the implementation automatically achieves it.

**Principle:** First build an instrument that makes coherent gestures possible. Then compose *for that instrument*.


---

## Muse — Two Steps from Hell (2026-10-27)

**Question:** Now that the instrument is the primitive and a program can play it, how do we move from Baba Yaga's little dancing hut to the scale, momentum, and emotional force associated with *Two Steps from Hell*? This is an aesthetic ambition, not a request to reproduce a particular copyrighted recording or composition.

### The key is not a bigger synthesizer

Experience 009 demonstrates a **playable instrument model** and a programmatic performer, but its performance is still a fixed event array. The next unlock is to separate four layers:

1. **Instrument:** What gestures can this thing physically or plausibly make? A harp plucks, sweeps, and damps. A strumstick frets, hammers, pulls, and strums. A harmonica breathes, bends, and articulates. Drums strike and resonate. Voices breathe and sustain.
2. **Performer:** How does an agent turn musical intention into those gestures? Timing, velocity, anticipation, accent, phrasing, breath, fatigue, and recovery. The same score played by different performers should sound different without changing its identity.
3. **Ensemble:** How do performers listen to and respond to one another? Shared pulse, staggered entries, call-and-response, doubled motifs, harmonic tension, and controlled synchronization. An ensemble is not merely 20 copies of one oscillator.
4. **Conductor / dramaturgy:** How does the piece change over time? Withholding, revealing, accumulating, interrupting, suspending, resolving. Dramatic impact comes from **contrast and trajectory**, not permanently maximal volume.

### The route from a hut to a procession

Take the existing A harmonic minor harp dance as a *seed motif*. Preserve its recognizability while transforming its orchestration:

- **I. Bones in the floor:** A single low plucked ostinato, asymmetrical 3+2+2 footsteps, sparse harp melody, ample silence.
- **II. The hut awakens:** Add a low bowed/drone voice and a second instrument answering the harp; widen register without raising overall loudness much.
- **III. The forest moves:** Layer a percussion performer that accents the underlying asymmetric gait; double the motif in a different register and articulation; use counter-rhythm rather than indiscriminate density.
- **IV. The impossible procession:** Introduce a coherent ensemble: low rhythmic ostinato, middle harmonic bed, high melodic line, percussion, and possibly a wordless vocal timbre. Build intensity through **register, density, harmonic motion, and spatial width**, with bounded dynamic range.
- **V. The floor vanishes:** Remove almost everything at the peak; hold a suspended note or leave a breath of silence.
- **VI. The hut lands:** Return the seed motif in a transformed, resolved form, with a decisive cadence exploiting G♯→A.

### The mathematical structure

A performance is a collection of **gesture streams**, not a single monolithic audio file:

\[
G_k=\{(t_j,\ \mathrm{gesture}_j,\ \mathrm{target}_j,\ \mathrm{intensity}_j)\}_{j=1}^{n_k}.
\]

Each instrument exposes a gesture interface. A performer translates a phrase into its own legal gestures. The conductor controls a slow-changing **dramatic envelope**:

\[
D(t)=\{\text{density},\text{register},\text{tension},\text{pulse},\text{space},\text{dynamic}\}.
\]

These dimensions are related but **not identical**. More instruments does not automatically mean louder; a louder passage does not automatically mean more tense; a slower passage can feel enormous.

The seed motif can be represented as a small relational structure—rhythmic offsets, interval contour, accents, and harmonic function—so that it survives transposition, doubling, augmentation, and orchestration. **Recognition across transformation** is the engine of emotional payoff.

### What to build next

**Experience 010 — The Procession.** Keep the 009 harp as a performer. Add just **two more genuine instruments** first: a bowed low-string/drone voice and a drum with an intentional strike vocabulary. Give all three performers the same asymmetric pulse, but different roles. Program a 90–150-second dramatic arc with audible withholding, escalation, rupture, and return. Only after that works should we add choir, brass-like calls, or a larger orchestra.

Expose a compact score/gesture log so that the system is observable. Let the listener solo or mute performers to hear why each exists. Schedule against AudioContext time; visuals observe, never drive music. Verify by listening.

### Tests that matter

- Can the original Baba Yaga motif still be recognized when the ensemble swells?
- Can removing one performer demonstrably weaken or alter the arrangement?
- Does the piece get *larger* without simply becoming louder?
- Is there an audible dramatic arc rather than an endless loop?
- Does the silence before the return have expressive purpose?
- Does the ending feel earned?

**Thesis:** To get two steps from hell, don't add two hundred instruments. Give three instruments something worth saying, teach them to listen, and let the conductor know when to be silent.
