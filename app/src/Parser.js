import lexer from './Lexer.js';
import { EmbeddedActionsParser } from 'chevrotain';
const tv = lexer.tokenVocabulary

class FormulaParser extends EmbeddedActionsParser {
  constructor() {
    super(tv)

    this.RULE("formula", () => {
      return this.OR([
        {
          GATE: this.BACKTRACK(this.binary),
          ALT: () => { return this.SUBRULE(this.binary) }
        },
        { ALT: () => { return this.SUBRULE(this.unary) } },
        { ALT: () => { return this.SUBRULE(this.atom) } }
      ])
    })

    this.RULE("subformula", () => {
      return this.OR([
        {
          ALT: () => {
            this.CONSUME(tv.Lpar)
            let formula = this.SUBRULE(this.binary)
            this.CONSUME(tv.Rpar)
            return formula
          }
        },
        { ALT: () => { return this.SUBRULE(this.unary) } },
        { ALT: () => { return this.SUBRULE(this.atom) } }
      ])
    })

    this.RULE("binary", () => {
      let left = this.SUBRULE(this.subformula)
      return this.OR([
        { ALT: () => { return this.SUBRULE(this.conjunction, { ARGS: [left] }) } },
        { ALT: () => { return this.SUBRULE(this.disjunction, { ARGS: [left] }) } },
        { ALT: () => { return this.SUBRULE(this.implication, { ARGS: [left] }) } },
        { ALT: () => { return this.SUBRULE(this.equivalence, { ARGS: [left] }) } }
      ])
    })

    this.RULE("unary", () => {
      return this.OR([
        { ALT: () => { return this.SUBRULE(this.negation) } },
        { ALT: () => { return this.SUBRULE(this.knowledge) } }
      ])
    })

    this.RULE("conjunction", (first) => {
      let formulas = [first]
      this.AT_LEAST_ONE(() => {
        this.CONSUME(tv.And)
        formulas.push(this.SUBRULE(this.subformula))
      })
      return { type: "conjunction", formulas: formulas }
    })

    this.RULE("disjunction", (first) => {
      let formulas = [first]
      this.AT_LEAST_ONE(() => {
        this.CONSUME(tv.Or)
        formulas.push(this.SUBRULE(this.subformula))
      })
      return { type: "disjunction", formulas: formulas }
    })

    this.RULE("implication", (left) => {
      this.CONSUME(tv.To)
      return { type: "implication", left: left, right: this.SUBRULE(this.subformula) }
    })

    this.RULE("equivalence", (left) => {
      this.CONSUME(tv.Equiv)
      return { type: "equivalence", left: left, right: this.SUBRULE(this.subformula) }
    })

    this.RULE("negation", () => {
      this.CONSUME(tv.Not)
      return { type: "negation", formula: this.SUBRULE(this.subformula) }
    })

    this.RULE("knowledge", () => {
      let type = this.OR([
        { ALT: () => { this.CONSUME(tv.K); return "K" } },
        { ALT: () => { this.CONSUME(tv.M); return "M" } }
      ])
      this.CONSUME(tv.LparAgent)
      let agent = parseInt(this.CONSUME(tv.Agent).image)
      this.CONSUME(tv.RparAgent)
      return { type: type, agent: agent, formula: this.SUBRULE(this.subformula) }
    })

    this.RULE("atom", () => {
      return this.OR([
        { ALT: () => { return { type: "proposition", value: this.CONSUME(tv.PropConst).image } } },
        { ALT: () => { return { type: "variable", value: this.CONSUME(tv.FormVar).image } } },
      ])
    })

    this.performSelfAnalysis()
  }
}

// Reuse parser instance
export const parser = new FormulaParser()

export function parse(inputText) {
  const lexResult = lexer.lex(inputText)

  // Reset the parser state
  parser.input = lexResult.tokens
  const ast = parser.formula()

  if (parser.errors.length > 0) {
    throw Error("Parsing errors detected!\n" + parser.errors[0].message)
  }

  return ast
}
