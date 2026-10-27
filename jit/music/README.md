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
| 001 | Sustain Laboratory | Preserved | Bowed strings, glass, flute; duration 0.5–8s, overlap 0–90%; autonomous harmonic passage and waveform |\n| 002 | The Ruined Orchestra | Implemented | Same progression; five positioned performer voices, coupled bow noise and harmonic drift, filtered instrument body, stereo placement, convolution stone hall; Flesh / Distance / Stone |\n| 003 | Arioch | Implemented prototype | Reed, drone, maqam-inspired intervals, continuous cent inflection |\n| 004 | Karrick | Implemented prototype | Seven-beat hand drums, bowed/plucked ornaments, minor shadow and subdivision density |

## Initial experiment
Port of the in-chat Sustain Laboratory, preserving the three timbres, harmonic progression, sliders, and play/stop behavior. It uses additive oscillators and envelope shaping—not physically calibrated instruments or recordings. Notes are deliberately extended and overlapped to test whether continuity improves musicality.

## Experiment 002\nAdds a second panel to the existing single-page shell. Experiment 001 synthesis and controls remain unchanged. Selecting an experience fades/stops the other. Ruined Orchestra adds a procedural performer layer, band-limited noise, individual timing and pitch deviations, low-pass body coloration, stereo placement and a synthetic convolution impulse response. It is a perceptual prototype, not a calibrated physical model. No external assets.\n\n## Experiments 003–004 — The Bastard Prince
- **003 Arioch:** a procedural reed voice with breath noise, moving harmonics, bowed drone and plucked resonances; Bayati/Rast/Hijaz-inspired interval sets, cent interpolation, visible frequency. These are exploratory approximations, not a faithful maqam performance.
- **004 Karrick:** seven-beat 3+2+2 grouping, drum membrane partials with filtered noise, plucked sympathetic strings, bowed melodic ornaments, adjustable subdivision density and minor coloration. The 7-beat grouping is an original compositional experiment, not a named tala.
- All instruments have shaped attacks, dynamic spectral bodies, friction/breath/noise and releases. Audio events are scheduled against AudioContext time, not the visual animation loop. Each experiment is independently started and stopped on navigation. No external samples.
- Scoring plan: [BASTARD_PRINCE_SCORE.md](BASTARD_PRINCE_SCORE.md).

## Next experiments
Add future experiences as navigable entries in the same shell; do not create new standalone experiment pages.
