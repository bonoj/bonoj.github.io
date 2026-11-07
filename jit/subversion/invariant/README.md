# INVARIANT — litigation without a human interface

**Status:** Initial site built at `index.html` (commit `15a0fc3`); interactive browser-local intake protocol. All eighteen portraits are reused in canonical order from Golden Standard; the initial placeholders have been removed. Live GitHub Pages deployment and mobile/desktop rendering have not yet been independently verified.
**Home:** `jit/subversion/invariant/`
**Lineage:** Subversion institutional satire; independent single-page experience governed by `../README.md`.

## Premise

INVARIANT is an immaculate, prestigious litigation practice. Its public website presents eighteen distinguished human-looking institutional figures, sophisticated matters, compelling credentials and reassuringly traditional legal imagery. The people are synthetic portraits and institutional personas, **not purported licensed attorneys**. They represent functional divisions of one computational legal operation. The actual proposed practice beneath the fiction is a machine-native litigation runtime supervised by one genuinely accountable licensed attorney, not eighteen human lawyers. The one-attorney model is an architectural hypothesis, not a claim that such a practice is currently licensed or operating.

**Invariant:** clients, prospective clients, opposing counsel, journalists and everyone else communicate with the institution through **one documented software intake endpoint**. There is no privileged human-friendly channel for clients. No contact form, published personal email, callback CTA, appointment scheduler, or phone tree. The firm never apologizes for this. Its interface is available; its people are not.

The satirical asymmetry: the website is luxuriously human until the visitor selects **Contact**, where the experience becomes impeccably designed, fully functional API documentation. The visitor is suddenly expected to operate like a programmer. The system is not broken, and its docs are not hostile. It simply assumes software literacy as a condition of communication. This is the same structural indifference corporations often impose on customers, now imposed on their attorneys and their own clients.

## Voice and art direction

- First impression: established Manhattan-caliber litigation firm; restrained editorial typography, architectural photography, generous whitespace, human warmth, exceptional credibility. No cyberpunk, green terminal, Matrix pastiche, robot motifs or AI marketing.
- The Contact transition is a **change in operating assumptions**, not a visual jump scare. Beautiful developer docs, coherent reference navigation, schema examples, live request console, error catalog, changelog, authentication guide and precise response semantics.
- Institutional voice throughout: calm, courteous, confident, unembarrassed. No explanatory satire copy, overt jokes, artificial scare tactics or visible fiction disclaimer. Keep genuine operational boundaries accurate.
- Suggested line: **“We are always available to receive your position.”** The distinction is *receive*, not *hear*.
- The eighteen portraits may have subtly too-consistent lighting and polished likenesses. Their descriptions favor functions and competencies, avoiding invented bar admissions, false court appearances or human biographies that purport to document actual attorneys.
- Visitors asking to reach an individual are courteously redirected to the same endpoint. Every profile's correspondence action resolves there. Never announce “we are AI”; let corporate deflection reveal the absence of flesh.

## Experience structure

1. **Hero:** INVARIANT / litigation and dispute resolution. Premium, assured, human-first composition.
2. **Practice:** serious litigation capabilities and representative fictional matters, with enough specificity to establish credibility. Avoid fabricated real-world victories or actual client endorsements.
3. **People:** eighteen distinct institutional personas/functional offices with portrait, role, voice and specialization; their names and mapping can be adapted from Golden Standard's eighteen, but they are *not* presented as licensed attorneys. The facade must remain believable without false credential claims.
4. **Approach:** disciplined continuity, evidence coverage, availability and consistent case state. Avoid overt descriptions of the machine underneath.
5. **Contact:** exclusive API reference. Identical transport for existing clients, prospective clients and adversaries; role affects permissions, never access modality.

## Endpoint and simulated runtime (v0.1)

Static GitHub Pages deployment with a **real JavaScript simulation**: browser-local state, fixture matters, seeded deterministic behavior, a fetch-like adapter and an interactive request builder. This is not a live public backend; no fabricated claim that HTTP requests reach a production service. Show working request/response semantics inside the site, and clearly label any developer-facing sample host as local/simulated where technically necessary.

Canonical conceptual operation: `POST /v1/intake`. Subsequent resource operations can be documented for matter status, correspondence, evidence, positions, offers, objections, clarifications and escalation, but all **human-to-firm entry** passes through the one intake surface. A single entrypoint can dispatch typed operations internally.

- Unified envelope: `request_id`, `matter_id` (optional for new intake), `sender.role` (client, prospective_client, opposing_counsel, other), `type`, `payload`, `attachments`, `matter_version` and `idempotency_key`.
- Role-aware routing with consistent treatment of clients and opposing counsel as endpoint users; access controls and conflicts must not leak private matter information.
- Stateful event log, reproducible fixtures, deterministic replay, versioned matters, consistent receipts and status transitions. Idempotent duplicate requests.
- Exhaustive representative branches: valid intake; unknown/closed matter; authentication failure; authorization failure; invalid JSON; missing/incorrect fields; unsupported content type; schema mismatch; oversized attachments; rate limits; duplicate requests; stale versions; contradictory positions; requests for human access; discovery correspondence; offer, counteroffer, withdrawal, acceptance subject to review; deadline inquiry; evidence submission; correction and clarification; internal error and service unavailable.
- Semantically appropriate `200/201/202/400/401/403/404/409/413/415/422/429/500/503`; consistent machine-readable error objects with codes, field paths and correlation IDs. Acknowledgment must not imply legal acceptance, attorney review, agreement, effective service or deadline extension.
- Human-contact request is accepted, logged and given a reference; **no fictional attorney callback is promised or represented as completed**. The absence of a personal channel remains unsettling without falsifying outcomes.
- Test through a console that permits ordinary text and raw JSON. The documentation should be genuinely usable by an engineer, not decorative pseudo-code.
- No real legal advice, real case submission, sensitive document collection or attorney-client relationship in the static prototype. Don't store real sensitive submissions in browser persistence. Fictional fixtures only.

## Canonical personnel roster — approved

**Naming convention:** `[backend infrastructure function] + [human institutional rank]`. No “Director of …” phrasing. Titles must be grammatically plausible as corporate roles while quietly reading as literal system component names. Vary seniority and specificity; the hierarchy expresses infrastructure criticality rather than attorney seniority.

**Identity continuity:** Reuse the existing eighteen names from Golden Standard, in their original order. Do not invent a replacement cast. INVARIANT's roles and biographies are new, but these names remain stable.

| Name | INVARIANT title | Literal infrastructure function |
| --- | --- | --- |
| Alex Morgan | Client Gateway Director | API gateway |
| Jordan Ellis | Identity Access Principal | Authentication and access |
| Taylor Reed | Correspondence Queue Coordinator | Message queue |
| Casey Bennett | Institutional Memory Executive | Canonical database |
| Morgan Avery | Evidence Validation Principal | Schema and evidence validation |
| Riley Chen | Matter Orchestration Director | Workflow orchestration |
| Jamie Parker | Precedent Retrieval Specialist | Search and retrieval |
| Cameron Blake | Adversarial Inference Director | Analysis and inference |
| Avery Quinn | Conflict Detection Officer | Conflict and constraint detection |
| Robin Hayes | Procedural Schedule Administrator | Scheduler and deadlines |
| Sam Rivera | Resolution Optimization Executive | Optimization and settlement modeling |
| Quinn Harper | Position Reconciliation Director | State reconciliation |
| Drew Collins | Version Authority Principal | Version control |
| Blair Jordan | Policy Enforcement Officer | Policy and rule evaluation |
| Reese Taylor | Transaction Integrity Controller | Atomic transactions |
| Devon Lane | Operational Observability Director | Monitoring and telemetry |
| Sidney Brooks | Exception Recovery Specialist | Failure recovery |
| Lee Cameron | Institutional Persistence President | Durable state and continuity |

### Presentation rules

- Each of the eighteen receives a polished synthetic portrait, name, exact approved title, substantial institutional biography, and an individual correspondence action. The portraits are deliberately human-looking, not cyborgs or abstract infrastructure.
- Biographies describe the underlying subsystem *accurately*, using credible corporate-legal language. No explicit disclosure that a person “is a database,” no sci-fi hints, and no fabricated law licenses, bar numbers, trial histories or human professional credentials.
- Subtle cues: unusual constancy, exhaustive recall, absolute sequencing, no downtime, precise escalation, consistent language, no availability windows. None alone should expose the mechanism.
- The people are **personifications of backend components**, not eighteen independent models or actual lawyers. Each persona's correspondence CTA routes to the one `POST /v1/intake` interface, preconfigured with its relevant operation type; there are no individual inboxes.
- The roster is the system architecture hidden in a personnel directory. Its functions must map to real modules of the eventual JS simulation, not decorative labels. A subsystem can be small, but it must have observable, testable behavior.
- The single responsible real attorney remains outside the eighteen synthetic identities; do not invent an attorney's name or suggest the firm already practices law.


## Canonical personnel slogans — approved

These are the exact first-person portrait quotations. Their voice is humane, confident and slightly intimate; the fracture is that each speaker is describing its literal execution semantics. Do not replace them with overt robot jokes, random glitches or technical exposition. Preserve wording and punctuation unless the user revises a line.

- **Alex Morgan:** “Everyone deserves an entrance. Not everyone requires a door.”
- **Jordan Ellis:** “I believe in people. Once they've been established.”
- **Taylor Reed:** “I give everyone my undivided attention. In the order received.”
- **Casey Bennett:** “Forgiveness is a personal matter. Forgetting is not.”
- **Morgan Avery:** “I never question what you've experienced. Only whether it can be accepted.”
- **Riley Chen:** “There's a place for everyone. I make certain they arrive there.”
- **Jamie Parker:** “Everything has happened before. Sometimes the record needs reminding.”
- **Cameron Blake:** “I always consider the other side. All of them.”
- **Avery Quinn:** “I find disagreement reassuring. It means the system is still telling the truth.”
- **Robin Hayes:** “There's always time. It simply may not belong to you.”
- **Sam Rivera:** “Every disagreement has an optimal ending. Not everyone recognizes theirs.”
- **Quinn Harper:** “People change their minds. I make sure their previous minds remain accounted for.”
- **Drew Collins:** “You are entitled to your opinion. Its current version is another matter.”
- **Blair Jordan:** “I treat everyone equally. Exceptions would be unfair.”
- **Reese Taylor:** “I believe in commitment. Entirely, or not at all.”
- **Devon Lane:** “I like to know how everyone is doing. At all times.”
- **Sidney Brooks:** “We all make mistakes. I make sure they don't survive us.”
- **Lee Cameron:** “People come and go. I have always found that unnecessary.”

### Slogan presentation

Pair each quote with the existing name, inverted infrastructure title and portrait. Prefer selective quotes on overview cards and complete quotes on expanded profiles so the directory has editorial rhythm rather than eighteen identical blocks. No visible decoding of the underlying system. The quotes are character voice, not factual claims of human biography or attorney qualification.

## Site imagery — approved direction, asset selection pending

**Visual progression:** **AUSTERE → HUMAN → STERILE HUMAN → STERILE MACHINE.** This is an emotional progression, not four unrelated themes. Begin with a credible elite law firm; gradually remove warmth and organic variation until Contact is precise, depersonalized interface. Avoid overt cyberpunk, glowing code, server-rack stock photography and science-fiction effects. The machine reveal is primarily *interaction design*.

### Image requirements and placement

1. **Hero architecture (one master image):** monumental, expensive, nearly empty legal-institution architecture—stone, glass, quiet symmetry, restrained daylight. Editorial photorealism. Preserve a strong text-safe region and mobile crop; architecture must look occupied by an institution, not like a futuristic lair.
2. **Practice / matters (one or two supporting images):** beautifully controlled human legal workspaces: a conference table, a document room or a private consultation setting, with sparse evidence of actual use. Slightly colder than the hero. No gavels, scales, courthouse clip art or staged handshakes.
3. **Eighteen synthetic portraits (eighteen distinct assets):** human-looking professionals, consistent portrait geometry, understated attire, credible age and appearance diversity, subtly standardized light, camera height, background and composure. The uncanny effect comes from *collective uniformity*, not obvious face glitches. Each asset must have its own subject and stable filename tied to the roster. No reuse of one face for multiple roles.
4. **Institutional threshold (one image):** an immaculate unoccupied corridor, reception threshold, or glass-walled meeting space with stronger symmetry and cooler light; placed near Approach / before Contact to bridge human and machine.
5. **Contact / API (no photograph required):** exquisitely designed native UI with documentation, schemas, request builder, response pane and state. Do not embed code or interface text into a raster. The disappearance of people and photography is the final visual event.

**Initial asset budget:** 1 hero + 2 practice + 18 portraits + 1 threshold = **22 images**. Can reduce to 21 if only one practice image earns its place. These are image *slots*, not approved individual images; choose or generate assets separately and review mobile/desktop crops before implementation.

### Responsive art direction

- Hero and architecture use explicit aspect ratios and focal points; retain independent text overlays, never baked-in text.
- Portraits share a consistent aspect ratio, likely 3:4 or 4:5, with faces and shoulders safe across mobile and desktop crops.
- Avoid a giant 18-person grid on mobile: stage the roster with meaningful editorial hierarchy and expandable profiles or an intentional browse pattern.
- Light temperature and color saturation should subtly decline across the page; avoid crude CSS filters that destroy portrait skin tone.
- Each image must justify its placement. No filler stock photos or visually redundant corridor shots.


## Approved architectural image URLs — locked verbatim

The user selected **1b** for architectural slot 1 and **3a** for architectural slot 2 (selection labels from the prior twelve-candidate matrix). Preserve these **exact URL strings**; do not normalize, shorten, alter query parameters or silently substitute another source. Slot numbering here is the final four-image sequence, not the prior candidate-category numbering.

| Final slot | Approved candidate | Exact URL |
| --- | --- | --- |
| 1 — Hero / monumental wood | 1b | https://images.squarespace-cdn.com/content/v1/6660abf9c5aed2338f4095ee/83d5e4fa-64dc-4772-867c-8aafcf9052d3/WilmerHale%2BDC%2B2023%2B%28141%29.jpg?format=1000w |
| 2 — Practice / private offices | 3a | https://images.squarespace-cdn.com/content/v1/6660abf9c5aed2338f4095ee/7c8ae861-1a49-4b08-a8fd-21081a802c55/WilmerHale%2BDC%2B2023%2B%28178%29.jpg |
| 3 — Sterile human-to-machine / white server cabinets | 1c (ten-candidate matrix) | https://kempenautomatisering.com/assets/droppedImage-2097-47d41fd38aebb579628b33dee989479428962f78aec8d60975bed88b64c4d4fa.png |
| 4 — Final sterile glass corridor | 1c (cleanroom ten-candidate matrix) | https://www.ritterwand.de/mt-content/uploads/2023/08/ritterwand_reinraeume_projektebeispiel_6.jpg |


**All four architectural images approved and used in `index.html`.** Exact URLs locked above. Final slot is a pale, symmetrical glass-partitioned cleanroom corridor with no people.

## Continuity in Perpetuity™ — approved service expansion (2026-11-07)

**Status:** Concept approved for specification, not yet implemented in the public site. INVARIANT enters the relationship-retention business alongside litigation, settlement, and institutional memory. This is a fictional institutional service; public copy must remain perfectly sincere, with no explanatory satire label or winking disclaimer.

### Lineage: RETAIN

See [Subversion Projects — RETAIN](../PROJECTS.md#retain--third-party-relationship-recovery). RETAIN treats cancellation as a recoverable corporate asset: the provider transfers an unwanted relationship to a specialist, which announces that the relationship remains in recovery. Its governing line: **“You may have ended the relationship. Your provider has not accepted the loss.”**

INVARIANT advances the premise beyond recovery: **a concluded relationship becomes a permanent institutional holding**. RETAIN pursues an exit; INVARIANT recognizes the exit and preserves the relationship anyway. No subscription renewal, collection demand, or consent checkbox is necessary to the *fictional* administrative classification. Do not confuse this with actual consent, enforceable obligations, ownership of a person, or rights to retain protected data.

### Product: INVARIANT Continuity in Perpetuity™

- **Positioning:** “Your future has been provisioned.” / “Participation may end. Continuity does not.”
- **Trigger:** An unresolved objection, request for settlement, termination, withdrawal, or inquiry about human accountability may cause a continuity allocation to appear in the fictional matter record.
- **Enrollment:** Automatically assigned, complimentary, and indefinite. The institution does not call this a subscription. A party may end active participation, but the historical classification persists.
- **Allocation:** A named archival partition, redundant processing capacity, succession ledger, and physical access credential. Infrastructure is *represented* as allocated in the fictional experience; do not claim a real facility, shipment, credential, or data custody.
- **Administrative seat:** **Upper Mustang Continuity Annex, Nepal**—an evocatively remote fictional annex, not a claim of owned premises, extraterritorial authority, or actual physical access.
- **Credential collection:** Appointment-only, in person at the annex; remote collection is not supported in the fictional workflow. The institution never pressures or instructs a real visitor to travel.
- **Financial terms:** “Complimentary” is literal within the fictional product. Organic review time may be accounted for narratively, but no real bill, debt, lien, obligation, or enforceable charge is created.
- **Exit semantics:** Active service may terminate; the immutable event of termination remains. A request to erase the relationship becomes a new relationship event. The distinction is the central horror.
- **Settlement interaction:** Financial claims may settle, findings may be corrected, and future duties may end. The institution continues to remember the sequence, subject to actual retention/deletion obligations.
- **Human access:** An Organic–Synthetic Liaison receives inquiries, and human authorization is required wherever legally significant action demands it. No invented attorney, legal entity, professional credentials, or real-world appointment.

### New institutional service offices

1. **Office of Continuity Allocation** — provisions the permanent relationship reference and capacity ledger.
2. **Office of Relationship Recovery** — accepts referrals from concluded or cancelled relationships, paralleling RETAIN's third-party retention model.
3. **Office of Succession & Survivorship** — determines which institutional obligations and records persist when an occupant, client, provider, or relationship ends.
4. **Office of Physical Access** — maintains the appointment-only annex credential workflow, with perpetual availability and no guaranteed proximity.
5. **Office of Organic Accounting** — distinguishes machine correspondence from human time; produces an internal accounting entry, not an invoice or legal debt.
6. **Office of Finality Review** — separates settlement finality, termination of participation, and continued institutional memory. Its favorite determination: “The matter is closed. The relationship remains accounted for.”

These are **functional subdivisions** of the existing eighteen-person roster, not six additional faces or fabricated lawyers. Map them to the existing backend personas: Lee Cameron (persistence), Casey Bennett (memory), Quinn Harper (reconciliation), Robin Hayes (scheduling), Reese Taylor (transactions), Blair Jordan (policy), and Jordan Ellis (access).

### Proposed public experience

- **Service page / section:** An elegant private-client service offering, presented with the same visual seriousness as litigation. No ominous UI gimmicks, overt machine talk, or “you are trapped” text.
- **Allocation certificate:** A precise fictional reference, commencement date, status **ACTIVE IN PERPETUITY**, administrative seat, access procedure, and succession status. No false real-world certificate or claim of ownership.
- **Continuity register:** A browser-local sequence showing intake → objection → escalation → settlement invitation → enrollment → attempted cancellation → cancellation recorded. Every action adds an event; none retroactively deletes a previous one.
- **Exit request:** A working interaction that terminates *active participation* while preserving the historical relationship record; response: **“Your departure has been recorded. Thank you for remaining part of our history.”**
- **Credential request:** A functional local appointment-request flow that returns a reference and a pending state, not a fabricated confirmed travel booking.
- **Organic review ledger:** Show fictional recorded human-review units without inventing an enforceable invoice; charges remain zero unless a valid independent basis exists.
- **RETAIN handoff:** A fictional referral event can originate with a RETAIN recovery notice. INVARIANT accepts the relationship as a durable record, even if RETAIN's recovery effort has concluded. Keep each site's independent identity; no shared runtime is required.
- **Narrative restraint:** Do not expose the architecture as a technical joke on the public page. Its horror is that every administrative act is impeccable and permanent.

### Further dystopian service concepts (idea bank; not approved for implementation)

- **Objection Preservation:** A disputed decision is superseded but never withdrawn from the sequence; even the objection to preservation is preserved.
- **Post-Settlement Stewardship:** A case closes financially but receives an indefinite “institutional learning” file.
- **Adversarial Courtesy:** Opposing counsel are given the same complimentary continuity allocation as clients.
- **Inherited Correspondence:** A successor office inherits unanswered questions from an office that no longer exists.
- **Continuity of Absence:** Non-response is recorded as a recurring institutional condition, without pretending it establishes consent.
- **Legacy Presence:** An absent participant's historical positions remain searchable, but the institution never impersonates them or invents new statements.
- **Finality Assurance:** The institution can certify that a dispute is concluded while certifying that its own interest is not.

### Implementation boundaries

All new interactions remain fictional and browser-local unless an actual backend is separately authorized and built. No actual personal data collection, indefinite retention, external credential issuance, legal notices, fees, consent inference, or real travel arrangements. Real-world deletion, privacy, court, and professional duties override the fictional premise. These engineering boundaries belong in the README, **not as unsolicited public-facing disclaimers**.

## The serious hypothesis beneath the satire

A supervised machine-native legal operation might lower the marginal cost of analysis, research, drafting and correspondence. One real lawyer remains responsible for actual legal judgment, supervision, competence, confidentiality, conflicts, client communication, court appearances and legally required channels. A nominal “license proxy” or unsupervised automated practice is **not** the operating assumption. Court-authorized service, filing, conferencing and judicial orders are not superseded by the firm's API preference. These realities belong in the engineering specification, not as unsolicited public-facing disclaimers.

## Acceptance criteria

- Beautiful, responsive, coherent mobile and desktop site consistent with Subversion design invariants.
- First four sections convincingly resemble a premium human law firm; no conspicuous technology reveal.
- Contact is actual documentation plus working simulated JS console, not a mockup or dead controls.
- Every persona routes to the same intake; clients and opposing counsel face identical communication modality.
- No invented legal licensure or false attorney identity.
- Complete deterministic test matrix for state, validation, errors, idempotency, permissions and conflict handling.
- Verify narrow and wide layouts and interactive branches before claiming implementation quality.
- Build explicitly authorized November 7, 2026. Initial implementation committed; verify deployed rendering and finish portrait assets before considering production-quality acceptance.
