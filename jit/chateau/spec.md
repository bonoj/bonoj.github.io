# Shakespeare Chateau — Living Architecture
## Authoritative implementation specification · v2 · 2026-10-25

**Deployment:** https://bonoj.github.io/jit/chateau/  
**Source:** `jit/chateau/index.html`  
**Property:** 809 Hall Street, St. Joseph, Missouri  
**Status:** SPECIFICATION ONLY. Existing deployed page remains unchanged until implementation is requested.

## 0. The mandate

Replace the static brochure with a **mobile-first, spatially continuous, breathing architectural experience**. The house is the interface, not a subject illustrated by a collection of webpages. One estate, one coherent world, with architecture, evidence, time, light, material, and future possibility interconnected. It must feel wonderful under one thumb on a phone, and remain sophisticated on desktop.

**Creative bar:** A visitor forgets they are browsing a listing and begins imagining living there. No template aesthetic; no generic property portal; no faux haunted-house tricks. This is the architectural counterpoint to Hausgeist: reality rendered vividly, not distorted.

**Business experiment:** Build an unsolicited, exceptionally good demonstration for the seller and authorized agent; buyer is the audience. Free to explore, no accounts, advertising, interstitials, artificial scarcity, email gates, or disruptive lead capture. The agent's published contact route handles inquiries.

## 1. Nonnegotiable mobile interaction contract

- Phone portrait is the **primary artboard**: target 360–430 CSS px widths, verify 320 px minimum; desktop is progressive enhancement. Account for 100svh/100dvh, safe-area insets, browser chrome, and orientation changes.
- **Single immersive viewport** for world mode: no parent page scroll; no accidental browser rubber-band while manipulating the world; content sheets may scroll internally with clear dismissal. No nested scrolling traps.
- **One-thumb interactions:** tap to approach/discover; horizontal drag to look/orbit; vertical drag only where explicitly signaled; pinch to zoom when useful; swipe down to dismiss a sheet; tap a clear back affordance to return to prior viewpoint. No mandatory joystick, hover, keyboard, or precise tiny hotspots.
- Touchable interactive targets >=44×44 CSS px; maintain comfortable margins and thumb reach. Inertial camera with damping, bounded pitch and movement, no motion sickness or sudden camera teleportation.
- **No blue outline, blue link color, or blue tap flash on images and image-backed controls.** All interactive image surfaces use `-webkit-tap-highlight-color: transparent`, `color: inherit`, `text-decoration: none`, `-webkit-touch-callout: none` where appropriate; image drag disabled (`draggable=false`), touch-action tuned by region. Neutralize default visited/active link colors. Do not use browser-native blue image/link focus rings.
- **Accessibility must remain functional:** do NOT indiscriminately remove keyboard focus indicators. Use custom, brand-toned `:focus-visible` treatment (e.g. warm brass ring/underline) on actual keyboard focus, distinct from touch tap state. Semantic buttons/links, labels, screen-reader scene summaries, alt text, reduced-motion support, sufficient contrast.
- Prevent long-press image save/context menu only where it harms interaction, not globally. Prevent double-tap zoom only on interactive scene surfaces; allow browser zoom and text scaling elsewhere. Do not globally disable user-select or viewport zoom.
- Touch test on actual Android Chrome, iOS Safari where available, and desktop pointer. No blue selection highlight, image ghost-drag, tap color, accidental text selection, clipped bottom toolbar, or body scroll while navigating.
- No parent scroll on mobile world view; browser back/forward must navigate scenes coherently.

Suggested scoped CSS baseline:
```css
:where(.world, .scene, .image-control, .hotspot, .scene-link) {
  -webkit-tap-highlight-color: transparent;
}
:where(.image-control, .scene-link),
:where(.image-control, .scene-link):is(:link,:visited,:hover,:active) {
  color: inherit;
  text-decoration: none;
}
:where(.scene img, .image-control img) {
  -webkit-user-drag: none;
  user-select: none;
}
:where(.scene button, .scene a):focus-visible {
  outline: 2px solid var(--brass);
  outline-offset: 3px;
}
:where(.scene button, .scene a):focus:not(:focus-visible) {
  outline: none;
}
```

## 2. The opening: arrive, don't land

- Cold open into a compelling **real-image-backed exterior**, with slow depth/parallax, atmospheric light, foliage and window warmth. Use public imagery by linking/embedding as appropriate; do not hold the design hostage to hypothetical licensing conversations. Preserve credit/provenance and distinguish source photographs from synthetic reconstruction.
- One quiet line of type, estate name, location, and an unobtrusive **Enter** invitation. No full-screen marketing hero followed by an article.
- Arrival sequence: exterior → front entrance → vestibule/entrance hall → staircase. Smooth camera paths or elegant image-space dissolves preserving orientation. No gratuitous loading screens.
- Atmospheric idle life: daylight, shifting shadow, subtle wind and occasional glints. Temporal changes must be subtle, layered, and deterministic enough not to read as GIF loops. User input takes priority; idle motion pauses/reduces during manipulation.
- If no real interior image is available, use honest reconstructed geometry/art direction, not a misrepresented photorealistic “verified” room.

## 3. Architecture as a navigable graph

Canonical data model separates:
- **Place**: id, label, floor, approximate spatial bounds, entrances, adjacent places, camera anchors, representative media, confidence.
- **Element**: id, parent place, transform/anchor, material, behavior, descriptive text, media references, source links, confidence.
- **Passage**: from/to, viewpoint transition, spatial orientation, access state.
- **Period**: date/range, affected elements, known changes, documentary support, reconstruction assumptions.
- **Evidence**: source URL, publisher, accessed date, claim, rights/attribution note, confidence, verified/inferred/illustrative.
- **Future scenario**: proposal, visual overlays, feasibility assumptions, restrictions/unknowns.
- **Atmosphere**: solar angle, sky tone, indoor bounce, colored glass projection, foliage/wind parameters, animation phase.
- **Session**: current place, camera, period, selected element, explored nodes, preferred motion, last route; persisted locally.

Graph supports multiple connected views of the same object (space, material, history, evidence, future). Never duplicate disconnected copy of a room in multiple screens. Unknown floorplan geometry must be labeled conceptual; do not fabricate exact adjacency, dimensions, or room function.

### First-pass graph

Exterior / arrival → front threshold → entrance hall → staircase. Nodes within hall: carved dragon newel, woodwork, stained glass, floor, stair flight, window light. Other areas (Zuber room, carriage house, companion property, grounds) can initially be portal/preview nodes with credible visual transitions, not invented walkable rooms.

**Scene engine:** Favor three.js/WebGL where useful; hybrid DOM/CSS for overlays, source panels and accessible navigation. Keep render loop adaptive and minimize draw calls, shader overdraw, texture memory and battery use. Photography may become layered depth planes, panoramas or spatial billboards; procedural geometry supports physical continuity. Never imply a photograph is a measured 3D scan.

## 4. Five living systems

### A. Breath / atmosphere
- Solar cycle with user-controlled sun dial (morning → afternoon → dusk → evening). Warm/cool color temperature, long shadows, projected colored glass, exterior leaf motion, barely perceptible dust motes and material shimmer.
- Sunlight and glass are relational: window orientation controls direction and color of floor illumination. For unverified orientation, label visualization interpretive.
- Ambient sound optional and **off by default**; only enable on explicit gesture. Never autoplay sound.
- Reduced-motion setting freezes atmospheric motion but keeps interaction and lighting selection functional.

### B. Spatial continuity
- Camera movement honors floor and passage relationships. Enter, turn, approach, inspect, return; each action preserves the visitor's mental map.
- Tap a hotspot to approach a detail with smooth ease, reveal evidence in an overlay, then back to the exact prior viewpoint. No browser scroll-jump.
- Optional compact spatial map, only if grounded. Current position, visited places, next passages; tap to navigate. Show conceptual vs verified geometry clearly.
- Provide persistent minimal controls: back, map, time/light, sound, source/info. Icon-first with accessible labels; no clutter.

### C. Memory / architectural time
- Period control changes the **scene**, not merely a paragraph: furnishings, finish treatments, color and architectural layers transition with documented certainty.
- Key researched event: circa 1920 Zuber Eldorado installation. Present-day and interpretive pre-installation states; visibly identify reconstruction.
- Period transitions interpolate at the element level where possible, rather than cross-fading whole pages. Historical provenance remains one tap away.
- Do not invent a precise chronology beyond sources.

### D. Material / construction
- Touch dragon newel: camera moves in; reveal carving silhouette, woodgrain, maker/material context only when verified. Procedural “how carving works” can be marked educational.
- Touch stained glass: projection and light-angle demonstration; optionally separate lead/came/glass layers with a material explainer.
- Touch Zuber wallpaper: interactive hand-print layering with researched process, simulated registration and color separation. The documented figures (1,554 blocks / 210 colors) are explanatory data, **not** a claim we possess the original plates or separations.
- Each discovery has three depths: immediate tactile response, concise narrative, optional deeper archival source. No walls of text forced on first tap.

### E. Possibility / future lives
- Toggle scenarios: private residence, creative residency, cultural destination, hospitality. Scenarios change furnishings, circulation, lighting and landscape use as **illustrative overlays**, not claims about permissions or structural feasibility.
- Each scenario includes practical questions and what must be verified (zoning, historic restrictions, costs, accessibility, occupancy, etc.) in unobtrusive deeper panels.
- Provide a single natural path to the authorized listing agent when the visitor chooses to inquire.

## 5. Content and visual provenance

**Primary source:** https://housesofkansascity.com/blog/the-shakespeare-chateau-one-of-americas-most-extraordinary-historic-estates-is-now-available  
**Estate:** https://www.shakespeareonhall.com/

Known agent-described claims (reverify against current listing before shipping):
- Completed 1885; architect Edmond Jacques Eckel; commissioned by Colonel Nathan Phipps Ogden.
- 47 original stained-glass windows, carved dragon staircase newels, eight fireplaces.
- Zuber Eldorado panorama installed circa 1920; 1,554 woodblocks and 210 colors reported.
- Main residence approximately 9,000 square feet above grade; eight bedrooms; six full bathrooms.
- Carriage house with three apartments; companion building at 819 Hall Street.
- Separate residential and commercial offerings; authorized agent Anthony West, Sage Sotheby's International Realty.
- Showing requirements may change; route to current official agent details, do not hardcode stale terms.

**Source discipline:** Link factual statements to evidence. Use image URLs from original publishers where suitable, preserve attribution, and record media origin. Do not invent a photograph, tour, architectural plan, historic occupant, material, or room dimension. Interpretive reconstructions are encouraged and should be distinguishable from documentary evidence without filling the experience with legalistic disclaimers.

**Asset discovery sprint before building:** inventory official estate photos, listing galleries, floorplans, existing 3D tour, architectural history, public archives and historical images. Record asset dimensions, source, usefulness and geometry confidence in `assets.md`. Choose one spectacular exterior and one strong entrance/staircase reference. Reuse media rather than settling for decorative placeholders.

## 6. Information architecture

World scene (primary) with ephemeral contextual layers:
1. **Arrival** — immediate atmosphere and invitation.
2. **Explore** — continuous space and architectural objects.
3. **Inspect** — near-field object study, tactile manipulation, 1–3 sentences, deeper evidence optional.
4. **Time** — day/night and historical period as separate controls; never confuse solar time with year.
5. **Estate** — grounded spatial relationship of main house, carriage house, 819 Hall, grounds.
6. **Imagine** — futures visualized in place.
7. **Inquire** — agent-directed link; no lead capture or invented availability.

Controls float over the scene; panels should be translucent/opaque as required for readability, bottom sheets on phones and side panels on wide screens. No conventional top navigation occupying a quarter of the viewport.

## 7. Art direction

Gilded Age dignity without theme-park excess. A deep evergreen / warm ivory / antique brass palette; typographic pairing of elegant serif display and compact legible sans; restrained editorial captions; cinematic but truthful photography. Let wood, stone, glass and light carry the richness. No blue hyperlinks, default visited purple, saturated UI chrome, generic cards, fake property metrics, enormous marketing copy or gratuitous animated flourishes.

Motion: natural, slow, non-loop-obvious, interruptible, state-driven. The home should feel inhabited by time and light, not haunted or mechanically fidgeting. Motion respects `prefers-reduced-motion` and battery/performance constraints.

## 8. Technical architecture

- GitHub Pages static deploy, same canonical URL, relative asset paths. Modular `world/` code is acceptable; avoid a single unmaintainable god file. Keep source legible and composable.
- Proposed modules: `world/data.js` (graph, claims, evidence), `world/scene.js` (rendering), `world/navigation.js`, `world/atmosphere.js`, `world/history.js`, `world/interaction.js`, `world/ui.js`, `world/state.js`. Split only where complexity warrants; do not overengineer.
- Explicit lifecycle: init → load lightweight shell → stream priority images/textures → interactive → progressive enrichment; graceful fallback if WebGL or remote media fails.
- State machine: `arrival | explore | transition | inspect | timeline | scenario`; modal sheet orthogonal to world state. Serialize route to URL hash or history state for back/forward and deep linking.
- `requestAnimationFrame` only when necessary or low-frequency idle animation; pause when page hidden. ResizeObserver/viewport handling; devicePixelRatio cap on phones; lazy/decode media; LOD and adaptive quality.
- Loading target: meaningful interactive arrival rapidly on ordinary mobile network; progressively enhance rather than block on huge textures. Target smooth 60fps on modern phones, graceful 30fps lower tier; no guaranteed metrics without device measurement.
- Persistent user progress (explored objects, preferences, current scene) in localStorage with schema/version and safe reset; no personal tracking required. Avoid intrusive analytics.
- Source and asset manifest so replacement of an image or claim doesn't require code surgery.
- Errors must fail soft: no black screen; visible scene fallback and navigation.

## 9. Build order / milestones

**M0 — Evidence and visual inventory.** Inspect the current implementation and public property assets; produce `assets.md` with links, source, intended scene usage and verified/interpretive flags. Pick reference image and camera composition. Confirm no fabricated plan.

**M1 — The threshold (first shippable vertical slice).** Replace the static hero with a gorgeous image-backed exterior and responsive entrance. Exterior → threshold → entrance hall/staircase, preserving orientation. Mobile touch, correct back behavior, custom focus, zero blue tap/highlight/link coloration. Even without advanced effects this must feel polished.

**M2 — The breathing hall.** Procedural architectural geometry and anchored imagery, sunlight dial, stained-glass projection, foliage/particles where appropriate, touch inspection, robust performance. No generic decorative wireframe substitute.

**M3 — The material discoveries.** Dragon, stained glass, woodwork, Zuber layered printing demonstration. Verified evidence and deep dive panels.

**M4 — Memory and time.** Historical period transitions, source confidence, documented circa-1920 wallpaper event.

**M5 — Estate and futures.** Main house/carriage/819 Hall spatial context, scenario overlays, buyer's route to agent.

**M6 — Polish and outreach readiness.** Mobile QA, reduced-motion, accessibility, broken-media fallback, cache busting, performance profile, source review, screenshots/video walkthrough and agent-facing concise share link.

Every milestone is deployable and independently testable. No premature expansion into dozens of rooms. Quality over breadth.

## 10. Acceptance tests

- On a 360×780 portrait viewport, first load presents a compelling architectural scene and clear entrance action, not a static article.
- A visitor can enter, approach the staircase, inspect a dragon or stained-glass detail, and return to the previous viewpoint with **no lost spatial context**.
- A sunlight control visibly changes the space and projected glass light.
- A historical control changes at least one actual scene element; interpretive states are identifiable.
- At least one material interaction is tactile, not a paragraph-only modal.
- Every visible architectural image and hotspot: **no blue tap flash, no blue outline, no blue link color, no ghost image dragging** on touch. Keyboard navigation still gets an elegant brass focus indicator.
- Touch, pinch, swipe and browser back work without page scroll, overscroll trap, broken focus, or browser navigation accidents.
- 320px narrow viewport, landscape, and large text remain usable. Reduced motion still works. Images fail gracefully.
- Source evidence can be opened without losing the current scene; all factual claims are supportable.
- No signup, popup, autoplay audio, ads, invented floorplans, invented tour, or seller impersonation.
- GitHub Pages live URL and current build identifier verified after deployment; no false claims of smoke testing.

## 11. Explicit non-goals

Not a Zillow competitor, brokerage, lead generation gate, social network, full BIM/photogrammetry reconstruction, unsupported 1:1 measured digital twin, or infinite open-world game. No haunting, impossible geometry, or fictitious real-estate defects here. No massive bespoke backend for a free exploratory prototype.

## 12. Next action

**Do not change the live app merely because this specification exists.** On explicit build instruction: first inspect the repo and source inventory, then implement M0→M1 with the mobile contract as a hard gate; proceed through milestones in small verified deployable increments. The goal is a **living, growing architectural experience**, not another attractive but lifeless landing page.
