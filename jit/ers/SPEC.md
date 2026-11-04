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

## 2A. Verified IRS reference audit — inspected 2026-11-04

**Reference pages inspected:** https://www.irs.gov/ ; https://www.irs.gov/filing ; https://www.irs.gov/businesses . These are live information-architecture references, not evidence of any ERS authority.

### Actual IRS structure to emulate

The live IRS homepage has a compact Search/Menu utility header, six principal task categories (**File, Pay, Refunds, Credits & Deductions, Forms, Report Fraud**), a prominent **“What do you need today?”** task search, popular-task shortcuts, a tax-debt-help guided tool, popular-topic links, expandable **Help & contact** panels segmented by audience, and news/announcements. The File menu subdivides by individuals, businesses, charities/nonprofits, international filers, retirement, government entities and tribal governments; it also distinguishes how/when/where to file, amendments and transcripts. Pay distinguishes bank-account payments, installment agreements, EFTPS, withholding, estimated taxes and penalties. Forms highlights common forms and instructions. The business center groups **Prepare your taxes / File or pay / Run your business / Business types**. The filing center organizes around audience-specific obligations and identification.

**Correction to §3:** the top-level ERS navigation must mirror these six task labels and their interaction model. **Account, Notices, Help** are utility/contextual destinations, *not* substitutes for **Report Fraud** in the primary navigation. Jurisdictions, timelines, actor networks and flow explorer are powerful secondary research tools, *not* the homepage's organizing principle.

### ERS audience model

- **Sovereign governments:** register or locate a sovereign account, review assessments, examine notices, request transcripts, submit an amendment or appeal.
- **Contractors and suppliers:** review documented awards, payment bases, supply-chain relationships and procurement records.
- **International organizations / relief agencies:** inspect reconstruction obligations, disbursements, program conditions and aid records.
- **Researchers, journalists and public:** search public accounts, source documents, methodologies, corrections and data exports.
- **Affected populations:** trace country-specific intervention, reconstruction and assistance records without being treated as consenting taxpayers.

The interface may use a **view-as** audience selector to prioritize task cards; it must never imply real government identity verification or impersonate real officials.

### Homepage exact task-first composition

1. Skip link, compact utility header with Search and Menu, accessible responsive navigation.
2. Six task-based mega menus with grouped links and “Popular” subgroups.
3. Large task search prompt (“What do you need today?”) with actual local index search and suggested queries.
4. Popular-task shortcut row: **Get a sovereign transcript / Review an assessment / Find a form / Check a notice / Examine payments**.
5. One short guided decision tool (e.g. **Find your account records**) with genuinely working branches and clear outcomes.
6. Popular topics with one-sentence descriptions.
7. Expandable **Help & contact** organized by the audiences above, with functional internal links and no invented contact phone numbers.
8. Modest news/announcements and methodology/corrections links.
9. Footer with source provenance and independent project ownership.

The homepage must **not** lead with a speculative global revenue counter, financial dashboard, world map, or cartoon war/peace contrast. The geopolitical ledger appears after a user chooses a task.

### Required real workflows (all local, read-only)

- **File a return:** choose jurisdiction and year → view documented annual return → expand W/P/R/C/D schedules → trace source records → print/export. “File” means browsing a compiled public accounting return, not submitting an official filing.
- **Pay:** choose jurisdiction or actor → view documented appropriations, obligations, outlays and transfers → switch accounting basis → inspect counterparties and sources. Never ask for money or bank details.
- **Refunds:** inspect documented restitution, returned assets, debt relief and reconstruction commitments, with separate promised/authorized/paid statuses.
- **Credits & Deductions:** inspect grants, security assistance, export credits and offsets with transparent accounting classifications.
- **Forms:** browse/search numbered ERS analytical forms, complete optional local-only worksheet fields, print/download a locally generated worksheet; no remote submission or false acknowledgement.
- **Report Fraud:** browse public oversight findings, contested claims, audits and corrections; allow users to draft a local citation-backed report/export, but do not claim an allegation has been filed with an authority.
- **Transcripts:** select jurisdiction and period → printable, source-linked chronological statement; explicit no-data state.
- **Notices:** search a notice identifier and open its full documented record, evidence and revision history.
- **Guided help:** decision-tree prompts resolve to the right real page and preserve selections.

### Interaction and content fidelity requirements

- Desktop mega-menu grouping; mobile disclosure navigation; Search always keyboard-operable.
- Accessible accordion Help sections, visible search results and empty states, clear active navigation, breadcrumb and contextual related links.
- IRS-style form detail: title, number, revision date, purpose, who uses it, instructions, related schedules, downloadable/printable version.
- IRS-style notice detail: notice ID, issue date, why this record exists, what the evidence shows, options to review/dispute, related sources.
- Page copy must answer **who is this for, what can I do, what information do I need, what happens next**.
- Responsive hierarchy, blue links, light surfaces, restrained type, generous whitespace, dense but readable tables.
- No dummy sign-in, identity PIN, payment processing, pretend customer-service contact, or fake case submission.
- Search must index tasks, forms, jurisdictions, actors, events, notices, glossary and source titles; provide keyboard submission, result grouping and zero-results guidance.

### Additional acceptance gates

- Homepage task-first hierarchy matches the inspected IRS site rather than a research dashboard.
- Six main nav categories and mobile equivalents work; Report Fraud exists.
- Audience-specific help is genuinely distinct.
- All six top-level tasks have working read-only paths and meaningful outcomes.
- Forms, notices, transcripts and guided help behave like administrative tools, not static parody copy.
- The same evidence can be discovered from a task, jurisdiction, event, form or source.
- Source audit date and reference URLs remain in this spec for cold boot; recheck IRS design if implementation occurs significantly later.

## 2B. Full-service parity map — IRS reference expansion

Reference: https://www.irs.gov/ (inspected 2026-11-04). Replicate the **depth of administrative service**, not merely six labels. The live IRS has nested menus, audience centers, task search, transcripts, identification numbers, amended returns, account records, payment plans, withholding, penalties, refunds, forms and instructions, fraud referrals, help, announcements, and government-entity services.

**ERS translation and required route families**

| IRS family | ERS service family | Functional artifact |
|---|---|---|
| Individuals / businesses / governments / international filers | Sovereign states / arms suppliers / multinational concessionaires / intermediary governments / affected jurisdictions | Distinct service centers with tasks, rules, forms and records |
| Tax ID / EIN | External Revenue Account Number (ERAN) | Deterministic public account reference derived from record IDs; never a real identifier |
| File / amend return | Register arms transfer, policy undertaking, concession or reconstruction schedule | Locally generated read-only filing worksheet and amendment comparison |
| Tax records / transcripts | Sovereign intervention, resource and procurement transcript | Printable, chronological source-linked statement |
| Make payment / payment plan | Remit assessed assets / phased strategic transfer | Read-only schedule of documented commitments, installments and transfers |
| Withholding / estimated tax | Export royalty withholding / projected concession receipts | Calculators clearly distinguish user-entered scenarios from historical data |
| Credits / deductions | Military assistance credits, reconstruction offsets, stabilization expenditure deductions | Transparent category-specific worksheet with provenance |
| Refund status | Restitution, returned assets, cancelled debt and reconstruction obligations | Documented status timeline |
| Forms / publications | ERS returns, schedules, instructions, notices, bulletins | Numbered, dated, printable documents and revision history |
| Penalties / collections | Noncompliance assessments, sanctions, seizures, enforcement expenditures | Source-linked historical record, never a fabricated real legal demand |
| Report Fraud | Contract fraud, diverted aid, procurement misconduct, unlawful expropriation | Source-backed oversight index and local report worksheet |
| Taxpayer advocate / appeals | Sovereign advocate / assessment review | Explain competing claims and produce a local appeal record |
| News / updates | Policy actions, sanctions, arms notifications, contract awards, restitution changes | Dated entries with primary links |
| Government services | Intergovernmental agreements, concessions, security assistance | Government-facing procedural center |
| Tax professional center | Contractors, auditors, legal counsel and procurement intermediaries | Specialist record navigation and forms |

**Priority product domains:** (1) arms sales and military procurement, (2) policy leverage and conditionality, (3) land/resource concession and transfer to global corporations, (4) enforcement and sanctions, (5) reconstruction and recurring dependency. For land and resources, record original owner/authority, recipient, legal instrument, acreage or mineral rights where documented, term, consideration, beneficiary, and affected population; do not infer a transfer from mere investment.

**Copy rule:** remove homepage and page-level meta-commentary about the site's art-project status, mock status, or incompleteness. The experience should be written in the ordinary administrative voice. Keep a discreet, truthful attribution/provenance link in the footer and avoid falsely claiming U.S. government authorization. Do not invent official powers, real notices, bank instructions or legal obligations.

**Definition of completeness:** a menu item is not complete until it leads to a meaningful task, record, form, calculation, comparison, or source. No generic destination pages reused as placeholders. Implement the full menu taxonomy and actual deep links, then populate each route with evidence-backed content. The first committed application is an incomplete scaffold, not parity.

## 3. Primary information architecture

**Homepage**
- Header search; global nav: File / Pay / Refunds / Credits & Deductions / Forms / Report Fraud. Account, Notices and Help are utility/contextual links.
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
