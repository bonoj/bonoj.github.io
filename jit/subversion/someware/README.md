# SOMEWARE — Build specification

**Status:** Initial implementation in `index.html`. **Path:** `jit/subversion/someware/`. **Parent:** [Subversion README](../README.md). Inherit all seven parent design invariants by reference. Independent, responsive single-page experience; no shared shell/runtime.

## Product
SOMEWARE is a serene consumer cloud-storage company promising infinite, permanent preservation. **Tagline: “It's in a better place.”** Proprietary **Null Point Technology™** and extensive **Galactic-Class Storage Facilities™** make its claims sound technologically inevitable. The actual interaction accepts a user's offering and discards it; there is no retrieval. The company never breaks character or explains the inversion.

## Visual architecture — two worlds, one continuous page
**WHITE / landing:** Luminous, spacious, premium cloud-technology-meets-wellness design. Minimal monochrome **outline-cloud** mark and uppercase **SOMEWARE** wordmark. Large, photorealistic serene white sci-fi architecture and soft daylight. Promise, technology, infrastructure, and pricing live here. No GitHub visual language, conventional drive interface, neon sci-fi, or playful mascot.

**BLACK / functionality:** Scrolling crosses a deliberate visual threshold into a nearly black cosmic environment. A beautiful, scientifically recognizable **black-hole accretion disc with gravitational lensing** is the centerpiece, not a horror image. Intake and its outcome happen here. Black must be as serene and carefully art-directed as white. Preserve a single continuous, navigable, coherent mobile/desktop page; do not make two sites or a fixed split-screen.

**Assets:** Use distinct, high-quality imagery for luminous architectural serenity and gravitationally lensed accretion. Keep typography and controls as separate responsive layers. Art-direct aspect ratios/focal points for narrow and wide screens. Avoid low-resolution stretched imagery and heavy scroll-jank effects.

## Page order
1. **White hero:** cloud logo, SOMEWARE, “It's in a better place.”, brief unlimited-storage promise, primary **Get started** anchor to intake.
2. **Freedom:** no folders, organization, or management. Reassuring human-scale editorial copy/imagery.
3. **Null Point Technology™:** brief, confidently evasive explanation of storage beyond conventional physical limits.
4. **Galactic-Class infrastructure:** monumental white facilities, vague geographic scope, restrained technical facts.
5. **Commitments:** Personal **Free**, Priority **20**, Legacy **200**, Institutional **∞**. One-time designations, no subscriptions. Currency is intentionally absent from display; the number represents commitment/significance, not a completed monetary transaction. Institutional card opens a non-telephone inquiry form.
6. **Transition:** visual descent from luminous white to cosmic black; natural scrolling, not a compulsory animation.
7. **Black intake:** **Add something** file-selection control; event-horizon/accretion feedback; final confirmation **“It's in a better place.”** Receipt/identifier if needed.
8. **Optional secondary Observation:** inspect a receipt to obtain a deterministic ghost. Do not displace intake as the core interaction.

## Commitments — charge for significance, never capacity
| Designation | Display | Meaning |
| --- | --- | --- |
| Personal | **Free** | Infinite intake, permanent preservation. |
| Priority Preservation | **20** | Elevated significance; one-time commitment. |
| Legacy Preservation | **200** | Generational continuity; one-time commitment. |
| Institutional Preservation | **∞** | Dedicated Galactic-Class stewardship; consultation inquiry. |

No currency symbols, pennies, monthly subscriptions, real payment collection, or faux checkout. Selecting a designation updates the intake context; Institutional opens an in-page inquiry form, not a phone call. Event Horizon Insurance™ is deferred.

## Core interaction and state
- File picker supports multiple files; drag-and-drop on desktop if straightforward. On mobile, a prominent touch-friendly picker. No real account required.
- Show local filename/count/size metadata only when needed for confirmation; never read file bytes. User action triggers a restrained accretion animation toward the black-hole image (or an accessible reduced-motion equivalent).
- Show success and the tagline; optional locally generated receipt ID. Return to a clean, nearly empty intake surface, not a file library. No file browser, download, thumbnails, or originals search.
- **No network transfer, storage, logging, or persistence of selected file content or text.** Do not create a file-ingest API. Release selected File references/reset input after confirmation. Do not claim the demo performs real backup in code or documentation.
- If implemented, **Observation** maps a receipt ID through a fixed deterministic seed to an unrelated procedural ghost. Same ID → same ghost across reloads; input bytes and names must not influence output. No backend.
- All interactive controls must work; omit features that would otherwise be decorative.

## Copy and tone
Institutionally impeccable, serene, generous, and confident. No satirical labels, disclaimers, apologies, meta commentary, sinister reveal, or wink in the **public-facing experience**. The contrast between comforting copy and cosmic mechanics is the joke. Avoid fake endorsements or claims of real independent certification.

Suggested short lines: **“It's in a better place.”** / **“Beyond storage.”** / **“Everything is taken care of.”** / **“All your information is equally safe. Some of it deserves more care.”** Use selectively; do not stack slogans.

## Definition of done
- Standalone site renders with convincing **white landing → black functionality** progression.
- Outline cloud and all-caps wordmark are consistent; no colored emoji substitution.
- Two visual environments are high quality and correctly cropped at narrow mobile and wide desktop sizes.
- Commitment cards show Free / 20 / 200 / ∞, with one-time significance and an in-page Institutional inquiry, without payment collection.
- File-selection/accretion/confirmation works, with no actual file retention or transmission.
- No conventional file-management UI; optional ghosts are deterministic and unrelated to files.
- Keyboard, touch, focus, contrast, reduced motion, and overflow checked in rendered views.
- Parent [Subversion invariants](../README.md) honored; public copy remains in character.
