export let axiomsList = [
  // propositional tautologies
  {
    name: "A1",
    agents: 0,
    holes: 0,
    formula: { type: "hole" },
  },
  // (K{1} f1 & K{1} (f1 -> f2)) -> K{1} f2
  {
    name: "A2",
    agents: 1,
    holes: 2,
    formula: {
      type: "implication",
      left: {
        type: "conjunction",
        left: { type: "K", agent: 0, formula: { type: "hole", hole: 0 } },
        right: {
          type: "K",
          agent: 0,
          formula: {
            type: "implication",
            left: { type: "hole", hole: 0 },
            right: { type: "hole", hole: 1 },
          },
        },
      },
      right: { type: "K", agent: 0, formula: { type: "hole", hole: 1 } },
    },
  },
  // K{1} (f1 -> f2) -> (K{1} f1 -> K{1} f2)
  {
    name: "A2'",
    agents: 1,
    holes: 2,
    formula: {
      type: "implication",
      left: {
        type: "K",
        agent: 0,
        formula: {
          type: "implication",
          left: { type: "hole", hole: 0 },
          right: { type: "hole", hole: 1 },
        },
      },
      right: {
        type: "implication",
        left: { type: "K", agent: 0, formula: { type: "hole", hole: 0 } },
        right: { type: "K", agent: 0, formula: { type: "hole", hole: 1 } },
      },
    },
  },
];
