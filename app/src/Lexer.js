import { createToken, Lexer } from 'chevrotain';

// Variables and constants
const PropConst = createToken({ name: "PropConst", pattern: /[a-z]\w*/ })
const FormVar = createToken({ name: "FormVar", pattern: /[A-Z]\w*/ })

// Operators
const And = createToken({ name: "And", pattern: /&/ })
const Or = createToken({ name: "Or", pattern: /\|/ })
const To = createToken({ name: "To", pattern: /->/ })
const Equiv = createToken({ name: "Equiv", pattern: /<->/ })
const Not = createToken({ name: "Not", pattern: /!/ })
const K = createToken({ name: "K", pattern: /K/, longer_alt: FormVar })
const M = createToken({ name: "M", pattern: /M/, longer_alt: FormVar })
const LparAgent = createToken({ name: "LparAgent", pattern: /{/ })
const Agent = createToken({ name: "Agent", pattern: /0|[1-9]\d*/ })
const RparAgent = createToken({ name: "RparAgent", pattern: /}/ })

// Parentheses
const Lpar = createToken({ name: "Lpar", pattern: /\(/ })
const Rpar = createToken({ name: "Rpar", pattern: /\)/ })

// Whitespace
const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED })

// Whitespace first increases lexer speed
let tokensByPriority = [
  WhiteSpace,
  K, M, Agent,
  Not, And, Or, To, Equiv,
  Lpar, Rpar, LparAgent, RparAgent,
  FormVar, PropConst
]

const FormulaLexer = new Lexer(tokensByPriority, {
  ensureOptimizations: true,
});

const tokenVocabulary = {}

tokensByPriority.forEach((tokenType) => {
  tokenVocabulary[tokenType.name] = tokenType
})

export default {
  tokenVocabulary: tokenVocabulary,

  lex: function (inputText) {
    const lexingResult = FormulaLexer.tokenize(inputText)

    if (lexingResult.errors.length > 0) {
      throw Error("Lexing errors detected")
    }

    return lexingResult
  }
};
