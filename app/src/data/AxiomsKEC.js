const axiomsList = [
  // A1: Propositional tautologies
  // TODO: implement
  {
    name: "A1",
    agents: 0,
    holes: 0,
    formula: { type: "hole" },
  },
  // A2: Modus ponens for knowledge
  // (K{a} f1 & K{a} (f1 -> f2)) -> K{a} f2
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
  // A2': Distribution of K over ->
  // K{a} (f1 -> f2) -> (K{a} f1 -> K{a} f2)
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
  // A6: Definition of E
  // TODO: implement

  // A7: Common knowledge implies truth
  {
    name: "A7",
    agents: 0,
    holes: 1,
    formula: {
      type: "implication",
      left: { type: "C", formula: { type: "hole", hole: 0 } },
      right: { type: "hole", hole: 0 }
    },
  },
  // A8: Mix of common knowledge
  {
    name: "A8",
    agents: 0,
    holes: 1,
    formula: {
      type: "implication",
      left: { type: "C", formula: { type: "hole", hole: 0 } },
      right: {
        type: "E", formula: { type: "C", formula: { type: "hole", hole: 0 } }
      }
    }
  },
  // A9: Modus ponens for common knowledge
  {
    name: "A9",
    agents: 0,
    holes: 2,
    formula: {
      type: "implication",
      left: {
        type: "conjunction",
        left: { type: "C", formula: { type: "hole", hole: 0 } },
        right: {
          type: "C",
          formula: {
            type: "implication",
            left: { type: "hole", hole: 0 },
            right: { type: "hole", hole: 1 },
          },
        },
      },
      right: { type: "C", formula: { type: "hole", hole: 1 } },
    },
  },
  // A9': Distribution of C over ->
  {
    name: "A9'",
    agents: 0,
    holes: 2,
    formula: {
      type: "implication",
      left: {
        type: "C",
        formula: {
          type: "implication",
          left: { type: "hole", hole: 0 },
          right: { type: "hole", hole: 1 },
        },
      },
      right: {
        type: "implication",
        left: { type: "C", formula: { type: "hole", hole: 0 } },
        right: { type: "C", formula: { type: "hole", hole: 1 } },
      },
    },
  },
  // A10: Induction for common knowledge
  {
    name: "A10",
    agents: 0,
    holes: 1,
    formula: {
      type: "implication",
      left: {
        type: "C",
        formula: {
          type: "implication",
          left: { type: "hole", hole: 0 },
          right: {
            type: "E",
            formula: { type: "hole", hole: 1, }
          },
        },
      },
      right: {
        type: "implication",
        left: { type: "hole", hole: 0 },
        right: {
          type: "C",
          formula: { type: "hole", hole: 1 },
        },
      },
    },
  },
];

export default axiomsList;
