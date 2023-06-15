import { createToken, Lexer } from "chevrotain";

// List of tokens, ordered by priority
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
  createToken({ name: "E", pattern: /E/ }),
  createToken({ name: "C", pattern: /C/ }),

  // Parentheses
  createToken({ name: "LPar", pattern: /\(/ }),
  createToken({ name: "RPar", pattern: /\)/ }),
  createToken({ name: "LA", pattern: /{/ }),
  createToken({ name: "RA", pattern: /}/ }),
  createToken({ name: "LSay", pattern: /\[/ }),
  createToken({ name: "RSay", pattern: /]/ }),

  // Variables and constants
  createToken({ name: "Proposition", pattern: /p(0|[1-9]\d*)?/ }),
  createToken({ name: "Formula", pattern: /f(0|[1-9]\d*)?/ }),
  createToken({ name: "Agent", pattern: /[1-9]\d*|a(0|[1-9]\d*)?/ }),
];

// Constant reuseable lexer instance
const FormulaLexer = new Lexer(tokensByPriority, {
  ensureOptimizations: true,
});

// Export tokens
export const tokens = Object.fromEntries(
  tokensByPriority.map((token) => [token.name, token])
);

// Export lexing function
export function lex(inputText) {
  // Invoke lexer on input text
  const lexingResult = FormulaLexer.tokenize(inputText);

  // Throw an error if there are any lexing errors
  if (lexingResult.errors.length > 0) throw Error("Lexing errors detected");

  // Otherwise return lexing result
  return lexingResult;
}
