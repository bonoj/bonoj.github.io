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
| 006 | The Musical Tree | Selectable phrase tree; Grow, Transform, Prune, Reset; live Web Audio playback of inherited musical variations |
| 007 | Three Spectra | Three persistent vibrating voices with slide, hammer-on, pull-off, mute, damping, drift and subtle sympathetic resonance |
| 008 | Three-String Minor Lute | D–A–F open D minor, diatonic touch fretboard, independent multitouch strumming soundboard, hammer-on and pull-off |
| 009 | Baba Yaga’s Harp | Fifteen-string A harmonic minor harp, manual plucks and sweeps, four-section original crooked dance played through the instrument |
| 010 | The Impossible Procession | Six-act composed dramatic arc for harp, bowed strings, and ritual drums; performer mute controls |

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

## Experience 006 — The Musical Tree

Theory and acceptance tests are specified in `THEORY.md`. The implementation is a bounded 12-phrase tree: nodes hold inherited and transformed 12-event motifs, rendered in depth-first phrase order. Grow adds a related child, Transform applies a deterministic pitch/rhythm-rest operation to the selected node, Prune deletes the selected non-root subtree, and Reset restores the original seed. The audio scheduler uses `AudioContext.currentTime` and a lookahead interval, not the canvas animation loop. This first slice does not yet implement simultaneous counterpoint or grafting. Public Pages deployment and audio quality still require direct listening verification. Source commit `045a9e5167c4ff11f2b16bbf1353b9ebccfc7a57`.

## Experience 007 — Three Spectra

Specification and acceptance tests are in `THEORY.md`. The initial implementation provides three persistent Web Audio oscillator banks (D2/A2/D3), pitch glide driven by spring-like state, per-string excitation and decay, and small ratio-dependent sympathetic energy transfer. The AudioContext-clock update interval is separate from the canvas visual loop; there is no note-event sequencer. Touch/drag on each of three tracks, plus explicit Hammer, Pull, Mute, and Excite All controls. A touch excites a voice and moves its pitch target; the explicit gesture buttons guarantee discoverable hammer/pull semantics. No autoplay. Source commit `cfc0983c8f8d8c171b161352ac9bc4d6cd506411`. Public Pages deployment, gesture feel, and audio quality remain unverified until live listening.

## Experience 008 — Three-String Minor Lute

Specification and tuning rationale are in `THEORY.md`. The open pitches are D3/A3/F4 (D minor); this is an interpretation of the user's DAD-to-minor request, since simply lowering a D in DAD does not produce a D minor triad. Three touch-frettable strings use D-natural-minor offsets 0,2,3,5,7,8,10,12. Neck and soundboard are separate canvases with per-pointer tracking, so one pointer can fret while another strums. Sliding a held finger to a new fret retunes ringing partials and creates a small hammer/pull excitation. Strumming across soundboard lanes triggers them in traversal order. A direct strum button and mute button are also provided. Source commit `6d73162030260f49845cb5ea2d740075195539f3`. Source committed; public Pages deployment and live musical quality unverified.

## Experience 009 — Baba Yaga’s Dancing Hut

The core design is instrument-first: a 15-string A harmonic minor harp (A2 to A4 with G♯), with pluck and sweep gestures shared between manual input and the programmed performance. The original four-section, 3+2+2-accented dance uses a repeating low ostinato, upper melody, and arpeggiated sweeps. Each event is scheduled against AudioContext time in a lookahead scheduler; canvas animation only visualizes string excitation. Tap or drag across harp strings to play them manually. Tempo is adjustable; Stop and navigation mute scheduled voice envelopes. See `THEORY.md` for specification and acceptance criteria. Source commit `5b5b8687d3ce1092e56d8e8000242cda88b8429a`. Source committed; public Pages and actual listening quality unverified.

## Experience 010 — The Impossible Procession

Implements the instrument–performer–ensemble–conductor theory recorded in `THEORY.md`. A six-act, approximately 95-second composed performance uses distinct Web Audio harp plucks, bowed string tones, and drum strikes. The acts move from isolated footsteps through awakening, forest movement, an expanded procession, a near-silent rupture, and a return. Each role can be toggled independently; scheduled events use AudioContext time and a lookahead timer, while canvas rendering observes state only. This is a first synthesis/arrangement experiment, not a sampled orchestra. Source commit `d6de77a0b2a40efadd95d4b4ee272a2a246a0e51`. Public Pages deployment and actual musical quality remain unverified until listening.


## Cold handoff: playable lute discovery (2026-10-27)

Experience 008 is the reference instrument. The user played a recognizable Schism riff with two thumbs: right thumb tapping the strum soundboard for attacks, left thumb selecting frets 3, 2, 5 and then 7, 10, 7, 12, with open strings between. This worked on bottom and top strings. Fretting slides were also useful. The interface was clunky, but deliberate performance was possible.

The key architectural insight is independent fretting and excitation gesture streams. A future programmatic performer should operate the same instrument controls as a human, rather than bypassing the instrument to emit generic note events. Preserve 008. Experience 009 was playful and showed instrument-first composition; 010 lacked that playfulness and had audible fuzz. The 010 bowed sawtooth is a possible source of buzz, but its deeper shortcoming is that it arranged synthetic sounds before developing convincing instrumental performance.

Next possible experiment, only when requested: capture a small two-hand gesture score and have a program play an 008-like instrument, including open notes, slides, hammer-ons and rhythmic plucks. Do not modify 008 merely for polish. This is a cold handoff, not an implementation request. Existing repository boundaries remain in force.
