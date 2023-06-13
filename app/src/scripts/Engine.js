import equal from "fast-deep-equal";

export function check(formula, base, isAxiom) {
  let [result, agents, holes] = [
    true,
    new Array(base.agents),
    new Array(base.holes),
  ];

  if (isAxiom) {
    return checkFormula(formula, base.formula, agents, holes)[0];
  } else {
    [result, agents, holes] = checkFormula(
      formula,
      base.conclusion,
      agents,
      holes
    );

    if (!result) return [];
    return base.premises.map((premise) => initPremise(premise, agents, holes));
  }
}

function checkFormula(formula, ref, agents, holes) {
  if (ref.type === "hole") {
    if (holes[ref.hole] === undefined) {
      holes[ref.hole] = formula;
      return [true, agents, holes];
    } else {
      return [equal(holes[ref.hole], formula), agents, holes];
    }
  }

  if (formula.type !== ref.type) return [false, agents, holes];
  let result;

  switch (ref.type) {
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
      [result, agents, holes] = checkFormula(
        formula.left,
        ref.left,
        agents,
        holes
      );
      if (!result) return [false, agents, holes];
      return checkFormula(formula.right, ref.right, agents, holes);
    case "negation":
      return checkFormula(formula.formula, ref.formula, agents, holes);
    case "K":
    case "M":
      if (agents[ref.agent] === undefined) {
        agents[ref.agent] = formula.agent;
        return checkFormula(formula.formula, ref.formula, agents, holes);
      } else if (agents[ref.agent] !== formula.agent) {
        return [false, agents, holes];
      } else {
        return checkFormula(formula.formula, ref.formula, agents, holes);
      }
    default:
      throw new Error("Invalid reference type");
  }
}

function initPremise(premise, agents, holes) {
  switch (premise.type) {
    case "hole":
      return holes[premise.hole];
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
      return {
        type: premise.type,
        left: initPremise(premise.left, agents, holes),
        right: initPremise(premise.right, agents, holes),
      };
    case "negation":
      return {
        type: premise.type,
        formula: initPremise(premise.formula, agents, holes),
      };
    case "K":
    case "M":
      return {
        type: premise.type,
        agent: agents[premise.agent],
        formula: initPremise(premise.formula, agents, holes),
      };
    default:
      throw new Error("Invalid premise type");
  }
}
