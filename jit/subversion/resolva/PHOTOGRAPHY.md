# RESOLVA photographic production machinery

This is **working metadata and a validator**, not a gallery of generated images. The user-supplied campaign image remains the reference. It is **not** yet available as a repository asset. No image has been generated, approved, or deployed.

## Files
- `photography.json`: canonical look, subject and location continuity, 18 shot briefs, crop focal points, asset paths, provenance, and explicit review gates.
- `validate-photography.mjs`: zero-dependency Node validator. Run `node jit/subversion/resolva/validate-photography.mjs` from repository root.

## Operating procedure
1. Transfer the supplied original through established Sanctum Gate/Artifact Relay; store immutable reference and verify its hash.
2. Create a **new** clean photorealistic hero from reference-conditioned generation; **no inpainting or text erasure**. Keep exact woman's identity and serene expression. Do not claim exact replication is guaranteed by a seed.
3. Record generation model/version, seed when supported, prompt, settings and source provenance. Reject drift, uncanny skin, inconsistent house, invented text or lighting discontinuity.
4. Once hero approved, create registered background plate and foreground alpha with hair detail. The oversized wordmark uses the **same image coordinates** as the base photograph; only the letter mask's tone changes.
5. Generate secondary photographs against actual mobile/desktop content layouts. Treat scene 13's fictional patient as distinct from the campaign woman. Derive scene 11 from scene 10 so physical damage remains unchanged.
6. Produce crop derivatives deterministically from approved immutable masters, with mobile subject-first framing, tablet balance, desktop environmental breadth. Never regenerate just to resize.
7. Record SHA-256, rights/provenance, crop focal points, accessible alt intent, and approval checks. Mark `approved` only when all gates pass. Validate after each metadata change.

## Reproducibility contract
The generation step is **not pixel deterministic** merely because prompt and seed are fixed. Reproducibility comes from reference control, versioned scene specifications, explicit review, immutable approved masters, versioned grading, and deterministic masks/crops. Preserve rejected candidates and their reasons separately if needed, without promoting them to canon.

## Visual principles
Natural skin and knit texture; plausible reflections and sunlight; restrained dreamy tonality; no painted, illustrative, plastic or hyperrealized look. The woman's joy must remain authentic, never vacant or sedated. The unsettling story is in unchanged circumstances and institutional records, not in degrading her image.
