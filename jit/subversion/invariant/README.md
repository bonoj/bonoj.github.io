# INVARIANT — litigation without a human interface

**Status:** Approved concept and implementation specification; site not yet built.
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

## Eighteen functional faces

The eighteen are the institutional presentation layer, not the underlying legal team. Candidate offices: Intake, Evidence, Discovery, Research, Precedent, Claims, Remedies, Valuation, Negotiation, Correspondence, Objections, Procedure, Deadlines, Appeals, Conflicts, Quality, Records and Continuity. Give each a distinct dignified persona and title; never call them a licensed attorney or invent bar credentials. All actions converge on the same intake interface. The actual machine has one canonical matter state.

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
- Do not implement or deploy until the next explicit build instruction.
