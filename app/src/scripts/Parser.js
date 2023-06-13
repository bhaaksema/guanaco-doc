import lexer from "./Lexer.js";
import { EmbeddedActionsParser } from "chevrotain";
const tv = lexer.tokenVocabulary;

class FormulaParser extends EmbeddedActionsParser {
  constructor() {
    super(tv);

    this.RULE("formula", () => {
      return this.OR([
        {
          GATE: this.BACKTRACK(this.binary),
          ALT: () => {
            return this.SUBRULE(this.binary);
          },
        },
        {
          ALT: () => {
            return this.SUBRULE(this.unary);
          },
        },
        {
          ALT: () => {
            return this.SUBRULE(this.atom);
          },
        },
      ]);
    });

    this.RULE("subformula", () => {
      return this.OR([
        {
          ALT: () => {
            this.CONSUME(tv.LPar);
            let formula = this.SUBRULE(this.binary);
            this.CONSUME(tv.RPar);
            return formula;
          },
        },
        {
          ALT: () => {
            return this.SUBRULE(this.unary);
          },
        },
        {
          ALT: () => {
            return this.SUBRULE(this.atom);
          },
        },
      ]);
    });

    this.RULE("binary", () => {
      let left = this.SUBRULE(this.subformula);
      return this.OR([
        {
          ALT: () => {
            this.CONSUME(tv.And);
            return {
              type: "conjunction",
              left: left,
              right: this.SUBRULE1(this.subformula),
            };
          },
        },
        {
          ALT: () => {
            this.CONSUME(tv.Or);
            return {
              type: "disjunction",
              left: left,
              right: this.SUBRULE2(this.subformula),
            };
          },
        },
        {
          ALT: () => {
            this.CONSUME(tv.To);
            return {
              type: "implication",
              left: left,
              right: this.SUBRULE3(this.subformula),
            };
          },
        },
        {
          ALT: () => {
            this.CONSUME(tv.Equiv);
            return {
              type: "equivalence",
              left: left,
              right: this.SUBRULE4(this.subformula),
            };
          },
        },
      ]);
    });

    this.RULE("unary", () => {
      return this.OR([
        {
          ALT: () => {
            this.CONSUME(tv.Not);
            return { type: "negation", formula: this.SUBRULE(this.subformula) };
          },
        },
        {
          ALT: () => {
            let type = this.OR1([
              {
                ALT: () => {
                  this.CONSUME(tv.K);
                  return "K";
                },
              },
              {
                ALT: () => {
                  this.CONSUME(tv.M);
                  return "M";
                },
              },
            ]);
            this.CONSUME(tv.LA);
            let agent = parseInt(this.CONSUME(tv.Agent).image);
            this.CONSUME(tv.RA);
            return {
              type: type,
              agent: agent,
              formula: this.SUBRULE1(this.subformula),
            };
          },
        },
        // { ALT: () => { return this.SUBRULE(this.common) } },
        // { ALT: () => { return this.SUBRULE(this.announcement) } }
      ]);
    });

    this.RULE("atom", () => {
      return this.OR([
        {
          ALT: () => {
            return {
              type: "proposition",
              value: this.CONSUME(tv.Proposition).image,
            };
          },
        },
        {
          ALT: () => {
            return { type: "variable", value: this.CONSUME(tv.Formula).image };
          },
        },
      ]);
    });

    this.performSelfAnalysis();
  }
}

// Reuse parser instance
export const parser = new FormulaParser();

export function parse(inputText) {
  const lexResult = lexer.lex(inputText);

  // Reset the parser state
  parser.input = lexResult.tokens;
  const ast = parser.formula();

  if (parser.errors.length > 0) {
    throw Error("Parsing errors detected!\n" + parser.errors[0].message);
  }

  return ast;
}
