# Crusade

Status: research only. No executable is needed.

Mission: connect public records to investigate documented institutional conduct, with transparent sourcing and careful distinction between evidence and inference.

First inquiry: nursing-home ownership, staffing, inspections and penalties using CMS public datasets.

Workflow: locate authoritative datasets; inspect schemas and identifiers; retrieve a bounded sample; test joins and temporal comparisons; document limitations; publish reproducible findings. Only then consider automation or a user interface.

Rules: no accusations based on correlations alone; no personal targeting; preserve citations, dates, corrections and uncertainty. Public findings remain free. Paid structured exports or monitoring are a future, unvalidated business hypothesis.

Sieve remains the separate job-search project.

## Research log — 2026-10-22

First source discovery (metadata verified; **no facility-level records analyzed yet**):

- CMS Nursing Home **Provider Information**, dataset `4pq5-n9py`: facility-level records, one row per active nursing home, including CMS Certification Number (CCN), beds, staffing and quality fields. https://data.cms.gov/provider-data/dataset/4pq5-n9py
- CMS Nursing Home **Ownership**, dataset `y2hd-n93e`: ownership records for active nursing homes. https://data.cms.gov/provider-data/dataset/y2hd-n93e
- CMS **Skilled Nursing Facility All Owners**, dataset series `afe44b85-cc6d-40d7-b5df-00ae8910d1d2`: monthly self-reported enrollment ownership records, including ownership effective dates and ownership types. https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/skilled-nursing-facility-all-owners
- CMS **SNF Change of Ownership – Owner Information**: quarterly records of buyer/seller owner and managerial-control relationships. https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/skilled-nursing-facility-change-of-ownership-owner-information
- CMS nursing-home data catalog includes **Penalties** (fines and payment denials in a rolling three-year window). https://data.cms.gov/provider-data/topics/nursing-homes/

**Potential join:** facility CCN in provider records to facility-level ownership and enforcement records; separately reconcile enrollment identifiers to CCN for SNF All Owners. Do **not** assume cross-system identifier equivalence until schemas and sample rows are inspected. Ownership is self-reported and should not be treated as independently verified beneficial ownership.

**Next test:** fetch actual rows and dictionaries from Provider Information, Ownership, and Penalties; identify exact join fields and coverage; produce a small source-linked, date-stamped comparison with no speculative accusations.
