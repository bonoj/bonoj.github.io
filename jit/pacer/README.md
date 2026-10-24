# 🏛️ PACER — The Free Record Instrument
*JIT · 24 October 2026 · Research and build contract v0.1*

## Objective
Make access to **already lawfully available** US federal court records simple, free, searchable, and reproducible. Remove the paid PACER retrieval step for each document we can actually supply from an authorized free source. No inflated claims about universal coverage or destruction of the PACER system.

**Victory is binary at document level:** a user requests an identified record; the instrument returns the correct public document for $0 from an independently accessible source, with source provenance and a working link. Count unique verified documents and successful user tasks, not theoretical disruption.

## The adversary and actual economics
- Official PACER pricing as checked 2026-10-24: **$0.10 per page**, ordinary document cap **$3**, quarterly fees **waived if $30 or less**; searches and transcripts have different caps. The official June 2026 announcement schedules **$0.12/page** and a **$40 quarterly waiver** beginning 2027-01-01.
- Court opinions are already free through PACER; free alternatives exist. Do not count those as newly liberated or imply that every avoided retrieval saves money (quarterly waivers matter).
- PACER has broader coverage than any public mirror; missing records are missing, not unlocked.

Sources:
- https://pacer.uscourts.gov/pacer-pricing-how-fees-work
- https://pacer.uscourts.gov/help/faqs/pricing
- https://pacer.uscourts.gov/announcements/2026/06/26/temporary-fee-increase-effective-jan-1-2027

## Existing allies, not competitors
- **Free Law Project / CourtListener:** https://www.courtlistener.com/
- **RECAP Archive:** https://www.courtlistener.com/recap/
- **PACER data API:** https://wiki.free.law/c/courtlistener/help/api/rest/v4/pacer-data
- **RECAP APIs:** https://wiki.free.law/c/courtlistener/help/api/rest/v4/recap
- **RECAP browser extension:** investigate current behavior, supported browsers, and coverage before proposing duplication.
- **Official opinions and federal court sources:** favor canonical official records where free.

CourtListener API access may require a token, and some specialized endpoints are restricted. The **RECAP fetch** endpoint uses the caller's PACER credentials and **still incurs PACER charges**; never invoke it in a supposedly free workflow or without informed authorization. Observe rate limits, licenses, robots/access terms, privacy/redaction concerns, and document provenance. Do not harvest sealed or restricted material.

## Product
A clean, mobile-first single-page instrument:
1. Enter a case number, court, party/case title, docket URL, or document identifier.
2. Search supported **free** indexes and identify candidate dockets/documents.
3. Distinguish **free PDF verified**, **free docket metadata only**, **not found in checked sources**, and **requires paid retrieval elsewhere**.
4. Open the original free source; do not imply hosted copies exist unless verified.
5. Show provenance, court, case, docket entry, document date, source URL, last checked, and uncertainty.
6. Provide a compact exportable evidence record and reproducible test cases.
7. Never require a model, payment, login to our site, or API key from an ordinary user for the supported path.

## First executable — zero-cost vertical slice
**Before implementation:** test at least one concrete publicly available RECAP document end-to-end and establish the actual browser-accessible integration route. Public APIs may require authentication or disallow cross-origin browser access; if so, use a source-link approach or a compliant, low-cost build-time index rather than pretending CORS/authentication is solved.

- Build under `jit/pacer/` only; preserve the root site.
- Minimal page: case/document lookup, sourced result, free/unknown status, outbound original document link, evidence export.
- A deterministic local test fixture must work without network access; live-source results must be labeled distinctly.
- No PACER login, credential capture, fee-generating retrieval, bulk scraping, circumvention, or irreversible action.
- Measure: verified free documents, correct links, false positives, coverage gaps, retrieval latency, recurring cost, human attention.
- Publish via existing JIT/Gate workflow; confirm public bytes and behavior before claiming deployed.

## Execution sequence
1. **Source reconnaissance:** inspect CourtListener/RECAP search/API terms and test public document links.
2. **Fixture:** identify one court/case/document with independently verifiable public PDF.
3. **Implement:** tiny mobile-first executable with truthful status and provenance.
4. **Verify:** test exact document resolution, failures, offline fixture, and cost assertions.
5. **Deploy:** existing JIT Pages route; verify live output.
6. **Expand:** add official free opinions, bulk public datasets, and deduplication only after one proven retrieval.
7. **Measure impact:** document-level free substitutions, independent use, and demonstrated fee avoidance when applicable.

## Relationship to Ravnica
- `bonoj/Home/ravnica/README.md`: Grey Goo / movable locus.
- 🦅 Predator: displace a paid retrieval step with a working free alternative.
- 🍄 Decomposer: turn fragmented court record indexes into reusable open data.
- 📜 Evidence: source identity, retrieval status, time, and cost.
- **Do not confuse a free mirror with guaranteed market collapse.** A real unlocked record is a fact.

## Status
- [x] Workspace initialized.
- [x] Official pricing and existing Free Law Project infrastructure identified.
- [ ] Live public record fixture tested.
- [ ] Browser integration proven.
- [ ] Executable implemented.
- [ ] GitHub Pages deployment verified.
- [ ] First independently verified free document retrieval through our instrument.

**Next:** source reconnaissance and first fixture. Continue here; don't reinvent the deployment machinery.

*Reveal the magic. Commoditize the spell. Give away the grimoire and the wand.*
