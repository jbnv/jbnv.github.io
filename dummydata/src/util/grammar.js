function singular() { return false; }
function plural() { return true; }
function singularOrPlural(fractionPlural) { return Math.random() < fractionPlural; }

export { singular, plural, singularOrPlural };
