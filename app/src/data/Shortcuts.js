const shortcuts = [
  // K-distribution
  {
    name: "KD",
    agents: 1,
    holes: 2,
    premises: [
      { type: "implication", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
    ],
    conclusion: {
      type: "implication",
      left: { type: "K", agent: 0, formula: { type: "hole", hole: 0 } },
      right: { type: "K", agent: 0, formula: { type: "hole", hole: 1 } },
    },
  },
  // Equivalence introduction
  {
    name: "EI",
    agents: 0,
    holes: 2,
    premises: [
      { type: "implication", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
      { type: "implication", left: { type: "hole", hole: 1 }, right: { type: "hole", hole: 0 } },
    ],
    conclusion: {
      type: "equivalence",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 1 },
    },
  },
  // Equivalence elimination
  {
    name: "EE",
    agents: 0,
    holes: 2,
    premises: [
      { type: "equivalence", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
    ],
    conclusion: {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 1 },
    },
  },
  // Equivalence elimination
  {
    name: "EE'",
    agents: 0,
    holes: 2,
    premises: [
      { type: "equivalence", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
    ],
    conclusion: {
      type: "implication",
      left: { type: "hole", hole: 1 },
      right: { type: "hole", hole: 0 },
    },
  },
  // K-distribution <->
  {
    name: "KD↔",
    agents: 1,
    holes: 2,
    premises: [
      { type: "equivalence", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
    ],
    conclusion: {
      type: "equivalence",
      left: { type: "K", agent: 0, formula: { type: "hole", hole: 0 } },
      right: { type: "K", agent: 0, formula: { type: "hole", hole: 1 } },
    },
  },
  // Hypothetical syllogism
  {
    name: "HS",
    agents: 0,
    holes: 3,
    premises: [
      { type: "implication", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
      { type: "implication", left: { type: "hole", hole: 1 }, right: { type: "hole", hole: 2 } },
    ],
    conclusion: {
      type: "implication",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 2 },
    },
  },
  // Hypothetical syllogism <->
  {
    name: "HS↔",
    agents: 0,
    holes: 3,
    premises: [
      { type: "equivalence", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
      { type: "equivalence", left: { type: "hole", hole: 1 }, right: { type: "hole", hole: 2 } },
    ],
    conclusion: {
      type: "equivalence",
      left: { type: "hole", hole: 0 },
      right: { type: "hole", hole: 2 },
    },
  },
  // Left-right strengthening
  {
    name: "LR",
    agents: 0,
    holes: 3,
    premises: [
      { type: "implication", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
    ],
    conclusion: {
      type: "implication",
      left: {
        type: "conjunction",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 2 },
      },
      right: {
        type: "conjunction",
        left: { type: "hole", hole: 1 },
        right: { type: "hole", hole: 2 },
      },
    },
  },
  // Contraposition
  {
    name: "CP",
    agents: 0,
    holes: 2,
    premises: [
      { type: "implication", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
    ],
    conclusion: {
      type: "implication",
      left: { type: "negation", formula: { type: "hole", hole: 1 } },
      right: { type: "negation", formula: { type: "hole", hole: 0 } },
    },
  },
  // TODO: No Contradiction 1

  // Combining
  {
    name: "CO",
    agents: 0,
    holes: 4,
    premises: [
      { type: "implication", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 2 } },
      { type: "implication", left: { type: "hole", hole: 1 }, right: { type: "hole", hole: 3 } },
    ],
    conclusion: {
      type: "implication",
      left: {
        type: "conjunction",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
      right: {
        type: "conjunction",
        left: { type: "hole", hole: 2 },
        right: { type: "hole", hole: 3 },
      },
    },
  },
  // Combining <->
  {
    name: "CO↔",
    agents: 0,
    holes: 4,
    premises: [
      { type: "equivalence", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 2 } },
      { type: "equivalence", left: { type: "hole", hole: 1 }, right: { type: "hole", hole: 3 } },
    ],
    conclusion: {
      type: "equivalence",
      left: {
        type: "conjunction",
        left: { type: "hole", hole: 0 },
        right: { type: "hole", hole: 1 },
      },
      right: {
        type: "conjunction",
        left: { type: "hole", hole: 2 },
        right: { type: "hole", hole: 3 },
      },
    },
  },
  // TODO: Substitution

  // TODO: No contradiction 2

  // E-distribution
  {
    name: "ED",
    agents: 0,
    holes: 2,
    premises: [
      { type: "implication", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
    ],
    conclusion: {
      type: "implication",
      left: { type: "E", formula: { type: "hole", hole: 0 } },
      right: { type: "E", formula: { type: "hole", hole: 1 } },
    },
  },
  // C-distribution
  {
    name: "CD",
    agents: 0,
    holes: 2,
    premises: [
      { type: "implication", left: { type: "hole", hole: 0 }, right: { type: "hole", hole: 1 } },
    ],
    conclusion: {
      type: "implication",
      left: { type: "C", formula: { type: "hole", hole: 0 } },
      right: { type: "C", formula: { type: "hole", hole: 1 } },
    },
  },
];

export default shortcuts;
