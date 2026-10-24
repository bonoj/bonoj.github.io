# JIT Idle — Workshop

2026-10-24. A smartphone is the command center. No speedrun; attempt work that normally demands a laboratory, research team, institution, or years of coordination. External compute, public data and repositories are allowed. Preserve coherence across long horizons.

## Five mountains

1. **Reconstruct an alien world.** Build a physically constrained, explorable Europa from planetary observations: ice, geology, chemistry, radiation, competing hypotheses and explicit unknowns. Not a painted globe.
2. **Build a scientific discovery engine.** Ingest neglected astronomical archives, reproduce established findings, search for anomalies, and pursue a genuinely new independently testable observation.


### Astronomy qualification (2026-10-24)

An enormous amount. And some of the most interesting astronomy isn't waiting for a better telescope. It's waiting for someone to interrogate observations we've already collected.

For **JIT Idle**, I'd distinguish three kinds of computational opportunity:

1. **Unexamined data:** observations that have never received detailed scrutiny.
2. **Underexamined data:** observations processed for one scientific purpose but potentially useful for something else.
3. **Unsolved inference:** observations everyone has access to, but nobody has yet extracted a convincing explanation from.

The third is particularly interesting. We don't necessarily need more computing power than an astronomical institution. We might need a different question, a better representation, or a clever way to search.

Here are the archives I'd seriously consider attacking.

## Six astronomical mountains worth lifting

**1. Vera C. Rubin Observatory — the changing sky**

Rubin's LSST is designed around roughly 20 TB of nightly data and ultimately billions of astronomical objects. Its alert streams enable rapid investigation of changing or moving sources.

**Our attack:** discover objects whose behavior doesn't fit established classes, especially across repeated observations.

**2. NASA TESS — hidden planetary systems**

Public light curves and full-frame images let us search for transits, eclipsing binaries, unusual stellar variability, and other signals. NASA provides programmatic access and browser-based cloud analysis.

**Our attack:** look for weak, irregular, or nonstandard signals that conventional planet searches might miss.

**3. LOFAR — millions of radio mysteries**

LoTSS DR2 catalogues about 4.4 million radio sources. Researchers used extensive human inspection to associate complicated radio structures with their optical counterparts.

**Our attack:** find unusual radio morphologies, disconnected-looking structures, bent jets, and rare objects by learning spatial relationships rather than classifying isolated pixels.

**4. Zwicky Transient Facility — the forgotten history of the sky**

ZTF's January 2026 public release contains 69.7 million single-exposure images, over a trillion extracted source detections, and 5.32 billion light curves.

**Our attack:** reexamine years of variability to identify rare, long-duration, repeating, or previously misclassified phenomena.

**5. Gaia — the Galaxy in motion**

Stellar positions, distances, velocities, and astrophysical measurements create opportunities to reconstruct stellar associations, streams, and the Milky Way's dynamical history.

**Our attack:** search for coherent stellar populations that standard clustering algorithms fragment or overlook.

**6. JWST and Hubble — the archival universe**

Decades of images and spectra provide opportunities to cross-reference observations, investigate faint structures, and identify objects that behave differently across wavelengths or epochs.

**Our attack:** construct a cross-instrument anomaly detector that treats disagreement between observations as something to investigate rather than automatically discard.

### Computational bottlenecks and research selection

| Problem | Computational burden | Potential reward |
|---|---|---|
| Transient detection | Continuous streams, crossmatching | Rare explosive or variable events |
| Light-curve analysis | Billions of noisy time series | Unusual planets, binaries, stellar behavior |
| Radio morphology | Large images, source association | Rare galaxies and jet structures |
| Galactic dynamics | Massive phase-space catalogs | Previously unrecognized stellar structures |
| Archival reprocessing | Calibration, image alignment | Faint or overlooked phenomena |
| Cross-survey inference | Uncertain identities and measurements | Discoveries invisible to one survey alone |

These archives are already studied intensively. The opportunity is a well-defined question their pipelines are not optimized to answer.

**Candidate distinctions:** Rubin/LSST for scale; TESS/Kepler for immediate experimentation; LOFAR for spatial reasoning; ZTF for archival archaeology; Gaia for executable three-dimensional dynamics.

**Proposed experiment:** Cross-reference LOFAR with Gaia, optical and infrared catalogs. Model radio lobes, candidate host galaxies, foreground stars and unrelated sources as competing relational hypotheses. Blindly rediscover a known rare phenomenon from minimally processed observations, then test the same method against a less thoroughly examined population. Require physical and statistical scrutiny before any discovery claim.

Remote archive queries and cloud-hosted data can keep the smartphone as the human interface without transferring entire archives locally. A new method for extracting meaning from the sky may matter more than finding one unusual object.

3. **Reconstruct a century of forgotten humanity.** Build an evidence-backed historical knowledge graph joining genealogy, correspondence, migration, institutions and political movements. Trace each relationship to evidence.
4. **Grow an artificial biosphere.** Model matter, energy, reproduction, predation, inheritance, adaptation and extinction. Test whether sustained ecological complexity can emerge without scripted outcomes.
5. **Build a machine that builds worlds.** Create compositional research and simulation machinery to ingest an unfamiliar field, build executable models, test them, expose uncertainty and preserve discoveries for another investigator. Prove it by accomplishing substantive work on one of the other four; no infrastructure for its own sake.


## Additional research mountains (2026-10-24)

6. **Reconstruct an organism from first principles.** Recreate a microscopic animal's anatomy, metabolism, nervous system, locomotion, and environment as a testable executable organism. Question: how much biology must be understood to reproduce behavior?
7. **Interrogate an undeciphered writing system.** Test symbol statistics, ordering, archaeological context, and linguistic hypotheses for Rongorongo, the Indus script, or another corpus without inventing translations.
8. **Rebuild a lost technological civilization.** Work backward from an artifact such as the Antikythera mechanism to the mathematics, tools, materials, manufacturing and institutions needed to produce it.
9. **Reconstruct Earth's hidden circulation.** Model observed flows of water, heat, salt, nutrients and pollutants across oceans, rivers, air and groundwater; track where a drop goes and what it carries.
10. **Reverse-engineer the early universe.** Use the cosmic microwave background and galaxy distributions to test families of initial conditions and distinguish recoverable history from degeneracy.
11. **Build an organism's complete sensorimotor loop.** Couple a tractable nervous system, such as C. elegans, to a physical body, senses and environment; test whether known wiring generates behavior.
12. **Discover materials that shouldn't work.** Analyze published materials experiments for surprising composition–processing–performance relationships, and propose testable recipes.
13. **Inventory the life humanity hasn't named.** Compare environmental DNA, ocean surveys and biodiversity records to identify uncertain lineages and ecological gaps while accounting for contamination.
14. **Build a planet that remembers everything.** Generate a world whose geology, organisms and settlements arise from causal history; make its past recoverable through excavation and investigation.
15. **Search for the universe's mistakes.** Seek reproducible inconsistencies in timing, spectra, geometry, conservation or statistics, with calibration errors and selection effects as competing explanations.
16. **Reconstruct the world's missing cities.** Integrate historical maps, terrain, waterways, satellite imagery and archaeology to test predictions of undocumented settlements against known discoveries.
17. **Reconstruct the origin of life.** Model experimentally constrained chemistry, compartments, reaction networks, imperfect replication and selection to test transitions from chemistry to evolution.

### A larger synthesis

Reconstruct a continuous causal history from the early universe to a living organism looking at the stars: cosmology → stars → elements → planets → chemistry → life → ecosystems → intelligence. Use a hierarchy of executable, evidence-constrained models, not a literal atom-by-atom simulation. Track what information survives between scales and where the models cease to agree with observations.

**Especially compelling:** #14 (causal worlds), #15 (scientific anomalies), #17 (origin of life). None selected yet.

## Operating contract

- The smartphone is the only required human interface, not the only compute device.
- Depth over speed. No artificial deadline, premature deployment, or victory because a page renders.
- Preserve sources, assumptions, uncertainty, failures, and reproducible evidence.
- Survive cold boots and thousands of decisions; make findings independently verifiable.
- Protect play and stable worlds. Read Sanctum's Conjoiner and Contract before continuation.
- Distinguish proposed, written, committed, deployed and observed working.

## State / cold boot

Five directions captured; none selected. This file is a workshop, not a deployed runtime. Next: choose a mountain (or find a heavier one), establish falsifiable milestones and evidence criteria, then begin without shrinking the ambition to an easy demo.

**We lift until the thing either moves or teaches us why it cannot.**
