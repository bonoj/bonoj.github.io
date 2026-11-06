# CDC — Centers for Disease Cultivation

## Status
Creative and experience specification. **Not yet implemented.** Independent single-page Subversion project at `jit/subversion/cdc/`. Inherit and obey all seven design invariants in [../README.md](../README.md); do not duplicate a scaffold or introduce a shared runtime.

## Core proposition
A credible, polished public-health authority devoted not to eliminating disease but to **cultivating and preserving it**. Its public language emphasizes biodiversity, stewardship, population coverage, research, and long-term resilience. The initial impression is an institution celebrating **human diversity**. Close inspection reveals that “diversity” refers to **pathogenic diversity**, and the people pictured are classified as **human cultivation facilities**.

The institution never breaks character, jokes, explains the satire, or treats its classifications as strange. The experience becomes more unsettling through progressive discovery, not a scripted reveal.

**Name:** CDC — Centers for Disease Cultivation.
**Working institutional line:** “Preserving diversity. Sustaining life.”
**Alternative campaign line:** “Every pathogen deserves a future.”
Use copy sparingly; avoid stacking slogans.

## Source population
- **3,960 synthetic human portraits** from Sigils People: https://ambravo.github.io/sigils-people/
- Index: https://raw.githubusercontent.com/ambravo/sigils-people/main/people/index.json
- Images: `https://ambravo.github.io/sigils-people/portraits/s/{id}.avif` for registry thumbnails and `.../portraits/l/{id}.avif` for detail.
- Preserve source-region groupings; inspect actual index schema before implementing any geographic joins. Never infer real individual addresses, exact coordinates, or medical conditions from portraits. Portraits are fictional/synthetic, and all allocations are invented.
- Preserve CC BY 4.0 attribution in project documentation and an unobtrusive accessible credits location; no front-and-center out-of-character warning.
- **Prototype with ~24 portraits** representing multiple source regions before scaling to the entire collection. Build for 3,960 without rendering 3,960 DOM cards simultaneously.

## Experience architecture
A single coherent responsive page with three primary layers of exploration. Not a game, marketplace, dating interface, Yelp for pathogens, or generic staff directory.

### 1. Institutional landing
- Convincing government/public-health editorial design: authoritative masthead, restrained navigation, elegant human imagery, serious typography, quiet statistics, carefully composed whitespace.
- Introductory language can be read innocently as a celebration of human diversity. Avoid immediately announcing the joke.
- Primary institutional metric: **3,960 registered human facilities**. Supporting metrics may include verified counts of regions, allocations, or grade distribution once generated; do not fabricate statistical claims.
- Institutional sections may include cultivation coverage, research programs, preservation priorities, and registry access, but each must contain actual meaningful content. No placeholder “initiatives” carousel or component showroom.
- Editorial contrast: respectable public-health visuals paired with cold operational language.

### 2. Geographic cultivation overview
- A central, elegant world/region map shows **regional cultivation capacity** and distribution, not individual pins.
- Region selection updates a clear regional summary and the corresponding registry subset. Make selection obvious, keyboard accessible, and reversible.
- Map data must derive from the Sigils index's *actual* region grouping, with explicit documented mapping between source labels and map shapes. If the source uses broad regions, use broad regions; do not invent country-level precision.
- Prefer choropleth or regional highlight with simple count labels, not an animated outbreak map or precise geolocation surveillance.
- Distinguish **registered facilities** from **cultivation assignments**: one human can hold multiple assignments. Counts and legend must specify which quantity is being mapped.
- A conventional region selector/list provides equivalent functionality, especially on narrow screens; the map must never become a mandatory tiny touch target.
- Responsive layout: map and contextual regional summary may sit side by side on wide viewports, stack elegantly on mobile. Preserve visible context during selection.

### 3. National cultivation registry
- Region-filtered searchable portrait collection, visually ordered and humane at first glance; clinical allocation language appears in captions and records.
- Filters: region, operational division, assignment category, BSL grade; only implement filters with genuinely populated data.
- Opaque, stable, nonsequential facility IDs generated deterministically at build time. IDs must not encode portrait age, gender, ethnicity, geography, or personal characteristics.
- Sorting: sensible default (e.g. registry order or stable administrative index), plus optional meaningful sort modes if warranted. No arbitrary invented metrics or decorative complexity.
- Portrait selection opens a **focused facility record** with large portrait, ID, source region, primary role, additional concurrent appointments, per-appointment grade, and operational status. Keep this usable without a giant modal or full-screen drawer on mobile.
- Detail inspection must support returning to the same filter/scroll context. Search and map selection remain synchronized.

## Allocation model
A person is a **facility**. A pathogen/organism-specific function is an **appointment or allocation**. A facility can hold multiple concurrent appointments; one is designated primary for registry display.

**Strong canonical titles:**
- **Mosquito Refueling Station** — especially important; plain industrial utility language applied to an ordinary human.
- **E. coli Incubator**
- **Syphilis Carrier**
- **Tapeworm Storage**
- **Herpes Archive** (working)
- **Fungal Reserve Capacity** (working)

Treat titles as an editorially curated vocabulary, not an automatic pun generator. **Rejected style:** “Tick Hospitality Coordinator,” “Bedbug Bed & Breakfast,” “Flea Transit Authority,” “Head Lice Property Manager,” “Mite Housing Cooperative,” and any review/rating/customer-service joke. Titles should describe a biological function with clinically indifferent industrial precision, not whimsical wordplay.

Do not assert that pictured individuals actually carry pathogens. These are **fictional allocations**, not diagnoses; an “Active” appointment means active *in the fictional agency registry*, not evidence of infection.

### Operational divisions
Working institutional categories:
- **Active Storage** — maintained allocations.
- **Experimental Cultivation** — provisional assignments and institutional research classifications.
- **Preservation Reserve** — continuity and future-capacity assignments.
- **Redistribution & Reassignment** — administrative allocation changes.

Keep research and experimentation as narrative/program categories, not instructions for pathogen cultivation, exposure, transfer, or dissemination.

### BSL grades
Use **BSL-I through BSL-IV** as an absurd institutional hierarchy analogous to a career level. In reality, BSL-1–4 refer to **laboratory containment requirements**, not employee seniority, virulence, or mortality rankings. The fictional agency appropriates the recognizable notation into **appointment grades**.

Crucial: **grade belongs to each appointment**, not necessarily to the human globally. One facility may be “Syphilis Carrier · BSL-II” and “Fungal Reserve Capacity · BSL-I” concurrently. Promotion may change a grade without changing the specific functional title.

Avoid replacing specific roles with generic “Junior Host,” “Senior Host,” “Principal Host,” or “Host II” as the primary displayed titles. The humor resides in the exact biological allocation, not corporate genericity.

Do not claim fictional BSL grades represent real-world pathogen danger, actual mortality, or operational laboratory guidance. The website may use institutional visual cues, but its data model should distinguish grade from any research/surveillance indicators.

## Interaction and information hierarchy
1. Visitor encounters a credible institution and human-diversity imagery.
2. Visitor explores the geographic distribution of registered facilities.
3. Visitor browses human faces and sees strange but deadpan specific appointments.
4. Visitor inspects a record and discovers multiple simultaneous biological allocations and per-appointment grades.
5. Visitor returns to map/registry without losing context.

No compulsory onboarding, gamification, ratings, reviews, cart, pathogen “customer” persona, swipe matching, fake purchasing, or generic dashboard widgets. Let exploration itself carry the reveal.

## Visual direction
- Editorially credible government/public-health aesthetic; not a horror theme, neon biohazard game, or overt parody masthead.
- Portraits are the emotional anchor. The contrast between human dignity in the image and institutional reduction in the metadata is the entire mechanism.
- Map is the primary large-scale visual; registry is the primary human-scale visual.
- Use restrained BSL hierarchy colors and labels only as secondary metadata. Do not overwhelm portraits with caution tape, warning triangles, or fake clinical claims.
- A genuine unified desktop/mobile composition. Mobile portrait records must remain legible and navigable, map alternatives must work by touch, and all gutters/crops must honor parent Subversion invariants.

## Data and technical plan
- Inspect actual upstream index schema, available region labels, image dimensions, and licensing before writing the import.
- Build a deterministic, reproducible transformation from source portraits to local derived registry metadata. Keep `sourceId`, `sourceRegion`, `facilityId`, `appointments[]` (title, BSL grade, division/status), and `primaryAppointmentId` distinct.
- Stable seeded allocation generation is acceptable for initial content, but editorially review the title bank; don't mechanically produce thousands of bad jokes.
- Separate actual source facts (portrait ID/region) from all fictional agency fields. Do not infer disease status or role from face, age, or demographic attributes.
- Count **facilities** separately from **appointments**, and count each facility once in geographic totals even with multiple allocations.
- Use thumbnails/lazy loading, progressive rendering or virtualization, and responsive image crops. Provide sensible loading/error states for remote images and map assets.
- No external framework or shared runtime required. Independent static HTML/CSS/JS is sufficient unless complexity demonstrably warrants a build step.
- Accessible semantic navigation, keyboard-operable map alternative, clear focus styles, readable contrast, and reduced-motion behavior.
- Ensure meaningful content without reliance on hover. Keep navigation and details usable with back/close behavior on small screens.

## Prototype acceptance criteria
- Approximately 24 portraits from several actual source regions, with deterministic stable IDs and several multi-appointment records.
- Institutional landing passes the **innocent first-glance** test; closer reading reveals the cultivation inversion.
- Map selection, alternative region selector, registry filtering, record inspection, and return to previous context all work.
- Mosquito Refueling Station appears naturally as a primary or secondary appointment; other titles remain selective and strong.
- BSL grade displayed **per allocation**, not only once per facility.
- Regional facility totals are accurate and never double-count multi-assignment people.
- No ratings, reviews, pathogen consumer framing, arbitrary widgets, compulsory game mechanics, or invented location precision.
- Actual rendered QA on narrow mobile and wide desktop, plus keyboard and touch paths. Do not claim QA without doing it.
- Parent README's seven invariants are inherited by reference and enforced.


## Verified source geography and center model (2026-11-06)

Inspected the upstream `people/index.json` directly: `count: 3960`, `fields: [id, country, name, native, sex, age, heritage]`, with **198 distinct country/territory codes, exactly 20 portraits per code**. The source does **not** contain a continent/region field or real health information. Country-to-continent grouping is a derived map/navigation layer; document the mapping and accommodate territory/disputed classifications neutrally.

**Institutional model: 198 national cultivation centers, each with 20 registered human facilities.** “Center” is a fictional administrative unit, not a claim of a physical laboratory or exact building location. Avoid fabricated city/address pins. The global map should show center coverage by country/territory, with country selection revealing its 20 facilities. At the global level, facility counts are uniform; meaningful differentiation comes from curated appointment portfolios, grades, and status, not invented population-weighted totals. Distinguish 198 centers from 3,960 facilities and the larger number of concurrent assignments.

### Country-specific appointment editorial direction

Each national center should have a **small, distinctive set of biological-function titles** with a credible connection to regional ecology or public-health context, while retaining globally ubiquitous roles where appropriate. These are invented institutional assignments, never assertions about the pictured people or actual prevalence in their country. No crude nationality stereotypes, no automatically labeling a nation's residents as infected, and no exoticizing the Global South. Use ecology, habitat, and biological function rather than national caricature.

Illustrative **creative candidates only, not approved epidemiological claims**:
- **Brazil:** Mosquito Refueling Station; Arbovirus Archive (if retained, clarify as fictional designation).
- **United States:** Tick Bloodmeal Depot; E. coli Incubator.
- **Japan:** Norovirus Storage; Seasonal Influenza Reservoir.
- **India:** Mosquito Refueling Station; Enteric Bacteria Incubator.
- **Australia:** Mosquito Refueling Station; Tick Feeding Reserve.
- **Iceland:** Respiratory Virus Archive; Gut Flora Storage.
- **Egypt:** Mosquito Refueling Station; Intestinal Parasite Storage.
- **United Kingdom:** Norovirus Archive; Gut Flora Storage.

**Editorial warning:** the above are only starting points. Many are weaker than the canonical “Mosquito Refueling Station”; do not generate all 198 national title banks mechanically. First curate a small cross-country sample, review tone and specificity, then expand. The same title can legitimately occur in multiple centers. The role is not a national stereotype and must not imply that any portrait depicts an infected individual.

### Geographic UX consequence

Use an interactive country/territory coverage map with a readable list/search alternative. Selected center displays **20 facilities**, appointment totals, and a portrait grid. Higher-level region aggregation is optional and must be derived from an explicit mapping. Do not invent differentiated national facility totals, since each source group is exactly 20.

## Open design decisions
- Whether map is immediately below the hero or integrated into a large first-scroll editorial composition.
- Whether detail is inline expansion, side panel on desktop + inline on mobile, or dedicated in-page view.
- Exact geographic geometry after inspecting the upstream region taxonomy.
- Final BSL visual vocabulary and how prominently institutional research sections appear.
- Editorial approval of a small high-quality allocation-title set before any scale-up.

## Delivery
When approved to build: create `index.html` and any narrowly necessary local assets under this folder, verify the live GitHub Pages URL `https://bonoj.github.io/jit/subversion/cdc/`, and record implementation/QA truthfully. This document is the source of truth for the concept; parent README governs cross-project design invariants.

## Approved allocation vocabulary — 2026-11-06

The owner explicitly approved **every proposed title** in the immediately preceding three-category selection catalog (viral, bacterial, and parasitic cultivation). Treat that entire selection as approved, including names earlier marked tentative or stylistically weaker. Do not silently prune or rename approved entries. This approval supersedes prior candidate-only language in this specification.

The approved catalog includes the foundational titles **Mosquito Refueling Station**, **E. coli Incubator**, **Syphilis Carrier**, and **Tapeworm Storage**, alongside disease-specific fictional storage, archival, reservoir, and incubation assignments. Maintain separate per-appointment grades and support multiple concurrent allocations per facility. Region-specific portfolios should draw from the approved vocabulary, informed by credible regional ecology without suggesting that any pictured individual has a real medical condition.

For implementation, preserve the full approved title list from the conversation as source data rather than generating new names or using generic host ranks. The allocations are fictional descriptions for a satirical interface, not real-world pathogen cultivation instructions.

## Recovered canonical files (2026-11-06)

All **103 approved titles** are now preserved verbatim: [VIRAL.md](VIRAL.md) (32), [BACTERIAL.md](BACTERIAL.md) (35), and [PARASITIC.md](PARASITIC.md) (36). [CENTERS.md](CENTERS.md) assigns a reproducible three-category **fictional baseline** to all **198** source country/territory codes. Its distribution is deliberately not a claim about national disease prevalence. **Editorial regional differentiation remains pending**; do not misrepresent the baseline rotation as geographically researched or final. All parent Subversion invariants remain binding.
