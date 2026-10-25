# HAUSGEIST
*Exceptional properties. Persistent histories.*

**Working specification · JIT / Hausgeist · v0.1 · 2026-10-25**

## Premise
Hausgeist is an immaculate luxury real-estate discovery platform with authentic property information and an increasingly unreliable physical universe. It is not framed as a horror game. Its listings, agents, calculators, records and market analysis remain professionally composed while buildings undergo impossible changes.

**Core mechanism:** persistent, observable contradictions. A four-bedroom property becomes five bedrooms when revisited; the current floor plan and appraisal agree, but a historical article still describes the demolished fifth room. The UI treats the current version as authoritative.

## Product experience
Brand: **HAUSGEIST**. Tagline: **Exceptional properties. Persistent histories.**

Primary screens:
1. Discover: editorial property grid, search, filters, sort, saved homes.
2. Property: photography, price, dimensions, description, agent, disclosures.
3. Gallery: large photographs, captions, room identities.
4. Floor plans: interactive rooms, topology, dimensions.
5. History: sales, renovations, incidents, listing revisions.
6. Records: linked fictional news, inspections, municipal documents.
7. Compare: side-by-side property analysis.
8. Inquiries: tours, messages, offers, agent correspondence.

The first impression must be indistinguishable in polish from a premium real-estate portal.

## Two realities, one listing
**Factual layer:** sourced real address, listing metadata, price, photos when licensed, dimensions, genuine disclosures and attribution. This remains immutable.

**Fictional anomaly layer:** impossible architecture, fictional incidents, occupants, environmental events, historical evidence and displayed revisions.

Anomaly-driven display changes never overwrite factual source records. Actual property disclosures remain accessible and separate from Hausgeist's fictional paranormal disclosures. Do not invent crimes, murders or accusations involving identifiable real residents or addresses and pass them off as historical facts. Fictional incidents live in the site's fictional case files. If real property feeds are unavailable, use curated attributed data or explicitly fictional demo inventory, not invented live listings.

## Case state and anomaly families
Each property has persistent case state, revisions, observation history, and a distinctive coherent obsession rather than random gags.

- **Topological:** new rooms, impossible hallways, reversed doors, dimensions, basements larger than parcels.
- **Temporal:** moving sale dates, retroactive renovations, construction predating settlements, future residents in old photos.
- **Occupancy:** unregistered residents, silhouettes, recurring signs of habitation, contradictory census data.
- **Environmental:** unexplained temperatures, displaced daylight, upward water, localized weather.
- **Documentary:** reports that amend themselves, contradictory articles, disappearing permits.
- **Economic:** anomalous appraisals, maintenance costs, pricing adjustments and financing consequences.

Example HG-0041, Ashcroft Residence: original four bedrooms, later five; +218 sq ft; one unresolved occupant; municipal and current plans disagree.

## Defining mechanic: reality shifts outside attention
Track **what the visitor has actually observed**. The anomaly engine may mutate evidence while it is outside the viewport, behind another tab, or on a different route.

Rules:
1. Most mutations occur only when the relevant evidence is unobserved; a few disturbances are deliberately visible.
2. Mutations have causal triggers, update persistent case state, and propagate to affected views.
3. Revisiting shows the new state, never an automatic reset.
4. Some historical artifacts preserve prior versions, leaving investigable contradictions.
5. Not every return causes a change.
6. Changes propagate across cards, details, floor plans, comparisons, records, maps and agent responses.
7. The system remembers what the visitor witnessed.
8. Anomaly changes are state-driven, **not arbitrary DOM vandalism**.

A representative sequence: inspect four bedrooms → navigate to municipal records → return → five bedrooms and updated area; historical plan still shows four. The change must be coherent across current representations, while old evidence survives.

## Evidence network
Each case has interconnected fictional artifacts: articles with publication, byline, date, headline, body and related links; inspection reports; permit records; archival photography; correspondence. These are fictional publications and records within Hausgeist's narrative universe, not fabricated citations to actual journalism.

Example Ashcroft chronology:
- 1978: contractor finds a sealed bedroom.
- 1982: inspection denies the room exists.
- 1996: photograph shows five upstairs windows; original plans show four.
- 2026: listing includes fifth bedroom.
- On return, the 1978 photograph changes while its article text does not.

Articles link to other properties and records, enabling investigation and cross-property patterns.

## Agency and character
Agents are competent, professional, and unflappable. The agency seeks to sell properties, resolve discrepancies, maintain customer confidence and close transactions. Case-aware authored dialogue and conditional correspondence are preferable to generic chat for the first version.

Example: “The fifth bedroom is included in the current asking price. Its access arrangements are subject to confirmation.”

Agent responses reflect current anomaly state and previous visitor inquiries; contradictions can emerge naturally.

## Visual direction
Immaculate luxury editorial design, never theatrical horror UI.
- Warm ivory `#F5F2EC`
- Charcoal `#222320`
- Oxblood `#683B3E`
- Muted brass `#B19A70`
- Cool stone `#9A9C98`

High-contrast architectural serif wordmark and headings, restrained sans-serif navigation and financial data. Credible beautiful property photography. Subtle photographic changes that challenge the visitor's memory. Mobile-first, single coherent browsing experience.

## Architecture
Static GitHub Pages JIT with modular systems:
- `catalog`: factual inventory, provenance.
- `casebook`: fictional histories and anomaly identities.
- `observer`: viewport, navigation and observed evidence.
- `anomaly`: deterministic state transitions, propagation.
- `records`: news, inspections, permits, correspondence.
- `agency`: case-aware dialogue and commercial workflows.
- `presentation`: search, cards, galleries, plans, archives, comparisons.
- `persistence`: local browser storage, revisions and visit history.

The first pass needs no backend. Use reproducible seeds, explicit state transitions and inspectable diagnostics.

## First-pass deliverable
Build and deploy to `jit/hausgeist/` as a polished, functional property portal with:
- Convincing homepage and navigation.
- Browsable, searchable, filterable, saveable and comparable listings.
- Detailed properties and photographs.
- Multiple coherent anomaly cases.
- Interactive floor plans and evolving measurements.
- Interconnected fictional news archive and case documents.
- Professional case-aware agent interaction.
- Observer-driven mutation and persistent browser state.
- Mobile-first responsive layouts.

## Acceptance tests
1. Before anomalies, site looks like an expensive real-estate product.
2. Browse, open, filter, save and compare work.
3. Facts can change after leaving view, with no mutation requirement on every visit.
4. Return preserves new case state; reload persists it.
5. Floor-plan changes correspond to room count and area changes.
6. An archival artifact contradicts the current property.
7. An article links to another property or evidence.
8. Agent correspondence reflects current anomaly state.
9. Cases remain coherent across navigation and repeated visits.
10. Mobile scroll and navigation have no accidental overflow.
11. Real factual source data is not overwritten by fictional anomalies.

## Elevation: contagion
Anomalies can move across saved properties. A room, wallpaper, figure or doorway from one listing appears in another, eventually revealing a shared interior space between properties in different cities. The user's shortlist becomes a cross-property narrative instrument.

**North star:** the visitor begins looking for a house, then discovers that the houses have been looking for them.

## Implementation handoff
This file is the authoritative creative and technical specification. Preserve three non-negotiables: immaculate real-estate presentation; factual/anomaly separation; observer-driven, persistent, causally coherent reality shifts. Build the JIT in one cohesive pass, then verify source and live behavior separately.
