# Crusade — Public Record

A source-first public accountability instrument, separate from JIT Sieve (job search).

## Mission

Make documented institutional conduct searchable and difficult to obscure by connecting public records across corporate entities and time.

## Investigation 001: US nursing facilities

Proposed sources: CMS ownership, facility characteristics, payroll-based daily staffing, inspection and enforcement records. Primary source portal: https://data.cms.gov/ ; public facility lookup: https://www.medicare.gov/care-compare/ .

## Publication contract

- Every substantive finding needs a primary-source citation, observation date, and reproducible method.
- Distinguish reported records, regulator findings, unresolved allegations, inferences, and corrections.
- Do not equate ownership, correlation, or statistical outliers with wrongdoing.
- Do not publish private personal information or imply culpability by association.
- Permit corrections and preserve a visible revision history.
- Public findings cannot be purchased away; revenue, if any, comes from exports, monitoring, and APIs.

## State

Prototype 001: static mobile-first landing page, direct links to official record portals and facility lookup handoff. **No automated ingestion, ownership graph, dossiers, or allegation scoring yet.**

## Next steps

1. Identify exact CMS datasets, API endpoints, schemas, refresh intervals, and licenses.
2. Ingest a bounded sample and retain raw snapshots and provenance.
3. Resolve facility IDs and ownership relationships with uncertainty tracked explicitly.
4. Publish one reproducible, source-linked demonstration using actual records.
5. Add scheduled refresh, diffing, corrections, and machine-readable export.

## Live path

https://bonoj.github.io/jit/crusade/
