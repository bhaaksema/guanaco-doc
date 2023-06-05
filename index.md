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
Let \\(\mathbf{P}\\) be a set of propositional atoms; \\(\mathbf{P} = {p_n : n \in \mathbb{N} }\\). Let \\(\mathbf{A}\\) be a set of m 'agents'; \\(\mathbf{A} = {1, \dots, m}\\). The set \\(\mathcal{L}_\mathbf{K}^m(\mathbf{P})\\) of epistemic formulas \\(\varphi, \psi, \dots\\) over \\(\mathbf{A}\\) is the smallest set closed under:

Inline math:

\\(\models\lambda\to\alpha\\)

Displayed math:

$$\models\lambda\to\alpha$$
