---
title: Guanaco
description: Bottom-up Syntactic Proof Guide
---

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

# Logical Aspects of Multi-Agent Systems

Inline math:

\\(\models\lambda\to\alpha\\)

Displayed math:

$$\models\lambda\to\alpha$$

##The logic K(m)

###The language: Epistemic Formulas
Let \\(\mathbf{P}\\) be a set of propositional atoms; \\(\mathbf{P} = \{p_n : n \in \mathbb{N} \}\\). Let \\(\mathbf{A}\\) be a set of m 'agents'; \\(\mathbf{A} = \{1, \dots, m\}\\). The set \\(\mathcal{L}_\mathbf{K}^m(\mathbf{P})\\) of epistemic formulas \\(\varphi, \psi, \dots\\) over \\(\mathbf{A}\\) is the smallest set closed under:

\begin{enumerate}[label=(\roman*)]
\item If \\(p \in \mathbf{P}\\), then \\(p \in \mathcal{L}_\mathbf{K}^m(\mathbf{P})\\).
\item If \\(\varphi, \psi \in \mathcal{L}_\mathbf{K}^m(\mathbf{P})\\), then \\((\varphi \land \psi), \lnot \varphi \in \mathcal{L}_\mathbf{K}^m(\mathbf{P})\\).
\item If \\(\varphi \in \mathcal{L}_\mathbf{K}^m(\mathbf{P})\\), then \\(K_i\varphi \in \mathcal{L}_\mathbf{K}^m(\mathbf{P})\\), for all \\(i \in \mathbf{A}\\).
\end{enumerate}

Moreover, let \\(\varphi \lor \psi, \varphi \rightarrow \psi\\( and \\(\varphi \leftrightarrow \psi\\( be abbreviations for \\(\lnot(\lnot\varphi \land \lnot \psi)\\), \\(\lnot \varphi \lor \psi\\) and \\((\varphi \rightarrow \psi) \land (\psi \rightarrow \varphi)\\). Additionally, we use the abbreviation \\(M_i\varphi\\( for \\(\lnot K_i \lnot \varphi\\).
