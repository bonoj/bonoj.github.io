# ERS — External Revenue Service
## Complete product and implementation specification · 2026-11-04

**Location:** `bonoj/bonoj.github.io/jit/ers/`  
**Canonical experience:** `https://bonoj.github.io/jit/ers/`  
**Foundational text:** *State of the Union* (2014), original poem by John Bono, provided by the author in conversation.

## 0. Mandate

Build a fully navigable, evidence-based public-accounting institution modeled on the **information architecture, interaction grammar, typographic restraint, and procedural density** of the United States Internal Revenue Service. The ERS is an independent critical project about how military intervention, coercive leverage, weapons procurement, extractive resources, reconstruction, and institutional dependence are accounted for, justified, and financed. It is not a mere landing page or a collection of jokes.

Use **real governments, real institutions, real history, real financial records, and source-linked claims**. Do not fabricate historical actions, contracts, official authorizations, statistics, quotes, motives, or financial transfers. Never present speculative attribution as adjudicated fact. No ornamental fictional country data in production. No prominent genre labels, joke disclaimers, or comic branding. Do not impersonate an actual government service: the domain and independent project attribution must remain visible, and no federal seals, official government authentication, or misleading payment collection.

## 1. The poem as an executable institutional model

*State of the Union* (2014) supplies two linked processes:

**Lord of War** — conflict financing, arms sales, military assistance, contractor procurement, extractive bargaining, competing belligerents, resource depletion, and withdrawal.

**Emissary of Peace** — relief, reconstruction, governance assistance, constitutional and electoral influence, infrastructure, market access, consumer market expansion, security guarantees, and recurring dependencies.

These are not two separate satirical websites. They are **two accounting schedules on one sovereign ledger**. The institutional irony is structural: the same intervention can generate public expenditures, private receipts, contingent liabilities, dependency, and downstream reconstruction spending. Neither side is assumed to be profitable, nor is a particular motive assumed without evidence.

**Conservation rule:** never conflate public Treasury revenue, government expenditure, contractor revenue, foreign-government expenditure, financing commitments, resource market value, and hypothetical opportunity value. Every amount must have a unit, currency, date, accounting basis, payer, recipient, provenance, and uncertainty.

## 2. Product identity and presentation

- Header: **External Revenue Service**, small typographic **ERS**, utility navigation, search, help, language affordance only if implemented.
- Government-service visual grammar: white backgrounds, navy/blue links, muted gray dividers, wide content column, compact cards, practical tables, accessible forms, breadcrumb trails, dense footer.
- Responsive, mobile-first, keyboard-accessible, semantic HTML, visible focus states, WCAG AA contrast, reduced-motion support.
- Tone: clinical, administrative, precise, sometimes chilling by juxtaposition. Avoid editorial exclamation, villain caricature, and decorative weapons.
- Source and institutional identity in unobtrusive footer: **Independent public-interest accounting project · Sources and methodology**. This is provenance, not a splash-screen disclaimer.
- Never use `irs.gov` branding, IRS logo/seal, .gov-looking hostnames, fake federal login, or real payment capture.
- The poem belongs in project documentation, optionally a low-profile historical/conceptual note, not on the homepage. Author retains authorship; do not silently alter its text.

## 3. Primary information architecture

**Homepage**
- Header search; global nav: File / Pay / Refunds / Credits & Deductions / Forms & Instructions / Notices / Account / Help.
- Main task cards translated into ERS workflows, grounded in documented data.
- Featured recent public filings and source-backed account updates.
- Searchable jurisdictions and organizations.
- Plain-language methodology and source links.

**File**: Sovereign Revenue Returns, annual accounting periods, supporting schedules, transaction ledger and reconciliation.

**Pay**: Payments, disbursements, offsets, export revenue flows, appropriations, debt servicing; a **read-only public record**, never an actual payment gateway.

**Refunds**: Restitution, debt relief, returned assets, reconstruction commitments, canceled obligations; status must be documented, not inferred.

**Credits & Deductions**: Military aid, export credits, reconstruction grants, guarantees, security assistance, procurement offsets; never automatically classify expenditure as income.

**Forms & Instructions**: Searchable document catalog, ERS-1040-S (Sovereign Return), ERS-SCH-W (War), ERS-SCH-P (Peace), ERS-SCH-R (Resources), ERS-SCH-C (Contractors), ERS-SCH-D (Dependency), ERS-CP504 (Notice), ERS-AP (Appeal). These are *project-specific analytical forms*, not official federal instruments.

**Notices**: Evidence-linked event notices, changes in account status, disputed claims, audit trails.

**Account**: Public jurisdiction and institutional accounts, timelines, linked financial flows, counterparties, sources, unresolved reconciliation.

**Help**: Definitions, evidence grades, financial conventions, attribution policy, corrections, source submission and methodology.

## 4. Core data architecture

All public records are structured, versioned and provenance-preserving.

```ts
type EvidenceGrade = 'primary'|'official-secondary'|'independent-secondary'|'analysis'|'disputed';
type Verification = 'documented'|'reported'|'alleged'|'contested'|'unknown';
type FlowKind = 'appropriation'|'obligation'|'outlay'|'contract-award'|'contract-payment'|'arms-transfer'|'foreign-assistance'|'loan'|'grant'|'guarantee'|'resource-export'|'resource-concession'|'reconstruction'|'debt-service'|'restitution'|'other';
type ProgramPhase = 'conflict'|'reconstruction'|'mixed'|'neither';
interface Source { id:string; title:string; publisher:string; url:string; publishedAt?:string; accessedAt:string; documentId?:string; archiveUrl?:string; }
interface Claim { id:string; statement:string; verification:Verification; sourceIds:string[]; counterEvidenceIds?:string[]; reviewedAt?:string; }
interface Amount { value:number; currency:string; nominalYear?:number; basis:'nominal'|'real'|'estimated'|'range'; lower?:number; upper?:number; }
interface Flow { id:string; kind:FlowKind; phase:ProgramPhase; date:string; payerId?:string; recipientId?:string; jurisdictionIds:string[]; amount?:Amount; sourceIds:string[]; claimIds?:string[]; accountingNote?:string; }
interface Event { id:string; title:string; startDate:string; endDate?:string; jurisdictionIds:string[]; actorIds:string[]; phase:ProgramPhase; claimIds:string[]; sourceIds:string[]; }
interface Actor { id:string; name:string; kind:'government'|'agency'|'company'|'armed-group'|'international-organization'|'other'; countryCode?:string; }
interface Jurisdiction { id:string; name:string; iso3166?:string; status?:string; }
```

Entity IDs are stable. Records have schema version, revision history, and human-readable correction notes. Unknown values remain null; **never synthesize a number to make a dashboard look complete**.

## 5. Sovereign account engine

A jurisdiction account is a read-only projection from linked evidence records:
- Overview: documented flows, claims, sources, current coverage and limitations.
- **Schedule W**: arms transfers, military assistance, procurement, interventions, contractor relationships.
- **Schedule P**: humanitarian assistance, rebuilding, public administration, governance programs, commercial reconstruction.
- **Schedule R**: energy, minerals, concessions, royalties, production and exports.
- **Schedule C**: contractors, subcontractors, award values, actual payments when known, beneficiary relationships.
- **Schedule D**: recurring financing, guarantees, conditionality, training/security dependence, long-term contractual obligations.
- Chronology: events with claims and citations.
- Reconciliation: public costs versus documented private receipts, **not** an invented unified profit calculation.

Allow a user to traverse from country → event → flow → actor → source → related country. Filter by period, program, flow type, evidence status, and actor. Explain missing data inline.

## 6. Real-world initial corpus

Seed a **small but broad, fully verified corpus**, not a huge unsupported dataset. Prioritize:
- Iraq (2003 invasion, U.S. reconstruction and contracting, oil-sector claims with attribution discipline).
- Afghanistan (2001–2021 war, security assistance, reconstruction, SIGAR findings).
- Iran (1953 coup and documented intelligence record; later sanctions and military events only with dated, corroborated sources).
- Chile (1970s U.S. covert intervention records).
- Guatemala (1954 coup and declassified records).
- Libya (2011 intervention, subsequent political/economic outcomes with contested causal accounts).
- Israel/Palestine (U.S. security assistance, arms transfers, Gaza reconstruction and humanitarian flows, with clearly separated actors and documented responsibility).
- Saudi Arabia/Yemen (weapons sales, coalition military operations, humanitarian consequences and U.S. support).
- Ukraine (U.S. military/economic assistance and procurement; do not equate support for defense against invasion with an extractive operation).

This is a **coverage plan, not a list of predetermined verdicts**. Add only verified records; label empty coverage explicitly.

Preferred source families: USAspending.gov, USASpending API, FPDS, DoD contract announcements, DSCA, State Department, CRS, GAO, SIGAR, Treasury, OFAC, EIA, USGS, World Bank, IMF, UN OCHA, UN Comtrade, SIPRI, declassified National Security Archive and CIA materials, Brown Costs of War, reputable investigative reporting. Cite original documents whenever possible. Source diversity and competing accounts are mandatory for disputed claims.

## 7. Documentary standards

- A source URL and precise title are required for every public factual claim.
- Each financial figure must distinguish authorization, appropriation, obligation, outlay, contract ceiling, realized payment, export value and market estimate.
- Never imply that a weapons sale's face value is U.S. Treasury revenue.
- Never infer intent from outcome alone; state attribution and source.
- Dates, exchange rates, inflation adjustments and fiscal-year conventions must be explicit.
- Separate historical facts, interpretations, allegations, legal findings and satire in the underlying data model. The visible copy may remain dry and institutional.
- Claims of crimes require legal or clearly attributed documentary basis; do not invent adjudications.
- Record uncertainty, gaps, revisions, and sources that disagree.
- Do not include personal data about private individuals.
- Correction workflow: public changelog, cited replacement, old value retained in git history.

## 8. Functional interface — one-pass release scope

Build the **entire navigable shell** in one implementation pass:
1. Home with IRS-like task navigation and search.
2. Jurisdictions directory with text search, region and coverage filters.
3. Account detail template with six schedules and documented flow tables.
4. Event and actor detail views with cross-links.
5. Forms catalog with readable, printable project forms and instructions.
6. Notice detail with dated sources and status.
7. Financial-flow explorer with accounting-basis toggles and exportable CSV/JSON.
8. Methodology, source library, glossary, corrections and about.
9. Deep links via hash routes or static paths compatible with GitHub Pages; no backend needed.
10. Offline-first bundled dataset; no external API required to render core pages.
11. State preserved in URL for filters; accessible back/forward navigation.
12. Explicit empty/loading/error states and useful zero-data behavior.

**No dead links, decorative controls, fake submit success, fake balances, or made-up counters.** A user must be able to complete meaningful documentary exploration on first release.

## 9. Technical layout

```
jit/ers/
  index.html
  styles.css
  app.js
  data/
    actors.json
    jurisdictions.json
    events.json
    flows.json
    claims.json
    sources.json
  SPEC.md
  README.md
  CHRONICLE.md
```

Prefer plain HTML/CSS/ES modules, no build step, no framework or runtime dependencies unless existing JIT patterns strongly justify them. Deterministic rendering and robust XSS-safe text insertion. Mobile and desktop support. Data validation script/tests if repo tooling permits. No tracking or analytics by default.

## 10. One-pass build execution

A. Inspect current JIT index, hosting conventions and any existing ERS directory. Protect all other experiments and the root site.  
B. Commit this SPEC and an ERS README.  
C. Build the complete shell, routes, forms, accounts, schedules, cross-linking and exports.  
D. Populate only source-verified real-world records, with explicit provenance and gaps.  
E. Validate JSON referential integrity, amount semantics, URLs, keyboard navigation, small-screen layout, empty states, and browser back/forward.  
F. Update ERS README and CHRONICLE with exact build status, coverage, limitations and next cold-boot instructions.  
G. Update the JIT root index with ERS without disturbing existing entries.  
H. Commit, read back, check Pages publication independently if possible; distinguish committed from deployed from live-tested.

## 11. Acceptance gates

- Looks like a sober revenue-service information site at first glance, while remaining independently attributable.
- Every visible country and institutional account refers to a real entity.
- Every historical event, money amount and geopolitical allegation is sourced or explicitly marked unavailable.
- No false accounting equivalences.
- The Lord of War / Emissary of Peace cycle is legible through connected schedules rather than theatrical copy.
- A user can search, filter, open a jurisdiction, inspect flows, trace actors and sources, open forms, export records and navigate back.
- Works at mobile widths without horizontal overflow.
- No spoofed federal credentials, payments, domains or seals.
- Cold-boot documentation is sufficient for another model to resume without the original conversation.

## 12. Editorial north star

**War and peace are not opposing departments. They are accounting periods.**

The interface is boring. The ledger is not.
