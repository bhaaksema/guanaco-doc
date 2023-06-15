import equal from "fast-deep-equal";

export function check(formula, base, isAxiom) {
  let [result, agents, holes] = [
    true,
    new Array(base.agents),
    new Array(base.holes),
  ];

  if (isAxiom) {
    return noHoles(formula) && checkFormula(formula, base.formula, agents, holes)[0];
  } else {
    if (!noHoles(formula)) return false;
    [result, agents, holes] = checkFormula(
      formula,
      base.conclusion,
      agents,
      holes
    );

    if (!result) return false;
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
    case "E":
    case "C":
      return checkFormula(formula.formula, ref.formula, agents, holes);
    case "K":
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
      return (holes[premise.hole] ? holes[premise.hole] : premise);
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
    case "E":
    case "C":
      return {
        type: premise.type,
        formula: initPremise(premise.formula, agents, holes),
      };
    case "K":
      return {
        type: premise.type,
        agent: agents[premise.agent],
        formula: initPremise(premise.formula, agents, holes),
      };
    default:
      throw new Error("Invalid premise type");
  }
}

function noHoles(f) {
  switch (f.type) {
    case "hole":
      return false;
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
      return noHoles(f.left) && noHoles(f.right);
    case "negation":
    case "K":
    case "E":
    case "C":
      return noHoles(f.formula);
    case "proposition":
    case "formula":
      return true;
    default:
      throw new Error("Invalid formula type");
  }
}

export function fill(formula, hole) {
  switch (formula.type) {
    case "hole":
      return hole;
    case "conjunction":
    case "disjunction":
    case "implication":
    case "equivalence":
      return {
        type: formula.type,
        left: fill(formula.left, hole),
        right: fill(formula.right, hole),
      };
    case "negation":
    case "E":
    case "C":
      return {
        type: formula.type,
        formula: fill(formula.formula, hole),
      };
    case "K":
      return {
        type: formula.type,
        agent: formula.agent,
        formula: fill(formula.formula, hole),
      };
    case "proposition":
    case "formula":
      return formula;
    default:
      throw new Error("Invalid formula type");
  }
}
