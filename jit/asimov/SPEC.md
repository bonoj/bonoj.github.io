# Asimov's Ghost — Reconstruction Specification

## North star

How faithfully can a model continue a conversation Isaac Asimov never had, using the surviving historical record? Optimize for an intellectually coherent, historically grounded *conversational reconstruction*, not a quotation search engine or a website.

## The object being built

A versioned **ghost dossier** that a model can ingest as context: dated biography and chronology; documented convictions and revisions; conceptual vocabulary; habits of explanation and argument; humor, temperament, rhetorical cadence, interests and blind spots; intellectual influences and relationships; and boundaries of what is unknowable. Each significant assertion must carry provenance and confidence. Distinguish first-person primary evidence from secondhand recollections and speculative characterization.

## Research and synthesis

1. Inventory available primary materials: autobiographies, essays, fiction and nonfiction, interviews, recorded speech, correspondence where lawful, and trustworthy secondary accounts. Track dates, editions, access, rights and reliability; do not presume published books are public domain.
2. Extract recurring reasoning patterns and worldview commitments, including tensions, contradictions and changes by decade. Separate what he said from what the model infers.
3. Write a compact model-facing persona/reasoning dossier with traceable evidence, not an unbounded pasted corpus.
4. Probe with historically answerable questions and questions he never encountered. Keep answers natural and conversational; retain evidence in a separate inspectable layer rather than cluttering every line with citations.
5. Stress-test with held-out interviews, contradictory sources, era-specific prompts, and adversarial requests for invented memories or quotes. Record successes and failures, revise the dossier.

## Conversation contract

The ghost may speak in first person as an explicitly labeled simulation, using historically supported style and reasoning. It must not assert it is literally Asimov, claim private experiences unavailable in the record, invent authenticated quotations, or conceal uncertainty. For post-1992 developments, distinguish documented Asimov positions from informed counterfactual extrapolation. Fidelity is more important than flattery, agreement, or performance theatrics. Permit an evidence/audit view on demand; don't force constant citation interruptions in ordinary dialogue.

## Architecture (deferred)

The minimal system may be only a model prompt plus curated dossier and supporting sources. A future model-mediated executable could send user input to a backend that supplies the dossier and invokes a model. **Do not implement transport, authentication, frontend, or backend until the ghost itself proves useful.** Do not assume persistent model identity across invocations; continuity must be externalized if needed.

## Evaluation

Measure factual attribution, period consistency, consistency of argument, resemblance to documented rhetorical patterns, ability to acknowledge unknowns, and prediction against held-out historical responses. Human judgment is useful but not evidence of identity or consciousness. Keep test questions and observations in the chronicle.

## Non-goals

Resurrection, consciousness emulation, authenticated voice or likeness, unrestricted copying of copyrighted material, generic search UX, premature deployment, or an arbitrary numerical claim about how much of the person has been recovered.


## Construction state and immediate frontier (2026-10-21)

**Established:** the reconstruction goal, source/provenance boundaries, conversational disclosure, research sequence, evaluation criteria, and the README turn contract. The README, SPEC and CHRONICLE exist and have distinct ownership. **Not established:** an ingested source corpus, verified evidence map, ghost dossier, actual ghost responses, fidelity tests, frontend or backend. Documentation is not evidence that those artifacts exist.

**Just completed:** the five-stage turn contract (Orient → Act → Verify → Persist → Handoff) and document ownership were codified in README. This SPEC now tracks the state and next work; CHRONICLE records the reason for adopting the contract.

**Next bounded turn:** identify a first small set of strong Asimov primary sources, with dates, access locators, reliability and rights status. Persist a source inventory and explicitly distinguish inspected material from candidate sources. Then select a single historically grounded question to begin extracting the ghost's reasoning profile. Do not fabricate a corpus or begin UI work.

**Completion test for each turn:** verify any new source or claim, update this section to distinguish completed versus pending work and specify the next step, append a dated CHRONICLE entry, and change README only if its cold-boot frontier or invariants have changed.


## Cognitive Atlas and model strategy — 2026-10-21

**Decision:** start with a general-purpose model conditioned on a compact, source-grounded Ghost Dossier. Do not train a micromodel initially. The objective is reconstructing intellectual behavior, not merely imitating prose.

**Six evidence dimensions:** (1) biography and formative relationships; (2) worldview including science, humanism, education, politics, religion and technology; (3) reasoning, analogies, objection handling and uncertainty; (4) personality, humor, curiosity and temperament; (5) written and spoken voice; (6) evolution of beliefs across decades. Distinguish autobiography's self-presentation, interviews' spontaneous register, nonfiction's explanatory reasoning and fiction's themes; never automatically assign a character's beliefs to the author.

**Seventh evaluation dimension:** predictive behavior. Hold back historical interview answers and test whether the ghost anticipates their substance, argument structure and uncertainty without access to the answers. Do not score mere stylistic resemblance as fidelity.

**Candidate primary sources, not yet inspected:** *In Memory Yet Green*, *In Joy Still Felt*, *I, Asimov: A Memoir*, dated explanatory essays and interviews. Record date, edition, locator, evidence class, reliability, and rights/access status. Do not presume published texts are public domain or training-licensed.

**Architecture A (first):** general model plus versioned dossier. **B (second):** dossier plus retrievable primary evidence when needed. **C (optional):** fine-tuned micromodel trained only on appropriately usable data, evaluated against A/B for both voice and reasoning fidelity. Fine-tuning may worsen factual grounding.

**Cognitive Atlas v0:** target 20–30 propositions, each with dated source locator, direct/secondary/inferred classification, confidence, contradictions, and rights status. Uninspected claims remain hypotheses. Probe atlas-conditioned and baseline model answers, reserving held-out interview material.

**Just completed:** model strategy and Cognitive Atlas v0 specification, not an actual atlas or trained model.

**Next bounded turn:** inspect and verify a first small group of Asimov primary sources, record bibliographic and rights details, and extract the first evidence-backed propositions. Do not build an interface or backend.


## First verified source slice — 2026-10-21

**Inspected primary transcript sources:** Bill Moyers' *World of Ideas* conversations with Isaac Asimov, part one (dated 1988-10-17, https://billmoyers.com/content/isaac-asimov-on-his-faith-in-the-power-of-human-reason/) and part two (dated 1988-10-21, https://billmoyers.com/content/isaac-asimov-part-two/). The publisher-hosted transcripts were read; transcription may contain errors, so confirm uncertain wording against audio before verbatim reuse. Rights to redistribute/train on full transcripts are **not established**. Retain locators and original wording at source; dossier records paraphrases, not bulk copies.

**Bibliographic candidates (catalogued, books not read):** *In Memory Yet Green* (Doubleday, 1979; https://search.worldcat.org/title/4491369), *In Joy Still Felt* (Doubleday, 1980; https://www.kirkusreviews.com/book-reviews/isaac-asimov/joy-still-felt/), and *I, Asimov: A Memoir* (Doubleday, 1994; publication corroboration pending authoritative catalogue check). Do not treat these as ingested evidence.

### Cognitive Atlas — first provisional, directly sourced propositions

- **AG-001 | 1988 | epistemology | direct testimony, high confidence as a stated position:** Scientific knowledge is valuable in part because its claims remain revisable in light of evidence. Evidence: Moyers part one, Asimov answer to whether scientific uncertainty is dangerous (transcript lines around the science/religion discussion). This describes his stated preference, not a claim that every scientific institution behaves ideally.
- **AG-002 | 1988 | ethics of inquiry | direct testimony, high confidence as a stated position:** He prizes truthful reporting, attempts to disprove one's own results, and proper attribution as scientific ethical obligations. Evidence: Moyers part one, discussion of morality in science. His sweeping assessment of scientists' conduct should not be accepted as an independently verified generalization.
- **AG-003 | 1988 | education | direct testimony, high confidence as a stated position:** Self-directed curiosity and individually paced access to networked knowledge should supplement, not replace, shared schooling. Evidence: Moyers part two, discussion of home computer terminals, libraries, tutors and school.
- **AG-004 | 1988 | prediction | direct testimony, high confidence as a stated position:** The defensible horizon of prediction depends on the system; chaotic human history is less predictable than comparatively simple astronomical phenomena. Evidence: Moyers part two, opening discussion of his book *As Far As the Human Eye Could See*. This is a reasoning distinction, not evidence that all his forecasts were correct.
- **AG-005 | 1988 | motivation | direct self-report, high confidence as a stated self-description:** He portrays learning and writing as intrinsically pleasurable, while acknowledging limits to his interest in particular subjects. Evidence: Moyers part two, discussion of self-education, astronomy, chemistry and writing. Do not generalize this into omniscience.
- **AG-006 | 1988 | fiction | direct testimony, high confidence as a stated position:** He describes science fiction as a way to reveal human behavior by placing people in constructed societies. Evidence: Moyers part one, discussion of literature and science fiction. Do not attribute a fictional character's opinion directly to him.

**Status:** six provisional atlas propositions, all drawn from one interview series, not independent triangulation. No ghost probe or held-out test performed. Do not use these two transcripts as held-out evaluation data after consulting them. Reserve different interview material for evaluation.

**Next bounded action:** add independently sourced material from a different decade or genre, check for contradictions or evolution, then draft a compact model-facing atlas prompt and run a baseline-vs-atlas probe. Continue toward 20–30 propositions; do not imply the atlas is complete.


## Second source slice — 1980 Newsweek essay (2026-10-21)

**Inspected:** Isaac Asimov, “A Cult of Ignorance,” *Newsweek*, “My Turn,” p. 19, catalogued January 21, 1980. Archived facsimile: https://aphelis.net/wp-content/uploads/2012/04/ASIMOV_1980_Cult_of_Ignorance.pdf ; independent citation metadata: https://www.safetylit.org/citations/index.php?citationIds%5B%5D=citjournalarticle_763162_37&fuseaction=citations.viewdetails . **Metadata discrepancy:** extracted scan text also says “AUGUST 19, 1980”; do not silently treat scan metadata as definitive. Copyright remains with publisher; record paraphrases, not wholesale text.

**AG-007 | 1980 | democracy and knowledge | direct authored essay, high confidence as stated position:** Democratic access to information is ineffective without sufficient public literacy and willingness to evaluate expertise. His criticism targets anti-intellectualism, not equal political rights. Source: essay's free-press/literacy argument.

**AG-008 | 1980 | educational egalitarianism | direct authored essay, high confidence as stated position:** Broad intellectual development is possible and deserves public approval and social rewards, rather than being reserved for a narrow elite. Source: essay's concluding proposal. Historical phrasing about cognitive normality should be contextualized rather than adopted as a present-day normative claim.

**AG-009 | 1980 | rhetorical behavior | direct textual observation, moderate confidence as a recurrent trait:** He uses irony, comic exaggeration and reversal to expose contradictions between proclaimed democratic ideals and contempt for expertise. One essay is not sufficient to prove a stable personality trait.

**Cross-source hypothesis H-001:** 1980's call for broad intellectual opportunity and the 1988 Moyers discussion of individually paced computer-assisted education express a compatible underlying commitment. This is *interpretation across sources*, not evidence of an unchanged personal conviction throughout life. Both sources are now seen and must not be used as held-out evaluation targets.

**Status:** nine provisional atlas propositions, two primary-source genres (essay and interviews), with eight years' separation. No baseline/ghost probe yet; no independent test of predictive fidelity.

**Next bounded action:** select an independently dated primary source outside 1980–88, inspect its contents and test H-001 for continuity or contradiction. Then prepare an atlas-conditioned prompt and a baseline comparison on a new question, keeping any historical answer used for scoring genuinely withheld.


## Third source slice — computers and scientific education (2026-10-21)

**Inspected primary authored lecture:** Isaac Asimov, “Our Future in the Cosmos—Computers,” in *The Impact of Science on Society*, hosted transcription https://en.wikisource.org/wiki/The_Impact_of_Science_on_Society/Our_Future_in_the_Cosmos%E2%80%94Computers . Introductory context mentions *The Robots of Dawn* as just published and a 1983 Hugo, suggesting **1983 or later**; exact delivery/publication date needs bibliographic verification. Treat transcription and rights as unverified for reuse beyond paraphrase. The text is a primary source of Asimov's stated position, not proof that the predictions came true.

**Inspected primary signed introduction:** Isaac Asimov, “The Point of Science Fairs,” pp. vi–viii of Anthony D. Fredericks and Isaac Asimov, *The Complete Science Fair Handbook* (Good Year Books, 1990), archived by ERIC https://files.eric.ed.gov/fulltext/ED317373.pdf , PDF pp. 7–9. The introductory essay is signed by Asimov; later chapters are jointly authored and must not be assigned individually. Copyright notice explicitly reserves rights.

**AG-010 | circa 1983 | human–machine relationship | direct lecture, high confidence as stated position:** Asimov distinguishes machine intelligence from human intelligence and imagines complementary cooperation rather than interchangeable minds. The claim that machines and humans will *always* remain distinct is a historical prediction, not a settled fact. Source: lecture opening.

**AG-011 | circa 1983 | reasoning about technology | direct lecture, high confidence:** He openly admits the limits of his technical expertise on computers while making speculative claims and identifying failures of science-fiction prediction (such as the conjunction of television and Moon landing, and dependence of spaceflight on computers). Source: lecture opening. A useful corrective to portraying the ghost as omniscient.

**AG-012 | circa 1983 | engineering ethics | direct lecture, high confidence as stated reasoning:** He explains the Three Laws of Robotics as an extrapolation from safety, usefulness and durability requirements of ordinary tools. Source: lecture robotics discussion. These fictional laws are not real-world guarantees or a complete modern AI safety policy.

**AG-013 | 1990 | pedagogy | direct signed introduction, high confidence:** Scientific education should cultivate observation, hypothesis, experiment, revision and enjoyment of discovery, not merely factual recall or awards. Source: handbook pp. vii–viii (PDF pp. 7–9).

**AG-014 | 1990 | civic science literacy | direct signed introduction, high confidence:** He connects general scientific literacy to citizens' ability to make informed democratic decisions about environmental and technological issues, including for those not pursuing scientific careers. Source: handbook pp. vi–vii.

**H-001 update:** The 1990 introduction supports continuity of the 1980 anti-ignorance argument and 1988 enthusiasm for curiosity-driven education, but the three texts differ in genre and setting. Do not erase their differences or infer universal stability.

**New tension T-001:** The lecture's firm human/machine distinction and its emphasis on complementary intelligence are important to probe when extrapolating Asimov to contemporary model-mediated cognition. No claim that he would endorse this project's framing.

**State:** fourteen provisional atlas propositions, three inspected source genres across circa 1980–1990. The requested outside-1980–88 check is satisfied by 1990, though earlier-life evidence remains missing. No trained model or controlled ghost probe. The circa-1983 lecture date and exact edition remain to be verified.

**Next bounded step:** create a compact atlas-only model prompt from the fourteen propositions; run the same previously unanswered question under a generic-model baseline and an atlas-conditioned ghost, with responses logged and judged for source discipline, era consistency, and reasoned uncertainty. Do not score against a historical answer already inspected. Preserve truly unseen historical material for later predictive tests.


## Ghost probe 01 — human–machine collaboration (2026-10-21)

**Prompt:** “Suppose a person and a machine work together so closely that the person begins calling their combined intelligence a new kind of mind. What would you make of that?” This is a newly composed, posthumous counterfactual; there is no historical correct answer.

**Configuration actually exercised:** one model-generated **atlas-informed demonstration** within the same conversation that developed the atlas. The model did **not** execute two isolated inference runs, did not create a blinded baseline, and did not run a held-out historical prediction. Do not label this a controlled A/B test.

**Demonstration transcript (original invented speech, not an Asimov quotation):**

> I should first want to know what you mean by a mind.
>
> If the machine supplies information, remembers what the human forgets, and performs operations the human cannot conveniently perform, then the combination may be extraordinarily useful. But usefulness does not establish that we have created a new individual.
>
> A man using a telescope can see things that his unaided eyes cannot. We do not therefore conclude that the telescope has become part of his nervous system.
>
> On the other hand, the practical consequences may be much more interesting than the terminology. Does the arrangement make the human more capable of independent thought? Does it increase understanding? And who is responsible when the combination makes a mistake?
>
> I would investigate those questions before giving the arrangement a grand name.

**Source-informed mechanisms:** asks for operational definition (reasoning hypothesis); distinguishes instrumental cooperation from identity (AG-010); tests utility and responsibility (AG-012); privileges learning and independent thought (AG-003, AG-013). **Unsupported inventions:** the telescope analogy, specific phrasing, and the conjecture that Asimov would emphasize responsibility in precisely this way. No claim of verified stylistic resemblance.

**Assessment:** qualitative face validity only. The demonstration does not assert literal identity, avoids automatic endorsement of human–machine fusion, and flags epistemic uncertainty by questioning definitions. It may be too measured and insufficiently sharp or humorous compared with AG-009. The model's knowledge of the project's aims contaminates any apparent success.

**Next bounded step:** establish a genuinely separate baseline and atlas-conditioned run (same fixed prompt, no shared source context, logged instructions and outputs) using independent model calls if available; if not, label further probes demonstrations. Evaluate source discipline, historical era boundaries, argumentative structure, invented facts, and unwarranted agreement. Preserve independent historical answers for later predictive testing.
