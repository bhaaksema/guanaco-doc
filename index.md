---
title: Guanaco
description: Bottom-up Syntactic Proof Guide
---

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

# Logical Aspects of Multi-Agent Systems

## Introduction
Writing syntactical proofs can be very hard, especially when one hasn't seen them before. Students are having a hard time coming up with which axioms to start off their proof, and since there are a lot of different rules you can apply after each line, this creates endless possible derivations. A good tactic for these kinds of proofs is to work from the desired formula up to see which rules could have been applied to get to the desired formula. The tool we've created helps people to determine which rules can be applied and to decide whether these rules have been applied correctly.

## The logic K(m)
### The language: Epistemic Formulas
Let \\(\mathbf{P}\\) be a set of propositional atoms; \\(\mathbf{P} = \lbrace p_n : n \in \mathbb{N} \rbrace \\). Let \\(\mathbf{A}\\) be a set of m 'agents'; \\(\mathbf{A} = \lbrace 1, \dots, m \rbrace \\). The set \\(\mathcal{L}_\mathbf{K}^m(\mathbf{P})\\) of epistemic formulas \\(\varphi, \psi, \dots\\) over \\(\mathbf{A}\\) is the smallest set closed under:

1. If \\( p \in \mathbf{P}\\), then \\(p \in \mathcal{L}_{\mathbf{K}}^m(\mathbf{P})\\).
2. If \\( \varphi, \psi \in \mathcal{L}_{\mathbf{K}}^m(\mathbf{P}) \\), then \\( (\varphi \land \psi), \lnot \varphi \in \mathcal{L} \\).
3. If \\( \varphi \in \mathcal{L} \\), then \\( K_i\varphi \in \mathcal{L} \\), for all \\(i \in \mathbf{A}\\).

Moreover, let \\(\varphi \lor \psi, \varphi \rightarrow \psi\\) and \\(\varphi \leftrightarrow \psi\\) be abbreviations for \\(\lnot(\lnot\varphi \land \lnot \psi)\\), \\(\lnot \varphi \lor \psi\\) and \\((\varphi \rightarrow \psi) \land (\psi \rightarrow \varphi)\\) respectively. Additionally, we use the abbreviation \\(M_i\varphi\\) for \\(\lnot K_i \lnot \varphi\\).

### The Axiom System K(m)
The axiom system \\(\mathbf{K(m)}\\), with respect to a set of agents \\(\mathbf{A} = \lbrace 1, \dots, m \rbrace \\), consists of:
\textit{Axioms}
- A1. All (instances of) propositional tautologies.
- A2. \\((K_i \varphi \land K_i(\varphi \rightarrow \psi) \rightarrow K_i \psi\\) for \\(i = 1, \dots, m\\).
- A2'. \\(K_i(\varphi \rightarrow \psi) \rightarrow (K_i \varphi \rightarrow K_i \psi)\\)
\textit{Derivation Rules}
- R1. \\(\inferrule{\varphi \quad \varphi \rightarrow \psi}{\psi}\\) \quad \textit{Modus Ponens}.
- R2. \\(\inferrule{\varphi}{K_i\varphi}\\( \\((i = 1,\dots, m)\\) \quad \textit{Necessitation}.
Using these axioms and derivation rules, we are able to derive all provable formulas in \\(\mathcal{L}_\mathbf{K}^m(\mathbf{P})\\). However, in order to make these type of proofs both shorter and easier, we've implemented some extra rules, which are all derivable in \\(\mathbf{K(m)}\\).



Inline math:

\\(\models\lambda\to\alpha\\)

Displayed math:

$$\models\lambda\to\alpha$$