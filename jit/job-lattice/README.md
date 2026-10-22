# Job Lattice — job ingestion and application instrument

**UI:** https://bonoj.github.io/jit/job-lattice/  
**Scope:** independent of `jit/lattice/`, which remains the Earth/orbit observatory.

## State
- Browser interface committed: compact ranked job cards, search, save/pass/applied decisions, apply-link handoff, local persistence, JSON eye/export.
- GitHub Actions workflow `.github/workflows/job-lattice.yml` configured for every six hours and manual dispatch. Ingestion has not yet been observed running successfully.
- Public feeds: Remotive and Arbeitnow. The normalizer fetches, sanitizes HTML to plain text, deduplicates by company/title, and publishes `jobs.json`. Feed availability and provider rules can change.
- **Not implemented:** real ATS submission, authenticated application sessions, resume customization, verified automatic applications, cross-device state synchronization. Clicking Apply opens the employer/provider application URL; marking Applied is manual and not proof of submission.
- **No fabricated results:** initial `jobs.json` is empty. Successful workflow run must populate it.

## Target
Pull → normalize → compact → rank → human-approved apply → verify → track. Use actual user job constraints and tailor scoring after review. Prefer integrations with real submission APIs where available; don't claim auto-apply merely from opening a link. Never put applicant credentials, personal data, or resumes in a public GitHub Pages snapshot.

## Recovery
Lattice original is untouched. Static snapshot is `jobs.json`; the feed action can be disabled without affecting UI or other JIT worlds. Follow Sanctum contract and Chaos publisher for deployment verification. Preserve browser-local decisions before changing localStorage schema.
