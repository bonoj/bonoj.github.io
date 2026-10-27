# JIT Music — Single-Page Laboratory

Canonical live entrypoint: https://bonoj.github.io/jit/music/

## Contract
- **One application, one browser page** at `jit/music/index.html`. New experiences are navigable *inside* this page, not new standalone HTML pages.
- Navigation selects an experience; it does not navigate away or reload the page. Keep each experience's controls and audio lifecycle isolated. When switching experiences, stop or gracefully fade the previous experience.
- Mobile-first: fit the viewport, keep parent page from scrolling, let the experience panel scroll if necessary. Audio requires a user gesture.
- Preserve the ability to play, stop, and tune each experience. Avoid unsolicited audio on load.
- Keep source and README current. Do not claim live smoke-test verification from a GitHub write alone.

## Experience registry
| ID | Name | State | Purpose |
| --- | --- | --- | --- |
| 001 | Sustain Laboratory | Implemented | Bowed strings, glass, flute; duration 0.5–8s, overlap 0–90%; autonomous harmonic passage and waveform |

## Initial experiment
Port of the in-chat Sustain Laboratory, preserving the three timbres, harmonic progression, sliders, and play/stop behavior. It uses additive oscillators and envelope shaping—not physically calibrated instruments or recordings. Notes are deliberately extended and overlapped to test whether continuity improves musicality.

## Next experiments
Add future experiences as navigable entries in the same shell; no additional experiment is authorized yet.
