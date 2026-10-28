# Autology Chronicle

## 2026-10-28 — First light

User: “Can we make letters out of particles that appear no different from the text? The answer is yes. We use the text as a mask for the particles until the letter is triggered for destruction.”

User: “Right here in chat, decay the word decay into bbs that spill over the edge, fall, and bounce to rest via gravity. decay decays from the top down, and matter is conserved. So d has ~ same bbs as e, c probably slightly less. Etc.”

An in-chat prototype explored raster-masked intact glyphs, per-letter BB inventory, top-down erosion, gravity and bounce. The user responded “Fuck yes.” Naming discussion settled on **Autology**: language made physical; words perform their own meanings.

User initially considered a click-through bank, then clarified: “Agreed. Let's push it. We'll figure out how the site behaves later.” Therefore deploy the DECAY prototype without prematurely deciding navigation or a bank UX.

## 2026-10-28 — DECAY → GROWTH

User: “After decay is done, the button becomes growth. The bbs gather towards the center and stream upwards, branching into a tree to build as much of the word growth from the bottom up as they have material for.”

Implemented a second phase using the existing conserved BB inventory, a bottom-up target glyph mask for `growth`, and upward trunk-to-branch trajectories. No site bank or navigation designed yet.

## Growth correction

User clarified that BBs must not scatter simultaneously to all letter targets. Growth should build from the center outward, overlapping adjacent letters, with partial glyphs perfectly solid (e.g., `t` begins as a clean stem). The trunk and branches are temporary matter transport, ultimately merging into glyphs. Updated rendering to reveal exact font raster under a bottom-up, per-glyph growth front, with conserved BB allocation.
