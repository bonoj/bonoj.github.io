# SOMEWARE — It's in a better place.

## Status and inheritance
Creative/experience specification; not yet implemented. Standalone single-page Subversion project at `jit/subversion/someware/`. **Inherit all seven design invariants from [../README.md](../README.md)**, including mobile/desktop unity, deliberate margins and image crops, no decorative link arrows, purposeful interactions, rendered QA, and **no unsolicited disclaimers, satire labels, explanatory winks, or out-of-character moralizing**. Do not introduce a universal Subversion scaffold or shared runtime.

## Core proposition
**SOMEWARE** is an extraordinarily reassuring consumer cloud-storage company. It accepts everything, promises permanent safekeeping, and liberates customers from ever having to think about their belongings again. The underlying system **does not retain uploaded content at all**. This is the operational secret, not an admission made by the company. The absence of files is presented as proof of a frictionless product, not a failure.

**Brand:** SOMEWARE, uppercase. **Logo:** a minimal **outline cloud**, monochrome, text-style rather than filled emoji. Test the text-presentation Unicode cloud `☁︎` for consistent outline rendering; if inconsistent, use a simple outline vector while preserving the recognizable cloud silhouette. No cute mascot, glossy gradients, or sinister iconography.

**Primary line:** **It's in a better place.** Preserve its dual reading as storage reassurance and euphemism. Do not replace it with “You can let go now” (a secondary sentiment at most). Use restrained, serious typography.

## Institutional mythology
- **Proprietary Null Point Technology™**: described as a fundamental advance beyond conventional physical storage constraints. Technical prose should sound credible, confident, and strategically non-explanatory.
- **Galactic-Class Storage Facilities™**: an extensive, vaguely located network with monumental scale, pristine architecture, and astronomical imagery. Do not overexplain what these facilities contain or how they work.
- **Free personal account with infinite data**: not a trial, quota, or trick tier. Unlimited intake is genuinely free because no payload is preserved. Enterprise may offer procurement, certifications, service guarantees, and dedicated stewardship for a substantial negotiated price.
- Claims can be comically literal: no documented breaches, zero traditional storage footprint, indefinite retention, 100% successful intake, zero files requiring organization. Avoid a dense wall of gag metrics; let the ordinary sales language carry them.

## Public experience
Not GitHub. Not a file-manager clone. The design language is **credible consumer cloud technology crossed with premium wellness**: spacious, bright, calm, confident, and expensive-looking. Domestic serenity at the front door; enormous mysterious infrastructure deeper in the page. A convincing, content-rich landing page should introduce the proposition, explain Null Point Technology without revealing it, show the Galactic-Class network, present the free account, and offer an immediate way to entrust something to SOMEWARE.

Photography and compositing: intimate human/domestic imagery for relief, vast believable data-center/observatory architecture for scale, occasional astronomical imagery for implication. Treat images as responsive editorial assets with intentional crops. Avoid generic science-fiction UI, neon black holes, stock-cloud icon grids, or decorative feature cards.

## Customer experience: accretion, not browsing
The central interaction is a genuinely pleasant, accessible **Add something** flow. It may accept local files or user-entered text. It acknowledges intake with a graceful transition and the line **“It's in a better place.”** The personal space remains clean and nearly empty afterward. No conventional folders, thumbnails, file browser, download button, or searchable original documents. The absence of clutter is the feature.

**Important implementation invariant:** The experience must **not transmit, upload, persist, log, or retain real user-selected file contents**. Use browser-local selection and optional metadata only for the current interaction; immediately release file references after confirmation. If size/count is displayed, it can be computed from local metadata without reading contents. Never imply actual secure backup in developer documentation or create a backend for user files. Public-facing fictional corporate copy stays in character.

## Observations / deterministic ghosts
A secondary, understated **Observation** feature can accept an issued receipt or identifier and produce a deterministic ghost. The ghost is derived solely from the identifier and a fixed procedural seed, **not from uploaded content**. Repeated observation of the same identifier yields the same output, creating an impeccable illusion of integrity. It may look like a fragment of a document, inventory, memory, or code; do not generate a plausible facsimile of the user's actual uploaded content. Do not make this the primary call to action or build a developer CLI.

If the observation mechanism is presented as part of the site, the company describes it as an advanced archival interface, never as recovery or fabrication. Decide during implementation whether the ghost is fixed per receipt forever or shifts with a ceremonial accretion epoch; default to fixed per receipt for easy reproducibility.

## Content and navigation
A coherent one-page composition, not a component showroom. Suggested editorial rhythm:
1. **Hero:** outline cloud, SOMEWARE, “It's in a better place.” Clear promise and free intake.
2. **The freedom of less:** no folders, no management, no worry; human-scale imagery.
3. **Null Point Technology™:** elegantly evasive technical narrative.
4. **Galactic-Class infrastructure:** monumental image and sparse, confident facts.
5. **Personal / family / enterprise:** free unlimited personal use; enterprise inquiry.
6. **Personal space / intake:** a working experience, not a decorative mockup.
7. **Optional Observation:** a quiet, discoverable secondary path, with deterministic results.

Copy should be credible first and disturbing on reflection. No explicit “we delete your files” confession, no cartoon villainy, no fourth-wall wink. Avoid inventing a fake legal compliance regime or real third-party certification.

## Acceptance criteria
- Logo reads as a **monochrome outline cloud**, not colored emoji; wordmark is **SOMEWARE**.
- “It's in a better place.” anchors the identity.
- The page convincingly sells unlimited free cloud safekeeping, proprietary Null Point Technology™, and vague Galactic-Class facilities.
- Intake actually responds to file selection/text input, reports success, and returns to a clean personal space; no payload contents leave the browser or persist.
- Optional observations are reproducible and demonstrably independent of input contents.
- Public site stays entirely in character; no satire labels, disclaimers, moralizing, or explanatory reveals.
- Meaningful content and visual polish on mobile and desktop, tested at actual viewport sizes; touch and keyboard access, reduced motion, no overflow.
- Parent Subversion README governs the build by reference; no shared scaffold.
