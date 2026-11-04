# ERS — External Revenue Service

**Site:** https://bonoj.github.io/jit/ers/  
**Spec:** [SPEC.md](SPEC.md)  
**Status:** Initial self-contained application committed 2026-11-04. GitHub Pages publication and browser behavior not independently verified.

## Purpose

A sober, IRS-inspired public accounting interface for examining documented interventions, arms transfers, procurement, assistance, reconstruction, resources and institutional dependency. Conceptual basis: John Bono's 2014 poem *State of the Union* (Lord of War / Emissary of Peace).

## Current implementation

- Single-file, dependency-free HTML/CSS/JS app at `index.html`, hash-routed for GitHub Pages.
- IRS-style task homepage, six primary nav items, search, guided navigation, help, forms and instructions.
- Eight real-world country/regional account stubs with source collection pointers and W/P/R/C/D schedules.
- Source library, methodology, local JSON export, printable transcripts, mobile layout.
- No fictional financial figures, authentication, payments, or invented government authority.

## Critical limitations

This is **not** the full one-pass spec implementation yet. The initial records are narrative source pointers, **not** transaction-level sourced claims or financial flows. No numeric ledger, actor graph, form-fill worksheets, transaction reconciliation, robust source verification, or automated tests. Some source links target institutional collections rather than individual documents; verify precise source targets and claims before publication as quantitative records. Browser interaction and Pages deployment remain unverified.

## Cold boot

1. Read `SPEC.md` in full, particularly §2A IRS audit, §4 schema, §7 evidence standards, §8 release scope, §11 acceptance gates.
2. Inspect `index.html` and run browser smoke tests (search, filters, deep links, forms, export, print, mobile, keyboard).
3. Verify and upgrade source links to specific documents. Implement structured data and evidence-based flow/actor/event joins.
4. Add proper form workflows, notice detail, fraud/oversight source-backed findings, accessible menu disclosures, and real accounting-basis filters.
5. Preserve all other JIT experiments and the root site. Update this README and a CHRONICLE on each substantive iteration.
6. Distinguish GitHub commit, Pages build and verified live behavior.

## Publication

Static GitHub Pages path `jit/ers/index.html`. No build dependencies.
