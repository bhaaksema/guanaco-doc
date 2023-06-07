import lexer from './Lexer.js';
import { EmbeddedActionsParser } from 'chevrotain';
const tokenVocabulary = lexer.tokenVocabulary

const PropConst = tokenVocabulary.PropConst
const FormVar = tokenVocabulary.FormVar
const Agent = tokenVocabulary.Agent
const And = tokenVocabulary.And
const Not = tokenVocabulary.Not
const K = tokenVocabulary.K
const Lpar = tokenVocabulary.Lpar
const Rpar = tokenVocabulary.Rpar
const LparAgent = tokenVocabulary.LparAgent
const RparAgent = tokenVocabulary.RparAgent

class FormulaParser extends EmbeddedActionsParser {
  constructor() {
    super(tokenVocabulary)

    this.RULE("formula", () => {
      let val
      this.OR([
        { ALT: () => val = this.SUBRULE(this.compound) },
        { ALT: () => val = this.SUBRULE(this.atom) }
      ])
      return val
    })

    this.RULE("compound", () => {
      let val
      this.OR([
        { ALT: () => val = this.SUBRULE(this.conjunction) },
        { ALT: () => val = this.SUBRULE(this.negation) },
        { ALT: () => val = this.SUBRULE(this.knowledge) }
      ])
      return val
    })

    this.RULE("conjunction", () => {
      let conjuncts = [this.SUBRULE(this.subformula)]
      this.AT_LEAST_ONE(() => {
        this.CONSUME(And)
        conjuncts.push(this.SUBRULE1(this.subformula))
      })
      return {
        type: "conjunction",
        conjuncts: conjuncts
      }
    })

    this.RULE("negation", () => {
      this.CONSUME(Not)
      return {
        type: "negation",
        formula: this.SUBRULE(this.subformula)
      }
    })

    this.RULE("knowledge", () => {
      this.CONSUME(K)
      this.CONSUME(LparAgent)
      let agent = this.CONSUME(Agent).agent
      this.CONSUME(RparAgent)
      return {
        type: "knowledge",
        agent: parseInt(agent),
        formula: this.SUBRULE(this.subformula)
      }
    })

    this.RULE("subformula", () => {
      let val
      this.OR([
        {
          ALT: () => {
            this.CONSUME(Lpar)
            val = this.SUBRULE(this.formula)
            this.CONSUME(Rpar)
          }
        },
        { ALT: () => val = this.SUBRULE(this.atom) }
      ])
      return val
    })

    this.RULE("atom", () => {
      let val
      this.OR([
        { ALT: () => val = this.SUBRULE(this.proposition) },
        { ALT: () => val = this.SUBRULE(this.variable) },
      ])
      return val
    })

    this.RULE("proposition", () => {
      return {
        type: "proposition",
        value: this.CONSUME(PropConst).image
      }
    })

    this.RULE("variable", () => {
      return {
        type: "variable",
        value: this.CONSUME(FormVar).image
      }
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
  const tree = parser.formula()

  console.log(tree) // DEBUG

  if (parser.errors.length > 0) {
    throw Error("Parsing errors detected!\n" + parser.errors[0].message)
  }
}
