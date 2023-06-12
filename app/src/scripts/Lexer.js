import { createToken, Lexer } from "chevrotain";

// Whitespace
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

// Binary operators
const And = createToken({ name: "And", pattern: /&/ });
const Or = createToken({ name: "Or", pattern: /\|/ });
const To = createToken({ name: "To", pattern: /->/ });
const Equiv = createToken({ name: "Equiv", pattern: /<->/ });

// Unary operators
const Not = createToken({ name: "Not", pattern: /!/ });
const K = createToken({ name: "K", pattern: /K/ });
const M = createToken({ name: "M", pattern: /M/ });
const E = createToken({ name: "E", pattern: /E/ });
const C = createToken({ name: "C", pattern: /C/ });

// Parentheses
const LPar = createToken({ name: "LPar", pattern: /\(/ });
const RPar = createToken({ name: "RPar", pattern: /\)/ });
const LA = createToken({ name: "LA", pattern: /{/ });
const RA = createToken({ name: "RA", pattern: /}/ });
const LSay = createToken({ name: "LSay", pattern: /\[/ });
const RSay = createToken({ name: "RSay", pattern: /]/ });
const LHear = createToken({ name: "LHear", pattern: /</ });
const RHear = createToken({ name: "RHear", pattern: />/ });

// Variables and constants
const Proposition = createToken({
  name: "Proposition",
  pattern: /p(0|[1-9]\d*)?/,
});
const Formula = createToken({ name: "Formula", pattern: /f(0|[1-9]\d*)?/ });
const Agent = createToken({
  name: "Agent",
  pattern: /[1-9]\d*|a(0|[1-9]\d*)?/,
});

// Whitespace first increases lexer speed
let tokensByPriority = [
  WhiteSpace,
  And,
  Or,
  To,
  Equiv,
  Not,
  K,
  M,
  E,
  C,
  LPar,
  RPar,
  LA,
  RA,
  LSay,
  RSay,
  LHear,
  RHear,
  Proposition,
  Formula,
  Agent,
];

const FormulaLexer = new Lexer(tokensByPriority, {
  ensureOptimizations: true,
});

const tokenVocabulary = {};

tokensByPriority.forEach((tokenType) => {
  tokenVocabulary[tokenType.name] = tokenType;
});

export default {
  tokenVocabulary: tokenVocabulary,

  lex: function (inputText) {
    const lexingResult = FormulaLexer.tokenize(inputText);

    if (lexingResult.errors.length > 0) {
      throw Error("Lexing errors detected");
    }

    return lexingResult;
  },
};
