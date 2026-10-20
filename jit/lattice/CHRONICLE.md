# LATTICE — Development Chronicle

## Verbatim conversation archive

**Scope:** complete visible user–assistant turn pairs beginning with the user's request “Take one turn to verify everything and lay yourself clean implementation hooks and persist in a new doc called vet.” These are preserved as authored messages, including their rendered-response source markup where present. Tool calls and tool results are not conversation turn pairs and are not reproduced here. The present request to add this chronicle is documented after the completed pairs.

---

### Pair 1 — VET

**Human (verbatim)**

> Take one turn to verify everything and lay yourself clean implementation hooks and persist in a new doc called vet.

**Model (verbatim; consecutive visible final messages joined in original order)**

<badge color="success"><icon name="check" size="xs" inline/> VET committed</badge>

**[Read \`jit/lattice/VET.md\`](https://github.com/bonoj/bonoj.github.io/blob/master/jit/lattice/VET.md)**

Commit: \`3e053218\`

I reviewed the Lattice specification against Hormuz's actual source and public API documentation, then persisted the implementation contracts and cold-boot instructions.

The audit identified several things worth correcting before construction:

- **53 channels ≠ 53 independent sources.** Multiple channels should share provider requests.
- **ISS:** The position-history endpoint requires timestamp parameters. The initial build should use the documented current-position endpoint.
- **NASA FIRMS:** Its API may require a key; no credentials belong in public client code.
- **Antarctica:** Polar model coverage must be checked rather than assumed.
- **Maritime, BOM, and other candidate feeds:** Some URLs still need actual response-schema, licensing, and browser-CORS verification.

The VET also specifies the source registry, normalization contract, five-second due-check scheduler, globe renderer, reusable regional WorldSpecs, runtime eye, and regression tests.

**Readback verified.** The document is persisted and ready for a fresh implementation thread.

The first build is scoped to five provider families: Open-Meteo weather, marine, air quality, USGS earthquakes, and ISS positioning.

One important boundary remains: **documentation has been reviewed, but live browser ingestion across all 53 channels has not been verified.** The VET makes those checks explicit rather than treating them as completed.

Next cold boot can go directly from **VET → implementation → tests → deployment**, preserving Hormuz untouched. 🐉

---

### Pair 2 — Dracarys build

**Human (verbatim)**

> I took a submariner shower. Build and deploy. Dracarys.

**Model (verbatim; consecutive visible final messages joined in original order)**

**Dracarys. 🐉🔥**

The first worldwide Lattice executable is committed.

<text color="secondary" size="xs">Build \`061f90de\` · Earth + Orbit</text>

[Open Lattice](https://bonoj.github.io/jit/lattice/)

It includes a rotating-view Earth with seven selectable continents, an ISS orbital layer, UTC clock, regional source cards, and six public-data adapter families: weather, marine conditions, air quality, earthquakes, NASA natural events, and ISS positioning.

The globe, source scheduler, and regional selection are implemented in one browser-native application. No Supabase or new backend.

**Source readback passed:** all six adapter families are present in the committed executable.

GitHub's publication workflow has started for \`061f90de\`, but it was still running at the last check. I couldn't independently verify the public page or live browser feeds yet, so I'm not calling the deployment confirmed.

[Open Lattice](https://bonoj.github.io/jit/lattice/) · [Source](https://github.com/bonoj/bonoj.github.io/blob/master/jit/lattice/index.html) · [Publication workflow](https://github.com/bonoj/bonoj.github.io/actions/runs/39461801533)

The worldwide world is built. The remaining gate is **live publication and runtime verification**.

---

### Current archival instruction — human verbatim

> Add chronicle. Preserve all turn pairs verbatim from "Take one turn to verify everything and lay yourself clean implementation hooks and persist in a new doc called vet."

**Archive boundary:** this instruction is recorded verbatim. The model's response to this current turn cannot be reproduced as a *completed prior turn pair* at the moment the chronicle is committed. Do not invent it.

## Artifact ledger (supplementary; not part of the verbatim conversation)

- VET specification and implementation handoff: [VET.md](VET.md), commit \`3e053218e49721cdb046c80f7edf4fac3aa3f5e0\`.
- Worldwide candidate source inventory: [SPEC.md](SPEC.md), commit \`ff632477dedbd46d7fc992058894b6448f122f29\`.
- Executable: [index.html](index.html), commit \`061f90de787322e64029be1e0bf846a387b5d7a4\`.
- Initial Lattice JIT entrypoint created in commit \`9820dfb547caa568a127365bb3c47ed88680e3ce\`.
- The deployment workflow for the executable was reported *in progress* at the time of the model's last observation. No later success or live-browser verification is implied.
- The exact messages above are conversation evidence; the ledger is separate operational context.
