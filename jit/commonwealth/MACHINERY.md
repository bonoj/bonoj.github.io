# COMMONWEALTH — Machinery and Runbook

## Runtime

Static GitHub Pages application at `jit/commonwealth/index.html`, using `model.js`. No dependencies, server, accounts, payment rails, network calls, or remote actions. It is a transparent, offline-capable *illustrative* fiscal simulator.

## Model contract

`calculateScenario({ population, coverageFraction, annualNeedPerPerson, taxableBase, effectiveAnnualRate, deliveryEfficiency, existingAnnualFunding, annualBirths, childEndowment })`

- `population`: persons.
- `coverageFraction`: share of population considered in need (0–1).
- `annualNeedPerPerson`: USD/person/year additional resource requirement.
- `taxableBase`: USD stock of modeled assets (not automatically liquid).
- `effectiveAnnualRate`: fraction of that stock yielding gross fiscal revenue annually; **not** a statutory tax rate.
- `deliveryEfficiency`: share of gross revenue assumed usable for provision (0–1).
- `existingAnnualFunding`: USD/year separately committed.
- `annualBirths`: persons/year.
- `childEndowment`: USD per newborn.

Computed: eligible population, gross annual revenue, usable annual revenue, annual need, annual endowment obligation, total requirement, net balance and funded share. Formula is deliberately simple; it makes no prediction about market response, policy feasibility or distribution logistics.

## Test procedure

1. Open `index.html` in a browser served from the repository; inspect values and labels.
2. Change taxable base, effective rate, delivery efficiency and needs. Confirm recalculation.
3. Set effective rate to zero and existing funding to zero: funded share must be zero when need is positive.
4. Set delivery efficiency to zero: modeled new revenue must be zero.
5. Increase child endowment: total annual requirement must increase by annual births times the increment.
6. Confirm no button triggers a transfer, threat, submission, or network action.
7. Check mobile layout, readable labels and keyboard operation.

## Provenance discipline

Every imported dataset requires `source, publisher, URL, publication date, reference year, geography, units, methodology, caveats, license, retrieval date`. Preserve original values and derived calculations separately. No unsupported global totals.

## Release and verification

Source commit ≠ successful GitHub Pages deployment ≠ independently tested browser behavior ≠ real-world effect. Read back all written files. If publication is not verified, report only the source commit. Preserve `jit/` boundaries and root site.

## Next engineering tasks

1. Add deterministic model tests and boundary cases.
2. Add regional data manifest and citations.
3. Add sensitivity bands and scenario comparison.
4. Add governance stress tests for institutional capture and rights violations.
5. Conduct external review before any real-world advocacy or pilot.
