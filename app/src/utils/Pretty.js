function pretty(formula, top = true) {
  let bin = {
    conjunction: "&",
    disjunction: "|",
    implication: "->",
    equivalence: "<->",
  };
  let un = { negation: "!", K: "K", M: "M" };

  switch (formula.type) {
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
      return `${top ? "" : "("}${pretty(formula.left, false)} ${
        bin[formula.type]
      } ${pretty(formula.right, false)}${top ? "" : ")"}`;
    case "negation":
      return `${un[formula.type]} ${pretty(formula.formula, false)}`;
    case "K":
    case "M":
      return `${un[formula.type]}{${formula.agent}} ${pretty(
        formula.formula,
        false
      )}`;
    case "proposition":
    case "formula":
      return formula.value;
    default:
      throw new Error(`Unknown formula type: ${formula.type}`);
  }
}

export default pretty;
