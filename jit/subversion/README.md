# SUBVERSION

**A nursery of independent, single-page institutional experiences.** Each project lives in its own folder. The scaffold is cloned and mutated; it is not a shared runtime, content renderer, or shell.

## Index

- [Scaffold laboratory](scaffold/) — [open interactive preview](https://bonoj.github.io/jit/subversion/scaffold/). Standalone HTML with working interaction patterns and deliberately blank image placeholders.
- [Projects and idea bank](PROJECTS.md) — preserved project concepts and creative lineage.
- [Human Resources portrait bank](hr/README.md) — reusable portrait sources; not an HR site implementation.
- [RESOLVA](resolva/) — existing standalone project.

## Creative fidelity — non-negotiable

- Treat each institution's premise and voice seriously. The audience discovers the satire; the site does not explain its own joke.
- **Never insert unsolicited satire labels, disclaimers, moralizing copy, apologies, explanatory winks, or diluted substitute language into the public-facing experience.** This is a creative direction, not a waiver of actual legal or safety requirements. Address any genuine constraint narrowly and explicitly rather than silently neutering the concept.
- No generic filler that replaces deliberate copy. Avoid decorative external-link arrows and transparent controls when they compromise the visual language.
- The scaffold is not a prescribed visual identity: each clone may diverge completely.

## Composition — correct by construction

- **Margins are architecture.** Establish responsive page gutters, section spacing, readable line lengths, consistent card gaps, and deliberate image aspect ratios at the primitive level.
- Text and images occupy intentional layout regions; never rely on accidental overlap, clipped text, or one-off offsets to make a screenshot work.
- Maintain image focal points and crop behavior as images change. Avoid images with embedded text where independent responsive layers are needed.
- Mobile and desktop are one experience: columns stack, navigation adapts, controls remain touch-sized, and horizontal overflow is prohibited.
- Use consistent spacing tokens and clamp-based responsive typography; respect reduced-motion preferences, keyboard access, and visible focus.
- Review at narrow and wide viewport sizes before publication. Do not claim visual validation without actually checking rendered output.

## Clone contract

1. Copy `scaffold/index.html` into a new sibling folder, e.g. `new-institution/index.html`.
2. Replace placeholders, copy, imagery, and identity. Remove any unused demonstration sections or interactions.
3. Keep HTML, CSS, and JavaScript locally owned by the new page. No dependency on the scaffold or another Subversion site at runtime.
4. Preserve useful accessibility and responsive behavior while allowing unrestricted artistic mutation.
5. Publish the independent folder under `jit/subversion/<slug>/`; add it to this index.

## Scaffold interaction inventory

The laboratory exposes responsive navigation, theme switching, editorial hero, cards, alternating split sections, metrics, tabs, native accordions, carousel, filterable gallery, modal dialog, side drawer, notifications, and a validated **demo-only** form. All images are placeholders; the demo form does not send or store data. The scaffold is a specimen tray, not a requirement to ship every interaction in every clone.
