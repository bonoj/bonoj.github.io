# UNIT OLOGY — JIT institutional website contract

## Objective
Build an immersive, fully navigable Church of Unitology website as a serious institutional artifact. The public site speaks exclusively in its own institutional voice. It never calls itself a game, fan project, simulation, parody, or fictional experience; no Dead Space attribution, meta-commentary, developer UI, or out-of-world lore explanations in the visitor-facing interface. Keep provenance and canon/invention distinctions in developer documentation only. Avoid impersonating real organizations or soliciting real donations, personal medical details, or actual bodily donations.

## Creative thesis
The church is not a horror attraction. It is confident, wealthy, serene, administratively meticulous, and sincere in its own self-presentation. The visitor descends into its institutions by stripping away successive visual layers. The impossible is handled as routine administrative fact. Set the institutional experience before the events of the first Dead Space game.

## Precedents
- JIT Hausgeist (jit/hausgeist/index.html): premium institutional façade; archival contradictions disclosed through ordinary records; serious voice; restrained anomalies.
- Scientology public-facing organizational website: informational pathways, introductory instruction, membership and community architecture. Research precedent, not a visual or textual template; do not copy marks, wording, or real-world conversion mechanisms.
- Architectural study: DOM elements as columns, cornices, slabs, recesses, and membranes; no 3D mesh needed.

## Visual system
- Sanctuary: bone-white ceramic, limestone, pale gold/brass, diffuse daylight, monumental columnar rhythm, spacious editorial typography.
- Doctrine: structural grid and quieter surfaces; ornaments retreat.
- Continuity: translucent, layered membranes and clinical glass; restrained warmth.
- Anatomy: immaculate inventory, precise tables, provenance and custody records; no gratuitous gore.
- Reliquary: fixed light, sealed geometry, stillness, serial archives.
- Convergence: near-white visual reduction, minimal controls and language.
- Never resort to generic haunted-house styling, jump scares, flashing glitches, red splatters, or cartoon villainy.
- Preserve responsive, touch-first layout and readable typography.

## Shared daylight model
- A single deterministic virtual sun vector drives CSS variables for direction, elevation, ambient tint, highlights and shadows.
- Every architectural DOM element has an optional virtual elevation/depth and casts a coherent directional shadow via CSS (box-shadow, drop-shadow, pseudo-elements).
- Time follows the visitor's local clock by default; provide an unobtrusive manual scrub for exploration, with explicit return to live time.
- Sunlight changes the public sanctuary and filtered continuity wing. The Reliquary has deliberately constant artificial illumination.
- Reduced-motion support; static appearance must remain coherent if animation or JS is unavailable.
- Light does not compromise contrast or make navigation unreadable.

## Navigation: descent = flaying
- One continuous document architecture, not unrelated page swaps and not a walking simulator.
- Descending removes ornamental shells and exposes underlying grids, membranes, records, and structures.
- Reversing direction visibly reassembles the previous layer. Transitions are reversible and interruptible.
- Route and depth represented in URL/history; browser back/forward work. Links, headings, and text remain real semantic DOM.
- Never require animation to reach content; keyboard navigation and reduced-motion mode receive immediate state transitions.
- Keep physical and conceptual location legible through breadcrumbs or an understated section indicator.

## Information architecture
0. Sanctuary — welcome, services, architecture, community, public calendar.
1. Doctrine — Altman, the Marker, unity, rebirth, Convergence; educational sequence and library.
2. Membership — instruction, congregation, pastoral care, commitments, member records (fictional/sample only).
3. Continuity Wing — memorial services, stewardship, posthumous contribution agreements, donor wishes, custody policies.
4. Anatomy — preserved biological material, cataloguing, specimen provenance, institutional logistics and documentation. All simulated, no real collection.
5. Reliquary — storage, preservation history, access logs, long-term registries and unresolved anomalies.
6. Convergence — severe, serene culmination; a destination, not an exposition dump.

These are conceptual layers, not a claim that all are canonical church departments.

## Narrative mechanics
- The visitor-facing text is always serious, compassionate, procedural, and self-assured.
- Horror comes from contradictions among official records, shifting classifications, persistent entries, and calm descriptions of impossible outcomes.
- Each record has an identity and provenance; cross-document continuity matters.
- Reveal information gradually. Public materials must remain plausible as genuine institutional communications.
- Do not make fictional signup flows that collect real contact, payment, health, or bodily donation data.

## Canon and invention boundary (developer-only)
Canonical basis to verify against primary franchise material before asserting specific dates, ranks, practices, or doctrines: Michael Altman, Marker veneration, unity/Convergence, the church's institutional reach, preservation of deceased members. Secondary wikis are research aids, not authoritative sources. Church departments, forms, registries, procedures, characters, and architectural interface are original extrapolations unless verified otherwise. Record source and confidence in future content data; never print developer provenance on the public site.

## Implementation invariants
- Static GitHub Pages at /jit/unitology/; no backend or account system for first implementation.
- Use real HTML/CSS/JS and semantic DOM; avoid WebGL and heavy frameworks unless an experiment proves necessary.
- One global light model; no individually hand-animated inconsistent shadows.
- Keep content and architecture separately configurable.
- Progressive enhancement, responsive mobile-first, pointer and keyboard support, prefers-reduced-motion, no forced audio.
- Maintain README as executable contract and CHRONICLE as chronological decisions.
- Deploy with source readback and cache-busted URL; do not claim browser verification from source inspection alone.

## First executable acceptance test
1. Immaculate sanctuary façade with believable institutional content and responsive columnar DOM architecture.
2. Live day/night cycle and manually scrubbed sun; shared coherent shadows cast by the page elements themselves.
3. One complete reversible descent (Sanctuary → Continuity) where ornament visibly peels away to reveal clinical structure; URL/back works.
4. One mundane but unsettling continuity record, fully in character.
5. No meta-disclaimers, attribution, or out-of-world language anywhere in the public UI.

## Not yet
Do not implement the entire fictional bureaucracy, a real membership system, payments, contact collection, 3D walking, complex simulation, or preoptimization before the architectural prototype is proven.

## First executable (2026-10-27)
Implemented at index.html; build commit 356c9dc4. Sanctuary and Continuity are two reversible hash-routed states. The page uses CSS DOM columns, an underlying structural grid and membrane, a shared sun vector driven by local clock or manual slider, reduced-motion support, and a fictional continuity record. Source readback verified; browser visual quality awaits device feedback. This is a prototype, not the complete information architecture. The present sun/shadow model is stylized, not physically accurate; touch pinch zoom is browser-native.

## Second executable — hinged skin (2026-10-27)
Build 9edd8710 replaces the disconnected column translations with a continuous two-leaf DOM façade. CSS 3D hinge rotation exposes back-face material while retaining anchored outer edges. A fixed rear wall receives simplified directional shadow shapes; direct sunlight shadows disappear at night. The same two URL hash states remain reversible. This is a visual hypothesis, not a physically accurate light transport or flexible membrane model. Validate visually on device before extending into multi-layer flaying.
