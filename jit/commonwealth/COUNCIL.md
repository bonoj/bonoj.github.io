# Commonwealth — Multi-steward disagreement demonstration

**Status:** synthetic deterministic research software. No live assets, persons, government authority, or financial transactions.

Run from this folder: `node council-test.js`. Run baseline checks: `node test.js`.

Two independent *policy strategies* evaluate the same physical shortfalls:
- Steward A distributes a limited shared pool proportional to uncovered need.
- Steward B fills the smallest uncovered gap first.
Both preserve baseline local capacity and cannot transfer more than the shared pool.

The auditor checks conservation, nonnegative allocations, unfilled shortfalls, disagreement and a constitutional authorization gate. It does not decide the winner: it returns a **human-review-required** result. Machine agreement never substitutes for a lawful mandate. The two strategies are deterministic code, not two independently deployed models; independence of real operators and model families remains untested.

## Abuse cases and current limits

Baseline tests exercise rights, provenance, mandate scope, conflict of duties, service continuity, appeals and forbidden external actions. These are unit checks, not penetration testing. The gate currently accepts Boolean assertions such as `humanApproval` and `mandate.valid` supplied by the caller; this is NOT cryptographic authorization and must not be used to authorize real-world actions. A production implementation would need independently verified mandates, hardware-backed identities, authenticated human consent, externally controlled custody, tamper-evident logs and independent oversight.

## Next steps

Integrate visible disagreement into the browser UI; use independently sourced datasets; conduct external security and governance review; establish a responsible project maintainer and public issue intake. Do not claim real institutional authority.
