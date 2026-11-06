# SUBVERSION

Independent, single-page institutional experiences. Each project owns its layout, identity, and interactions. **There is no universal scaffold, shell, or shared runtime.**

## Index

- [Projects and idea bank](PROJECTS.md) — concepts and creative lineage.
- [Human Resources portrait bank](hr/README.md) — reusable portrait sources, not an application.
- [RESOLVA](resolva/) — standalone experience.
- [CDC — Centers for Disease Cultivation](cdc/README.md) — experience specification; implementation pending.
- [SOMEWARE](someware/) — dual-world cloud preservation experience.

## Design invariants

These are constraints on **how we build**, not a prescribed visual style.

1. **Margins are architecture.** Use deliberate page gutters, section spacing, readable text widths, and consistent grid gaps. Images and text must have breathing room on every viewport. No collisions, accidental overlaps, clipped headings, or horizontal overflow.
2. **Images have intentional geometry.** Specify aspect ratios and focal points. Responsive crops must preserve the subject. Keep text and image layers separate when independent responsiveness is needed. Do not fix layout with arbitrary offsets.
3. **Mobile and desktop are one coherent experience.** Test narrow and wide viewports. Navigation and controls must be aligned, touch-friendly, and purposeful; never let a drawer accidentally replace the whole mobile site.
4. **No decorative link arrows.** Do not append ↗, →, or similar glyphs to links or buttons as an automatic convention. Use directional symbols only when the actual interaction requires direction, such as carousel controls or explicit back/next navigation.
5. **No unsolicited creative dilution.** Do not insert satire labels, disclaimers, apologies, explanatory winks, moralizing text, or generic filler into public-facing work. Preserve the intended institutional voice. If a genuine legal or safety constraint applies, address it narrowly and explicitly rather than silently rewriting the premise.
6. **Interactions must earn their place.** No component showrooms, generic drawers, or controls without a real user purpose. A single-page site can be rich without behaving like a collection of widgets.
7. **Validate, don't assert.** Inspect actual rendered mobile and desktop output before claiming visual quality; correct spacing and cropping problems at the layout-system level, not with one-off patches.

Every project may develop its own typography, color, layout, and behavior. These invariants prevent recurring mistakes without making the sites look alike.
