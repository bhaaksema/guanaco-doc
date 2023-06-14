import { EmbeddedActionsParser } from "chevrotain";
import { tokens, lex } from "./Lexer.js";

// Formula parser class
class FormulaParser extends EmbeddedActionsParser {
  constructor() {
    super(tokens);

    // formula ::= binary | unary | atom
    this.RULE("formula", () => {
      return this.OR([
        {
          GATE: this.BACKTRACK(this.binary),
          ALT: () => { return this.SUBRULE(this.binary); }
        },
        { ALT: () => { return this.SUBRULE(this.unary); } },
        { ALT: () => { return this.SUBRULE(this.atom); } },
      ]);
    });

    // subformula ::= ( binary ) | unary | atom
    this.RULE("subformula", () => {
      return this.OR([
        {
          ALT: () => {
            this.CONSUME(tokens.LPar);
            let formula = this.SUBRULE(this.binary);
            this.CONSUME(tokens.RPar);
            return formula;
          },
        },
        { ALT: () => { return this.SUBRULE(this.unary); } },
        { ALT: () => { return this.SUBRULE(this.atom); } },
      ]);
    });

    // binary ::= subformula ( & | \| | -> | <-> ) subformula
    this.RULE("binary", () => {
      const left = this.SUBRULE(this.subformula);
      const type = this.OR([
        {
          ALT: () => {
            this.CONSUME(tokens.And);
            return "conjunction";
          }

        },
        {
          ALT: () => {
            this.CONSUME(tokens.Or);
            return "disjunction";
          }
        },
        {
          ALT: () => {
            this.CONSUME(tokens.To);
            return "implication";
          }
        },
        {
          ALT: () => {
            this.CONSUME(tokens.Equiv);
            return "equivalence";
          }
        },
      ]);

      const right = this.SUBRULE1(this.subformula);
      return { type, left, right };
    });

    // unary ::= ( ! | E | C ) subformula | ( K | M ) { agent } subformula
    this.RULE("unary", () => {
      const type = this.OR([
        {
          ALT: () => {
            this.CONSUME(tokens.Not);
            return "negation";
          }
        },
        { ALT: () => { return this.CONSUME(tokens.K).tokenType.name; } },
        { ALT: () => { return this.CONSUME(tokens.M).tokenType.name; } },
        { ALT: () => { return this.CONSUME(tokens.E).tokenType.name; } },
        { ALT: () => { return this.CONSUME(tokens.C).tokenType.name; } },
      ]);

      if (type === "negation" || type === "E" || type === "C") {
        return { type: type, formula: this.SUBRULE(this.subformula) };
      }

      this.CONSUME(tokens.LA);
      const agent = this.CONSUME(tokens.Agent).image;
      this.CONSUME(tokens.RA);
      const formula = this.SUBRULE1(this.subformula);
      return { type, agent, formula };
    });

    // atom ::= proposition | variable
    this.RULE("atom", () => {
      return this.OR([{
        ALT: () => {
          const value = this.CONSUME(tokens.Proposition).image;
          return { type: "proposition", value: value };
        }
      }, {
        ALT: () => {
          const value = this.CONSUME(tokens.Formula).image;
          return { type: "formula", value: value };
        }
      }]);
    });

    this.performSelfAnalysis();
  }
}

// Constant reuseable parser instance
const parser = new FormulaParser();

// Parsing function that returns an Abstract Syntax Tree
function parse(inputText) {
  // Set parser input to the tokenized inputText
  parser.input = lex(inputText).tokens;

  // Invoke the parser
  const ast = parser.formula();

  // Throw an error if there are any parsing errors
  if (parser.errors.length > 0) {
    throw Error("Parsing errors detected!" + parser.errors[0].message);
  }

  // Otherwise, return the AST
  return ast;
}

// Export the parse function
export default parse;
