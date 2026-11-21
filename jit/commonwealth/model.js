/* COMMONWEALTH v0.1: pure illustrative arithmetic; no external effects. */
(function (root) {
  "use strict";
  function finiteNonnegative(x, name) {
    if (typeof x !== "number" || !Number.isFinite(x) || x < 0) throw new RangeError(name + " must be finite and nonnegative");
    return x;
  }
  function fraction(x, name) {
    finiteNonnegative(x, name);
    if (x > 1) throw new RangeError(name + " must be <= 1");
    return x;
  }
  function calculateScenario(s) {
    const population = finiteNonnegative(s.population, "population");
    const coverageFraction = fraction(s.coverageFraction, "coverageFraction");
    const annualNeedPerPerson = finiteNonnegative(s.annualNeedPerPerson, "annualNeedPerPerson");
    const taxableBase = finiteNonnegative(s.taxableBase, "taxableBase");
    const effectiveAnnualRate = fraction(s.effectiveAnnualRate, "effectiveAnnualRate");
    const deliveryEfficiency = fraction(s.deliveryEfficiency, "deliveryEfficiency");
    const existingAnnualFunding = finiteNonnegative(s.existingAnnualFunding, "existingAnnualFunding");
    const annualBirths = finiteNonnegative(s.annualBirths, "annualBirths");
    const childEndowment = finiteNonnegative(s.childEndowment, "childEndowment");
    const eligiblePeople = population * coverageFraction;
    const grossAnnualRevenue = taxableBase * effectiveAnnualRate;
    const usableAnnualRevenue = grossAnnualRevenue * deliveryEfficiency;
    const annualBasicNeed = eligiblePeople * annualNeedPerPerson;
    const annualChildCommitment = annualBirths * childEndowment;
    const totalAnnualRequirement = annualBasicNeed + annualChildCommitment;
    const availableAnnualResources = usableAnnualRevenue + existingAnnualFunding;
    const balance = availableAnnualResources - totalAnnualRequirement;
    const fundedShare = totalAnnualRequirement === 0 ? 1 : Math.min(1, availableAnnualResources / totalAnnualRequirement);
    return { eligiblePeople, grossAnnualRevenue, usableAnnualRevenue, annualBasicNeed, annualChildCommitment, totalAnnualRequirement, availableAnnualResources, balance, fundedShare };
  }
  root.CommonwealthModel = { calculateScenario };
})(typeof window !== "undefined" ? window : globalThis);
