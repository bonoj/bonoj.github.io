# OFFICE OF AVAILABILITY — project specification

**Status:** specification only; no implementation or deployment authorized.
**Location:** `jit/subversion/availability/`
**Parent:** [SUBVERSION](../README.md). Inherit its design invariants, not a shared shell or runtime.
**Working public identity:** **Office of Availability** (subject to editorial refinement).

## Premise

An independent, immaculate, government-inspired public-service directory concerned with **availability** rather than eligibility. Eligibility asks whether a person qualifies for help; availability asks whether a particular person or organization is actually responsible, authorized, and available to provide it.

The visitor arrives with a real problem, perhaps hoping an acquaintance will absorb it. A branching, carefully curated FAQ identifies urgency, responsibility, jurisdiction, and the next practical action. The institution is scrupulously polite and occasionally uncomfortable. Its answers point to **real, relevant external services**. The visitor should leave more capable, not merely dismissed.

**Private creative origin, never public copy:** a personal boundary and OPSEC-like separation of a private individual from other people's requests. Do not name, depict, identify, locate, or imply the schedule, family circumstances, or availability of that individual. The site is useful independently of its origin.

**Core distinction:** a request for assistance is not a claim on another person's attention. Do not imply that every problem is self-solvable or that asking for help is inherently wrong. Dependency, disability, emergencies, and legitimate care obligations require appropriate assistance.

## Institutional voice

- Sober, exceptionally courteous, procedural, credible. The institution does not explain the joke.
- Government-style determinations, routing, jurisdiction, notices, and eligibility/availability language, but **do not impersonate a government agency** or claim official powers, certifications, or authority.
- Humor is the consequence of the visitor's choices and a startlingly lucid finding, not snark or cruelty.
- Sample findings: **“The responsible party has been identified.”** / **“A request does not establish availability.”** / **“This matter is within your existing authority to resolve.”**
- Avoid false promises of intervention, mandatory “applications,” fake case numbers, pretend submissions, or a dead-end appeals process.
- Do not collect narratives, messages, names, addresses, contact details, or medical information.

## Experience architecture

A single-page, mobile-first decision service with a small editorial landing section, then the questionnaire. No sign-in, backend, AI inference, tracking, or visitor submission. All branch state remains ephemeral in the browser. Accessible back, restart, keyboard operation, clear progress where useful, and immediate escape to appropriate emergency resources.

Each question should earn its place. Aim for a substantial, realistic question bank, not a small novelty quiz. Branches must vary meaningfully by circumstance and lead to a precise next step, including an authoritative external link where available. Do not demand ten questions when two suffice.

### Decision hierarchy

1. **Safety/urgency:** immediate danger, urgent medical concern, abuse, self-harm crisis, or ordinary nonurgent problem. Urgent branches exit quickly to suitable resources, without sarcasm or gatekeeping.
2. **Problem domain:** home/maintenance, utilities, technology, finance/consumer dispute, employment/pay, benefits/government, transportation, medical/medications, caregiving, relationships/boundaries, legal/civic, emotional support, general practical task.
3. **Authority and ownership:** who owns the asset, provides the service, owes the duty, has the information, or can legally make the decision?
4. **Action already taken:** have they checked instructions, contacted the responsible organization, documented the issue, used an official support path, or tried a safe self-service option?
5. **Constraints:** inability, accessibility, cost, urgency, risk, and whether another person's assistance is legitimately necessary.
6. **Disposition:** self-service instructions; responsible provider; public service; professional help; emergency route; or a clear explanation of why the requested individual is not the default responder.

### Illustrative uncomfortable questions

- “Is this a problem you are unable to solve, or one you would prefer someone else to solve?”
- “Have you contacted the organization you pay to provide this service?”
- “Are you asking someone to perform a task you have the information and ability to perform?”
- “Does the person you intend to contact have a responsibility to address this matter?”
- “Has that person agreed to be available?”
- “If they do not respond, what is your next independent step?”
- “Is this an emergency, or is it an inconvenience with an approaching deadline?”
- “Have you read the instructions supplied with the product, medication, or service?” (For medication, do **not** recommend unsupervised changes.)
- “Is the help you need professional, practical, emotional, or simply an audience?”
- “Is the problem recurring because the responsible provider has not fixed it?”
- “Are you seeking permission for a decision you already have authority to make?”
- “Would a qualified service, public agency, or emergency responder be more appropriate than an acquaintance?”

Use these selectively and in context. Do not presume bad faith, capacity, or fault. Never shame someone in a safety-critical or vulnerable situation.

## External destination registry — initial candidates, not yet audited

Links below are **candidate official entry points**, not a claim that every destination, page, jurisdiction, or eligibility condition has been verified. Before implementation, open and validate each destination, check current scope and geography, and add specialized destinations for actual branches.

| Domain | Candidate destination | Routing purpose |
|---|---|---|
| Immediate danger (U.S.) | **911** (telephone; not a website) | Emergency response; never bury behind FAQ |
| Mental-health crisis (U.S.) | https://988lifeline.org/ | Crisis support |
| Community needs (U.S.) | https://www.211.org/ | Local community assistance |
| General federal services (U.S.) | https://www.usa.gov/ | Government service navigation |
| Consumer complaints | https://www.usa.gov/consumer-complaints | Complaint pathways |
| Consumer financial disputes | https://www.consumerfinance.gov/complaint/ | Financial-service complaint submission |
| Identity theft | https://www.identitytheft.gov/ | Identity theft recovery |
| Fraud reporting | https://reportfraud.ftc.gov/ | Report consumer fraud |
| Employment rights | https://www.dol.gov/agencies/whd | Wage and hour guidance |
| Workplace safety | https://www.osha.gov/workers | Worker safety and complaints |
| Benefits | https://www.benefits.gov/ | Benefits discovery; verify current availability and successor services |
| Medicare | https://www.medicare.gov/ | Coverage and program guidance |
| Medication safety | https://www.fda.gov/drugs | General drug information; individual questions go to prescriber/pharmacist |
| Legal aid | https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help | Find legal help |
| Disaster preparation | https://www.ready.gov/ | Preparedness |
| Technology | Manufacturer or provider's **verified official support page** | Specific device/service issue; no invented universal destination |
| Home and utilities | Actual utility, landlord/property manager, municipal service, or qualified contractor | Location- and ownership-dependent; ask only necessary nonidentifying routing questions |

Do not send every problem to USA.gov or 211. A branch is complete only when the linked service **actually fits** the visitor's issue. Clearly mark U.S.-specific routing; if geography is unknown, offer a jurisdiction choice without collecting precise location. Do not assume any organization is obliged to serve every visitor.

## Branch data contract

Keep content separate from rendering. Each node should have a stable ID, plain-language question or finding, domain, safety level, answer options, optional context, and explicit next-node or terminal action. Terminal actions carry: **why this destination**, **what to prepare**, **what to do if unavailable**, source URL, jurisdiction, and **last verified** date. Validate graph reachability, no unintended cycles, all terminal links, accessible labels, and back-navigation. No fabricated success states.

Content review should flag dead links, outdated agencies, misleading jurisdiction, duplicate branches, excessive questioning, unsafe self-help, victim-blaming, and comedic copy that obscures genuine aid.

## Visual direction

Restraint. Favor typography, disciplined whitespace, understated government-publication geometry, generous margins, clear hierarchy, and carefully measured interactions. Consider **one** exceptional architectural image (empty chair, open doorway, or quiet civic interior) only if it strengthens the landing page; no image is required. **No repeated stock photographs, apocalyptic montage, or imagery inside the decision tree.** A quiet wordmark and restrained institutional emblem may be enough.

Inherit all SUBVERSION invariants: independent single-page implementation, intentional margins and image geometry, coherent mobile/desktop design, no decorative link arrows, no unsolicited satire labels or explanatory winks, no inert controls, and rendered viewport validation.

## Editorial and implementation phases

1. **Taxonomy:** develop 12–15 realistic domains, with ~8–15 useful question/answer situations per domain as a planning target, not padding. Include common household, institutional, caregiving, financial, and interpersonal requests.
2. **Destination audit:** research and verify each real external URL, jurisdiction, scope, accessibility, and fallback. Prefer official primary sources; record review dates.
3. **Decision writing:** construct realistic branches and context-aware findings; test for inappropriate or cruel responses to vulnerable users.
4. **Prototype:** one complete vertical slice with several contrasting outcomes and proper back/restart; test narrow and wide viewports.
5. **Expansion:** add audited branches without sacrificing navigability, speed, or tone.
6. **Release:** test all terminal links and routes, emergency exits, keyboard/screen-reader interaction, and mobile/desktop rendering. Deploy only upon explicit instruction.

## Acceptance criteria

- A stranger can arrive with an ordinary problem and reach a credible next action without knowing the site's private origin.
- Many branches are realistic and sometimes uncomfortable; none are pointless loops or generic “ask somebody else” dismissals.
- Every terminal external referral is relevant, functional, and jurisdiction-aware.
- High-stakes cases route promptly to appropriate help, without ridicule or unsafe advice.
- No personal availability, location, relationship, or contact information is exposed.
- No personal data collected, no hidden messages, no backend, no fake government authority.
- Visual restraint makes the interaction itself the centerpiece.
- Specification and site remain independent under SUBVERSION's invariants.
