# ERS — External Revenue Service

**Live target:** https://bonoj.github.io/jit/ers/  
**Specification:** [SPEC.md](SPEC.md)

## Rebuild 2026-11-04

The previous ERS implementation was discarded and replaced from scratch. The new implementation is a mobile-first structural mirror of the IRS homepage, using ERS branding and the administrative vocabulary of arms transfers, policy conditions, concessions, resources, procurement, reconstruction and assistance.

**Files:** `index.html` (new document structure and styles), `app.js` (new routing, content and interactions).

### Reference screenshots

User supplied eight mobile screenshots of irs.gov and ERS, showing the actual mobile header (blue, IRS wordmark, SEARCH / SIGN IN / MENU), account promotion, account-phone illustration, blue task-search panel, tall icon cards, news carousel, help audience tabs, accordions and institutional footer. Those screenshots, not generic design preferences, govern the rebuilt hierarchy.

### Working routes

Home, File, Pay, Refunds, Credits & Deductions, Forms, Report Fraud, Account Records, Jurisdictions, individual country transcripts and schedules, form details, Notices, Publications, Search, Methodology, Help. Mobile menu and search toggles, accordion panels, audience tabs, print and account JSON export.

### Evidence and next steps

The eight-country corpus contains **source pointers and dated events**, not fully reconciled transaction-level financial data. Never manufacture amounts, transfers or legal obligations. Implement per-transaction provenance, concession records, contractor networks, source-level citations, quantitative schedules and notice history before presenting numeric account totals.

### Verification

GitHub source commit and read-back can be verified independently. **Live GitHub Pages publication and device-browser rendering have not yet been independently verified.** Test mobile viewport, SEARCH and MENU, deep links, account records, forms, tabs, print, export, search, and back navigation before marking production acceptance.

### Cold boot

Read `SPEC.md`, then `index.html` and `app.js`. Use the supplied IRS screenshots as the visual contract. Do not reintroduce the old text-heavy ERS card grid or permanent desktop nav on mobile.
