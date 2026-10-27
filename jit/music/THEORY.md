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
