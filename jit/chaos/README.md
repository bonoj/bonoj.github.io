# JIT Chaos

**Purpose:** disposable, rapidly flashed, deliberately messy Entropy experiments.

- Canonical intended URL: https://bonoj.github.io/jit/chaos/
- Host repo: `bonoj/bonoj.github.io`, branch `master`, directory `jit/chaos/`.
- Upstream specimen: `bonoj/Abyss/shell/`, with `codex/entropy/world.js` selected (not Europa).
- **Never modify Abyss or Hermeticon to run Chaos experiments.** Preserve their existing runtime and source.
- **Do not duplicate or maintain Athanor/Arcana source modules here.** Use the already-built Abyss Shell bundle as the seed, then freeze it.
- The final `index.html` should inline the complete local JS bundle and CSS, with no relative module or CSS fetches; identify any intentional external dependencies (e.g. pinned Three.js CDN) rather than claiming fully offline independence.
- Subsequent Chaos edits target the frozen HTML artifact directly. Do not silently regenerate from Abyss and erase mutations.
- Preserve visible executing build identity, FPS, runtime error reporting, and a known-good recovery checkpoint. A Git commit is not proof that Pages is executing it.
- Prefer existing JIT publishing and existing GitHub/Gate write recovery. No new runtime framework, architecture, or world contracts.
- This is an intentional **scratchpad**, not a production branch. Reusable discoveries may be extracted into Arcana later, explicitly.

## State

**Staging only.** No executable Chaos page has been committed yet. The packaging source and isolation requirements are identified; a verified standalone frozen Entropy artifact is still required before experimental mutation begins.

## Initial packaging checklist

1. Retrieve the actual successful Abyss Shell deployed JS asset matching a known build, not the unbundled `shell/main.js` source.
2. Confirm the bundle mounts Entropy, not Europa, and enumerate any asset/CDN dependencies.
3. Inline the bundle and `shell/athanor/interface.css` into a JIT-specific `index.html`; adjust paths and build-identity references to be local to JIT Chaos. Avoid executing code fetched from Abyss at runtime.
4. Commit and read back the artifact; verify Pages and the actual executing build in a browser.
5. Preserve the seed in Git history, then begin chaotic edits in-place.

No iframe wrapper around live Abyss is a substitute for a frozen independent artifact.
