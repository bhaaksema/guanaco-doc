const bin = {
  conjunction: "&",
  disjunction: "|",
  implication: "->",
  equivalence: "<->",
};

const un = { negation: "!", K: "K", M: "M" };

function pretty(formula, top = true) {
  switch (formula.type) {
    case "hole":
      return "?";
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
      return binary(top, formula);
    case "negation":
      return `${un[formula.type]} ${pretty(formula.formula, false)}`;
    case "K":
    case "M":
      return knowledge(formula);
    case "proposition":
    case "formula":
      return formula.value;
    default:
      throw new Error(`Unknown formula type: ${formula.type}`);
  }
}

function binary(top, formula) {
  const left = pretty(formula.left, false);
  const right = pretty(formula.right, false);
  const op = bin[formula.type];
  return top ? `${left} ${op} ${right}` : `(${left} ${op} ${right})`;
}

function knowledge(formula) {
  const subformula = pretty(formula.formula, false);
  return `${un[formula.type]}{${formula.agent}} ${subformula}`;
}

export default pretty;
