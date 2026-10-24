# Observatory · Proposals

Ideas parked for later exploration. **Not active implementation requirements.** The operational contract remains [README](README.md); the acquisition program remains [SPEC](SPEC.md).

## DISSECTION — volumetric time specimens

**Inspiration:** the segmented, suspended anatomical installation in *The Cell* (2000): a succession of separated slices revealing a subject. Replace anatomical slices with transparent **volumetric blocks representing successive moments of simulated time**. The result is a sculptural, navigable four-dimensional scientific specimen: an event dissected through time, not a static object dissected through space.

### Experience
- A pristine white chamber with ~20–30 transparent slabs suspended in sequence. Each slab contains a 3D reconstruction of the same physical system at a distinct instant.
- Move laterally along the slabs to traverse time. Rotate to examine each block's spatial volume. Spread slabs to dilate an event, or compress them to perceive its entire evolution. Tap a slab to inspect the underlying state, observations and uncertainty.
- The installation should feel like a physical museum specimen, not a dashboard: restrained typography, fine edges, generous negative space, material depth and discoverable gestures. Mobile-first interaction must remain practical.
- Possible instrument name: **DISSECTION**.

### Scientific subject
First candidate: a solar-wind disturbance evolving from the near-Sun heliosphere through L1 toward Earth's magnetosphere. Inputs might include delayed Parker Solar Probe FIELDS/SWEAP/ISʘIS/WISPR observations, L1 NOAA SOLAR1/ACE/IMAP plasma and magnetic vectors, GOES particle/magnetic channels, and terrestrial magnetometers/ionospheric observations. Use only actually acquired and validated channels. Other candidate specimens: CME transit, geomagnetic storm, particle injection, magnetic-field rotation, ocean circulation or synthetic sandbox phenomena.

### Model and honesty contract
- L1 spacecraft sample local conditions; they do **not** observe a complete 3D solar-wind volume. The slabs are **simulation/reconstruction**, constrained by sparse measurements, not direct volumetric photographs.
- Label observed samples, derived geometry, simulated states and uncertainty distinctly in diagnostics; visual styling should distinguish constrained regions from extrapolated ones. Never fill gaps with invented measurements passed off as telemetry.
- Parker observations are typically downlinked and released with delay; do not imply they are live. Parker and Earth can be far apart in heliolongitude; compare events only with appropriate orbital geometry, connectivity and uncertainty.
- Any propagation model should state assumptions, reference frames, spatial/temporal resolution, boundary conditions, interpolation limits, and validation against later observations. A convincing sculpture is not proof of a correct physical reconstruction.

### Implementation sketch (deferred)
1. Choose one well-documented historical solar-wind/geomagnetic event with overlapping Parker, L1, GOES and ground observations where geometry permits.
2. Acquire bounded, time-tagged records through the Observatory's validated source registry; compute spacecraft ephemerides and align timelines.
3. Begin with a deliberately coarse, explicitly synthetic/assimilative 3D field or particle-volume model. Separate measurement constraints from simulation state.
4. Save deterministic state snapshots at fixed time intervals; each slab renders one volumetric snapshot. Prefer instanced geometry or lightweight volume slicing with a bounded mobile GPU budget. Do not assume a true 3D volume is recoverable from one-point time series.
5. Add lateral time navigation, camera rotation, slab spacing/compression, tap-to-isolate, and a single 👁 export for evidence, build, seed, observation coverage and simulation parameters.
6. Validate model output against held-out measurements and provide uncertainty or confidence visualization. Keep the exhibit visually quiet and technically inspectable.
7. Optionally generalize to multiple specimens and live L1 assimilation, without pretending historical Parker data are real-time.

### Boundaries
- Standalone exploratory Hermeticon JIT is preferable to disturbing the working Observatory. Reuse existing simulation, publishing and Lattice acquisition machinery rather than reinventing it.
- No deadline, no commitment to the exact number of slabs, no need to build now. Return when the underlying source coverage and scientific question justify the sculpture.

## Future proposal format
Add new proposals here as concise independent sections: concept, user experience, scientific evidence, model limitations, implementation sketch and dependencies. Promote an idea to SPEC only when explicitly selected for execution.
