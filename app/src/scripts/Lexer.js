import { createToken, Lexer } from "chevrotain";

let tokensByPriority = [
  // Whitespace (first increases lexer speed)
  createToken({ name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED }),

  // Binary operators
  createToken({ name: "And", pattern: /&/ }),
  createToken({ name: "Or", pattern: /\|/ }),
  createToken({ name: "To", pattern: /->/ }),
  createToken({ name: "Equiv", pattern: /<->/ }),

  // Unary operators
  createToken({ name: "Not", pattern: /!/ }),
  createToken({ name: "K", pattern: /K/ }),
  createToken({ name: "M", pattern: /M/ }),
  createToken({ name: "E", pattern: /E/ }),
  createToken({ name: "C", pattern: /C/ }),

  // Parentheses
  createToken({ name: "LPar", pattern: /\(/ }),
  createToken({ name: "RPar", pattern: /\)/ }),
  createToken({ name: "LA", pattern: /{/ }),
  createToken({ name: "RA", pattern: /}/ }),
  createToken({ name: "LSay", pattern: /\[/ }),
  createToken({ name: "RSay", pattern: /]/ }),
  createToken({ name: "LHear", pattern: /</ }),
  createToken({ name: "RHear", pattern: />/ }),

  // Variables and constants
  createToken({ name: "Proposition", pattern: /p(0|[1-9]\d*)?/ }),
  createToken({ name: "Formula", pattern: /f(0|[1-9]\d*)?/ }),
  createToken({ name: "Agent", pattern: /[1-9]\d*|a(0|[1-9]\d*)?/ }),
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
