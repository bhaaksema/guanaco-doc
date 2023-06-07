import lexer from './Lexer.js';
import { EmbeddedActionsParser } from 'chevrotain';
const tokenVocabulary = lexer.tokenVocabulary

const PropConst = tokenVocabulary.PropConst
const FormVar = tokenVocabulary.FormVar
const Agent = tokenVocabulary.Agent
const And = tokenVocabulary.And
const Or = tokenVocabulary.Or
const Not = tokenVocabulary.Not
const K = tokenVocabulary.K
const Lpar = tokenVocabulary.Lpar
const Rpar = tokenVocabulary.Rpar
const LparAgent = tokenVocabulary.LparAgent
const RparAgent = tokenVocabulary.RparAgent

class FormulaParser extends EmbeddedActionsParser {
  constructor() {
    super(tokenVocabulary)

    // function to negeate a formula
    this.performNegation = (formula) => {
      return { type: "negation", formula: formula }
    }

    this.RULE("formula", () => {
      return this.OR([
        { ALT: () => { return this.SUBRULE(this.compound) } },
        { ALT: () => { return this.SUBRULE(this.atom) } }
      ])
    })

    this.RULE("compound", () => {
      return this.OR([
        { ALT: () => { return this.SUBRULE(this.binary) } },
        { ALT: () => { return this.SUBRULE(this.negation) } },
        { ALT: () => { return this.SUBRULE(this.knowledge) } }
      ])
    })

    this.RULE("binary", () => {
      let conjuncts = [this.SUBRULE(this.subformula)]
      return this.OR([
        {
          ALT: () => {
            this.AT_LEAST_ONE(() => {
              this.CONSUME(And)
              conjuncts.push(this.SUBRULE1(this.subformula))
            })
            return { type: "conjunction", conjuncts: conjuncts }
          }
        },
        {
          ALT: () => {
            this.AT_LEAST_ONE1(() => {
              this.CONSUME(Or)
              conjuncts.push(this.SUBRULE2(this.subformula))
            })
            return this.performNegation({
              type: "conjunction",
              conjuncts: conjuncts.map(this.performNegation)
            })
          }
        }
      ])
    })

    this.RULE("negation", () => {
      this.CONSUME(Not)
      return { type: "negation", formula: this.SUBRULE(this.subformula) }
    })

    this.RULE("knowledge", () => {
      this.CONSUME(K)
      this.CONSUME(LparAgent)
      let agent = parseInt(this.CONSUME(Agent).image)
      this.CONSUME(RparAgent)
      return {
        type: "knowledge",
        agent: agent,
        formula: this.SUBRULE(this.subformula)
      }
    })

    this.RULE("subformula", () => {
      return this.OR([
        {
          ALT: () => {
            this.CONSUME(Lpar)
            let val = this.SUBRULE(this.formula)
            this.CONSUME(Rpar)
            return val
          }
        },
        { ALT: () => { return this.SUBRULE(this.atom) } }
      ])
    })

    this.RULE("atom", () => {
      return this.OR([
        { ALT: () => { return this.SUBRULE(this.proposition) } },
        { ALT: () => { return this.SUBRULE(this.variable) } },
      ])
    })

    this.RULE("proposition", () => {
      return { type: "proposition", value: this.CONSUME(PropConst).image }
    })

    this.RULE("variable", () => {
      return { type: "variable", value: this.CONSUME(FormVar).image }
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
