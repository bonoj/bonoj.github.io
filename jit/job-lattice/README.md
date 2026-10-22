# Job Lattice — job ingestion and application instrument

**UI:** https://bonoj.github.io/jit/job-lattice/  
**Scope:** independent of `jit/lattice/`, which remains the Earth/orbit observatory.

## State
- Browser interface committed: compact ranked job cards, search, save/pass/applied decisions, apply-link handoff, local persistence, JSON eye/export.
- GitHub Actions workflow `.github/workflows/job-lattice.yml` configured for every six hours and manual dispatch. Ingestion has not yet been observed running successfully.
- **Maximum-vacuum ingestion configured:** Remotive, Arbeitnow, 25 Greenhouse board identifiers and 15 Lever board identifiers (42 endpoints attempted). Some board identifiers may fail or not exist; every result/error is reported per source. This configuration is **not** evidence of 42 working sources. The normalizer sanitizes HTML, deduplicates by company/title, and prefilters permissively against 11 independent title/description signal families (research, simulation, creative, games, visualization, architecture, prototyping, tooling, scientific, intelligence, engineering). Feed schema v2 includes raw, unique, accepted and signal counts. No shortlist cap. Provider access, terms and availability can change.
- **Not implemented:** real ATS submission, authenticated application sessions, resume customization, verified automatic applications, cross-device state synchronization. Clicking Apply opens the employer/provider application URL; marking Applied is manual and not proof of submission.
- **No fabricated results:** initial `jobs.json` is empty. Successful workflow run must populate it.

## Ingestion-first invariant
Do not narrow to five, prioritize a favored employer, implement application UX, or silently drop entire opportunity families before collecting and measuring broad coverage. Five is the later application batch size, not an ingestion quota. Expand source families and validated breadth first. Distinguish configured endpoints from successfully fetched postings. GitHub Actions is configured, but a successful scheduled intake has not been verified in this handoff.

## Target
Pull → normalize → compact → rank → human-approved apply → verify → track. Use actual user job constraints and tailor scoring after review. Prefer integrations with real submission APIs where available; don't claim auto-apply merely from opening a link. Never put applicant credentials, personal data, or resumes in a public GitHub Pages snapshot.

## Recovery
Lattice original is untouched. Static snapshot is `jobs.json`; the feed action can be disabled without affecting UI or other JIT worlds. Follow Sanctum contract and Chaos publisher for deployment verification. Preserve browser-local decisions before changing localStorage schema.
