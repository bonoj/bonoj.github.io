# JIT Asimov — Build Specification

## Goal

Construct a mobile-first conversational instrument for querying Isaac Asimov's documented thought, interpreting it, and exploring explicitly hypothetical responses to modern questions. Do not claim resurrection, consciousness recovery, or access to private memories.

## Modes

- **Historical:** retrieve dated primary evidence, quote only verified short passages, distinguish paraphrase, cite title/date/edition or recording and locator; say when evidence is absent.
- **Interpretive:** derive a reasoned answer from cited material, identifying inference, disagreement, and uncertainty.
- **Speculative:** simulate a possible reply to unfamiliar or modern questions with prominent **imagined response** labeling; do not attribute invented text to the historical person.
- **Time lens:** filter by period and identify changed positions; never merge decades silently.

## Sources and rights

Maintain a versioned manifest: title, date, author, edition, source locator, rights status, ingestion status, passage IDs and offsets. Start with a small curated lawful corpus. Asimov's published books are not assumed public domain. No bulk copyrighted texts, recordings, or unauthorized voice cloning. Retrieval evidence is distinct from model prior knowledge.

## Runtime

One-page mobile-first interface; readable transcript; mode and period controls; source cards, uncertainty indicators, copy/export, accessible touch and keyboard behavior. Pipeline: question → time filter → retrieval → mode-specific synthesis → citation verification → display. Begin with deterministic retrieval. A future model service must use a separately secured backend; never ship credentials in static JavaScript. Label mock output explicitly.

## First executable slice

A live JIT page, a small verified source manifest, functional search and source citations, clear mode controls, and an honest empty-evidence state. Speculative generation may remain disabled until a genuine synthesis service exists. A useful test question concerns computers, education, and human–machine collaboration.

## Acceptance

Check dated source provenance, unsupported claims, contradictory eras, absent evidence, mode labeling, source links, mobile/keyboard navigation, no secrets, and build identity. Distinguish commit, workflow, and browser witness. Later compare reconstructions with held-out dated interviews; measure predictive and citation fidelity, not a percentage of a mind recovered.
