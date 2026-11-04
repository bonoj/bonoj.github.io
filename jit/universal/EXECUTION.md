# Execution contract — integrated capabilities

The unit of delivery is a reader-visible, tested capability, not an isolated module or a commit. Every major iteration must:

1. Implement an end-to-end slice from seed through narrative state, scene realization, screenplay, and reader.
2. Run the complete existing test suite against the exact source being shipped. If that is not possible, report the verification gap rather than asserting tests passed.
3. Generate a corpus and inspect actual film content for repeated plots, generic dialogue, causal gaps, and genre leakage.
4. Distinguish architectural coverage from creative quality and byte uniqueness from semantic uniqueness.
5. Keep all advertised genres reachable in the public preview, marking immature adapters honestly.
6. Prefer expanding causal and semantic diversity over adding decorative metadata.
7. Update the spec, README, chronicle, and screening room together when behavior changes.
8. Do not declare feature-length success before the generated scripts contain substantial, causally necessary dramatic development. Target 55–85 scenes per feature; length alone does not prove quality.

**Acceptance gates:** every genre must generate reproducibly; state must replay; a reader must open and export each genre; genre-specific stakes and resolutions must be recognizable; dialogue and actions must be causally situated. Failing the latter gates means *fixture*, not *film*.

**Immediate priorities:** cross-genre semantic planning, actual scene transactions as the source of prose, character goals and informed decisions, substantial scene expansion, quality evaluation, then audience polish. Work across these concurrently rather than completing a deep subsystem in isolation.
