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

## Creative directions archive — November 9, 2026

**Status of everything below: exploration, not a build commitment.** This archive preserves mutually exclusive possibilities, discarded detours, and unresolved choices so that a future return does not mistake one conversational iteration for a settled requirement. The owner explicitly does **not** want to build this now and may never build it. No implementation, deployment, research campaign, or reminder is implied.

### The actual motive and its limits

The original impulse was an exuberant alternative to a personal “Believe it or not, John isn't at home” answering machine: **leave John alone already, and recognize how absurd it is to assume someone else must solve your problems**. The reference was George Costanza's cheerful answering-machine avoidance, not a demand for a solemn institutional service. A site should be sendable to real people, including family, without suggesting the sender is missing, deceased, unsafe, or in crisis.

The strongest subsequent insight was to **remove John almost entirely**. The public experience need not know or mention him. Its real joke is the assumption that another person's attention is an entitlement. A visitor's practical problem may be real; their selection of a convenient acquaintance as its default owner may be ridiculous. A usable alternative route makes the joke sharper.

**Foundational doctrine:** “The existence of a problem does not establish the availability of another person.” Another useful formulation: “Eligibility to request assistance does not establish another person's availability to provide it.” The experience should distinguish asking for help, legitimate responsibility, consent, capacity, and presumed obligation.

### Naming and institutional identities explored

- **Office of Availability** — strongest developed working title; inverted government eligibility office, determinations and jurisdiction, deliberately earnest.
- **Elsewhere** — “The right place for your problem.” Elegant, minimal, a place that directs visitors away.
- **Appropriate Channels** — “Every problem has somewhere to go.” Particularly bureaucratic.
- **Independently** — “You've got this.” Affirmative, less barbed.
- **Next Step** — “Start here. Go forward.” Most directly useful.
- **Not Here** — “We know where to send you.” The refusal is explicit.
- **The Independence Desk** — preliminary routing prototype label.
- **Everybody's Problem** — considered and rejected as insufficiently precise.
- **Believe It or Not, John Isn't at Home** — original personal answering-machine concept, now an ancestor rather than desired public identity.

Do not choose a final name by default. A government-inspired institution can have a serious identity while the decisions reveal the satire.

### Visual concepts and why they changed

1. **Luxury hospitality / Aman / Six Senses:** immaculate serenity and protected personal time; “His peace is our highest priority,” “We look forward to not welcoming you.” Powerful visual contrast, but risks making a useful routing service look like a resort.
2. **Aesop:** botanical, amber-glass personal-care products for Silence, Distance, The Last Favor. Strong editorial identity; product satire distracts from routing.
3. **Rimowa:** departures, travel, no return itinerary, canceled obligations. Cinematic but literal.
4. **Bang & Olufsen:** engineered silence, noise cancellation for “everyone”; elegant product imagery.
5. **Porsche:** zero obligations and an open road; performance metaphor.
6. **Apple:** Do Not Disturb Pro, unavailability as a product launch.
7. **Luxury funeral home:** memorial to the death of availability; amusing but rejected because a family recipient could mistake it for an alarming message.
8. **Serene apocalypse:** a woman in flowers and sunlight, untroubled amid ruins and disaster. The point is **not** that she caused the catastrophe; she is simply not volunteering to manage it. Possible line: “I see that you're having an emergency. I'm having a lovely afternoon.” Emotionally resonant, but too theatrical or ominous for the eventual utility.
9. **Architectural minimalism:** one exceptional open doorway, quiet civic interior, or empty chair, then no photography inside the questionnaire.
10. **Pure editorial:** no photography; precise typography, institutional spacing, restrained seal, exceptional question and determination design.

**Current inclination:** at most one restrained image on the landing page, possibly none. Imagery is optional, not an asset-production prerequisite. No stock-photo repetition or immersive visual spectacle.

### The global-jurisdiction detour

A global Office was entertained because it makes the government's obsession with **availability** as elaborate as its obsession with **eligibility**. The first task might be selecting the jurisdiction of the problem **manually**, with no geolocation. The comic privacy premise: “We do not determine your location automatically. You are presumed to know.” User-controlled jurisdiction is also a genuine privacy advantage.

Possible questions: country, then province/state when required; where the problem occurred versus where a provider is based. Universal responsibility/consent questions need no geography. Jurisdiction-specific labor, consumer, medical, emergency, and legal routes may require it. Global coverage would require a separately audited destination registry and cannot be assumed just because a country appears in a selector. Unknown/unsupported regions need a truthful outcome, not fabricated agencies.

**Counterargument, which became decisive:** a global help desk is a massive diversion from the original joke. Geographic selection should be conditional unless the opening ceremony itself is judged worth the friction. Do not treat “global from day one,” mandatory country selection, or comprehensive jurisdiction coverage as approved requirements. Preserve them as optional concepts.

### The war-crimes / Hague contrast

The possibility of war-crimes reporting to the International Criminal Court in The Hague was exciting because it demonstrates how broadly a formally neutral availability institution might range—from broken appliances to alleged atrocities. However, **The Hague is not a universal complaint desk**; ICC jurisdiction and reporting mechanisms are specific. Such a branch would require a verified, direct reporting destination, safety-sensitive framing, and no collection of evidence on this site.

The subsequent realization: this is precisely the sort of grand global service ambition that can swallow the satire. Keep the contrast as an optional surprising branch or conceptual example, **not** a mandate to create an international justice directory. Serious issues receive prompt, competent referrals without comedic interrogation.

### The sharper visitor workflow (preferred exploration)

A government **eligibility interview inverted**. Instead of “Do you qualify for assistance?” ask “Is the person you intend to involve actually responsible, willing, or available?”

**A. Establish the problem.** Familiar choices: something broken; need someone to do something; upset about something; paperwork; transport; household maintenance; money; work; caregiving; medication; interpersonal conflict; immediate danger. The domain gives specificity to the questions and any eventual external resource.

**B. Establish responsibility.** Who owns it? Who provides the service? Who has authority? Is the proposed helper responsible, or merely familiar and convenient?

**C. Examine prior action.** Have instructions been read? Has the responsible service been contacted? What safe independent action has been tried? Is the obstacle inability, lack of access, cost, or preference for delegation?

**D. Determine availability.** Has the intended helper agreed? Is the help voluntary, required, or assumed? Does the person have an actual duty? What happens if they decline? Distinguish a legitimate care duty from assumed unlimited availability.

**E. Issue a determination.** A beautiful, sober, contextual finding with an appropriate next step and, where relevant, a verified external resource. The link is often **the punchline**, not the product: an obvious manufacturer, utility, service provider, agency, or professional that could have been contacted instead of the acquaintance.

Possible determinations:
- **Self-Service Available** — instructions and capability are present.
- **Responsible Provider Identified** — a paid or obligated organization should handle it.
- **Voluntary Assistance Required** — asking is allowed; declining is allowed.
- **Personal Availability Not Established** — knowing someone does not make them the default service provider.
- **Professional Intervention Indicated** — a qualified professional or legitimate support network is appropriate.
- **Immediate Response Required** — skip the theater and seek urgent help.

A conceptual four-question interaction was explored: problem type → responsibility → attempted solution → whether the intended person agreed. It is **illustrative, not the final graph**. The real flow should branch contextually, exit early where sensible, and never force a rote four- or twelve-question sequence.

### Examples of revealing paths

**Television or appliance:** owner, manufacturer's documentation, prior troubleshooting, warranty/service support. “The responsible party has been identified.” Link to the actual manufacturer's official support when known. Do not invent a manufacturer.

**Household maintenance:** is it the visitor's home? Owner, tenant, landlord, utility, or professional duty? A tenant may have a legitimate right to repairs; avoid reflexive self-help.

**Emotional demand:** are they in danger or seeking support? Is the intended listener available and consenting? Suggest appropriate willing support or professional resources without implying that emotional needs are illegitimate.

**Bureaucratic paperwork:** who holds the records? Have the official instructions and actual issuing agency been consulted? Does the visitor have authority to act? “Are you seeking permission for a decision you already have authority to make?”

**Caregiving and medication:** assess urgency and existing professional care plans; route to prescriber, pharmacist, care coordinator, or emergency services when appropriate. Do not turn medical uncertainty into a self-sufficiency joke.

**Employment and finance:** identify employer, payroll provider, regulator, bank, consumer service, or official dispute channel. An external institution may owe a concrete duty.

**Catastrophic/serious issues:** immediate danger exits immediately; no clever interrogation. Serious international allegations require appropriate reporting channels, not a generic personal helper.

### Curated uncomfortable question bank

These are possible prompts, not a fixed sequence or a moral verdict:

- “Is this a problem you cannot solve, or one you would prefer not to solve?”
- “Whose property, account, obligation, or decision is involved?”
- “Is the person you intend to contact responsible for this?”
- “What has that person agreed to do?”
- “Have you asked whether they are available?”
- “Are you seeking assistance, permission, reassurance, or an audience?”
- “What have you attempted without involving them?”
- “Have you read the instructions already available to you?”
- “Have you contacted the organization paid to provide the service?”
- “What prevents you from taking the next step yourself?”
- “Would you accept this request from someone else under the same circumstances?”
- “If this person declines, what will you do next?”
- “Is your deadline a genuine emergency or a consequence of a delayed task?”
- “Are you treating someone's previous willingness as a standing commitment?”
- “Does this request require their expertise, or merely their time?”
- “Would a professional, service provider, or public agency be more appropriate?”
- “Is there a safety, accessibility, financial, or caregiving reason independent action is not feasible?”
- “Have you mistaken the existence of a contact for the availability of a service?”

Avoid loaded premises when circumstances are unknown. The questions should be occasionally piercing because they expose an assumption, not because the Office humiliates people.

### Branch design principles

- **The satirical target is entitlement, not need.** A real disability, duty of care, emergency, or unavailable service can change the determination.
- **Not every outcome is “do it yourself.”** Variety gives the institution credibility; sometimes the visitor is owed help by an actual provider.
- **Questions do double duty:** improve the real referral and expose an assumption about someone else's time.
- **No fake dead ends:** no recursive tickets, no submission that fails for laughs, no pretense of filing an official complaint.
- **No personal intake:** don't collect free-text stories, contact details, evidence, exact locations, or names.
- **No default personal escalation:** the site does not forward, notify, or disclose the private person it protects.
- **The Office can be funny without being cruel.** Tone should become more sober as consequences become more serious.
- **A little embarrassment is a possible outcome, never an explicit objective of punishment.**
- **External links are concrete and contextual**, but the site is not obligated to become a comprehensive public-services directory.
- **Short paths are good paths.** A visitor who has established the answer should be released, not kept for engagement metrics.

### Possible homepage language

- **Office of Availability**
- **Preliminary Availability Determination**
- “The existence of a problem does not establish the availability of another person.”
- “We help identify the appropriate next step.”
- “Your request has been reviewed. Personal availability has not been established.”
- “The responsible party has been identified.”
- “This matter is within your existing authority to resolve.”
- “No accounts. No appointments. No unnecessary conversations.”
- “Please locate the organization responsible for this service.”
- “Thank you for your continued independence.”

These are candidates; do not publish them wholesale. The public institution should remain sincere and avoid explanatory satire labels.

### Boundaries on scope and future work

The prior specification's **12–15 domains, 8–15 scenarios per domain, global registry, and six-phase release plan** were aspirational scaffolding from an earlier, broader direction. They are **not approved quotas or an active roadmap**. If the project ever resumes, start by deciding whether it is primarily a satirical boundary experience or a serious public-service router, then choose only the smallest set of branches that makes that identity work. Breadth without comedic purpose is scope drift.

Preserve both possible poles:
- **Focused satire:** few sharply written, recognizable dilemmas; satisfying determinations; occasional real external links; strong identity.
- **Expansive public-service utility:** many audited domains and jurisdiction-aware destinations; significantly greater maintenance burden; risks obscuring the founding joke.

The current preference is the focused satire, with real utility where it earns its place. **Do not build, deploy, commission imagery, audit hundreds of links, or set a reminder unless explicitly requested later.** This document is an archive of possibility, not a pending assignment.
