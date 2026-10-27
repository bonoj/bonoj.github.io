# JIT Music — Single-Page Laboratory

Canonical entrypoint: https://bonoj.github.io/jit/music/

## Contract

- One browser page at `jit/music/index.html`; experiences navigate inside it.
- Mobile-first, viewport-fitted; scroll inside the panel only.
- No autoplay; Web Audio begins on a user gesture.
- Stop or fade audio on switching experiments; preserve the other experiences.
- Do not equate a GitHub commit with verified public deployment.
- Gate is not to be touched without explicit user authorization.

## Current experience registry

| ID | Experience | Implementation |
| --- | --- | --- |
| 001 | Sustain Laboratory | Evolving sustained tones, voice selection, duration and overlap |
| 002 | The Ruined Orchestra | Procedural instrumental bodies and synthetic stone hall, Flesh / Distance / Stone |
| 003 | Theory — The Universe Laboratory | Six independently toggled musical processes: CMB, Fluctuations, Attraction, Structure, Ignition, Interaction |
| 004 | The Kesh — Field Music | Runtime 6/8 jig; melodic trajectory and responding performers under harmonic, coupling, rhythmic, and acoustic fields |
| 005 | Musical ECS | Two draggable performers, evolving pitch and phase states, harmonic gravity, coupling through a listening edge, optional acoustic boundary |

## Experience 004 — Field Music

**Hypothesis:** Treat music as particles, waves, and agents influenced by fields and maps, optionally inhabiting a reflective volume. A musical world should transform its performance when its fields change, rather than merely mixing preexisting recordings.

- **Trajectory:** a repeated AABB-style jig contour inspired by The Kesh, scheduled on the AudioContext clock.
- **Particles / waves:** timed attacks, plucked decays, sustained fiddle-like and flute-like synthesized voices.
- **Harmonic gravity:** tonal center and phrase-end pitch attraction; stronger settings can alter the melody.
- **Performer coupling:** a second performer inherits and responds to melodic events, with timing and dynamic changes.
- **Acoustic volume:** short coupled feedback delays model reflections; zero disables wet signal (unbounded space).
- **Pulse:** adjusts the shared rhythmic field, retaining the 6/8 grouping.
- **Visualization:** a low-cost canvas representation of the fields, deliberately decoupled from audio scheduling.

No prerecorded audio and no external soundfont are used. Instrument models are approximations and do not yet meet the acoustic realism of the approved Kesh MP3. The melodic contour is a study, not a certified transcription.

**Acceptance test:** On a phone, play 004 and vary each control independently. Does changing the field produce an audible relational transformation? Does it preserve a continuous jig? Does switching away silence it? Can acoustic volume reach zero? Evaluate by listening, not by code validity alone.

**Theory:** [THEORY.md](THEORY.md).

## Deployment

Source commit for experience 004: `8c2c45660a575a5012e183f38cb930513b6ec8aa`. This records a source write, not a verified Pages publish or live audio smoke test.

## Experience 005 — Musical ECS implementation

Source commit: `5c96953c3531f255a7bd5767787dc6fa90b6d7c2`. Fixed pulse 112 BPM; two entities with phase, pitch, velocity, energy, and listening state; field updates and note-event extraction occur in an AudioContext-clock lookahead scheduler. Canvas reads state and handles drag input; it does not schedule audio. Dragging changes the listening graph. No external audio assets. The implementation is a first causal prototype, not a complete deterministic fixed-step ECS engine: event-driven state updates are currently tied to the audio scheduler, and exact reproducibility / mobile listening tests remain outstanding. Verify public Pages and audio separately.
