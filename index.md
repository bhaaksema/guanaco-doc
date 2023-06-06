---
title: Guanaco
description: Bottom-up Syntactic Proof Guide
---

<script>
  MathJax = { tex: { inlineMath: [['$', '$']] } };
</script>
<script id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>

# Logical Aspects of Multi-Agent Systems

## Introduction

## Overview

## Syntactic proofs

## Implementation

## User's Guide

## Results

## Conclusion

## Discussion

## References

## The Syntactic Proof Guide

Writing syntactical proofs can be very hard, especially when one hasn't seen them before. Students are having a hard time coming up with which axioms to start off their proof, and since there are a lot of different rules you can apply after each line, this creates endless possible derivations. A good tactic for these kinds of proofs is to work from the desired formula up to see which rules could have been applied to get to the desired formula. The tool we've created helps people to determine which rules can be applied and to decide whether these rules have been applied correctly.

## The logic K(m)

### The language: Epistemic Formulas

Let $\mathbf{P}$ be a set of propositional atoms; $\mathbf{P} = \lbrace p_n : n \in \mathbb{N} \rbrace $. Let $\mathbf{A}$ be a set of m 'agents'; $\mathbf{A} = \lbrace 1, \dots, m \rbrace $. The set $\mathcal{L}_\mathbf{K}^m(\mathbf{P})$ of epistemic formulas $\varphi, \psi, \dots$ over $\mathbf{A}$ is the smallest set closed under:

1. If $ p \in \mathbf{P}$, then $p \in \mathcal{L}_{\mathbf{K}}^m(\mathbf{P})$.
2. If $ \varphi, \psi \in \mathcal{L}^m_{\mathbf{K}}(\mathbf{P}) $, then $ (\varphi \land \psi), \lnot \varphi \in \mathcal{L}_{\mathbf{K}}^m(\mathbf{P}) $.
3. If $ \varphi \in \mathcal{L}^m_{\mathbf{K}}(\mathbf{P})$, then $ K_i\varphi \in \mathcal{L}^m_{\mathbf{K}}(\mathbf{P})$, for all $i \in \mathbf{A}$.

Moreover, let $\varphi \lor \psi, \varphi \rightarrow \psi$ and $\varphi \leftrightarrow \psi$ be abbreviations for $\lnot(\lnot\varphi \land \lnot \psi)$, $\lnot \varphi \lor \psi$ and $(\varphi \rightarrow \psi) \land (\psi \rightarrow \varphi)$ respectively. Additionally, we use the abbreviation $M_i\varphi$ for $\lnot K_i \lnot \varphi$.

### The Axiom System K(m)

The axiom system $\mathbf{K(m)}$, with respect to a set of agents $\mathbf{A} = \lbrace 1, \dots, m \rbrace $, consists of:

*Axioms*
- A1. All (instances of) propositional tautologies.
- A2. $(K_i \varphi \land K_i(\varphi \rightarrow \psi)) \rightarrow K_i \psi$ for $i = 1, \dots, m$.
- A2'. $K_i(\varphi \rightarrow \psi) \rightarrow (K_i \varphi \rightarrow K_i \psi)$

*Derivation Rules*
- R1. $\dfrac{\varphi \quad \varphi \rightarrow \psi}{\psi} \quad $ *Modus Ponens*.
- R2. $\dfrac{\varphi}{K_i\varphi}$ $(i = 1,\dots, m) \quad $ *Necessitation*.

Using these axioms and derivation rules, we are able to derive all provable formulas in $\mathcal{L}^m_{\mathbf{K}}(\mathbf{P})$. However, in order to make these type of proofs both shorter and easier, we've implemented some extra rules, which are all derivable in $\mathbf{K(m)}$.

<!--- En dan hier die hele lijst, maar dat weet ik echt niet hoe ik dat mooi hierin krijg --->

## The Logic S5(m)

First note that $\mathcal{L}^m_{\mathbf{K}}(\mathbf{P}) = \mathcal{L}^m_{\mathbf{S5}}(\mathbf{P})$. In order to have a more complete image of knowledge and its properties, we extend the logic $\mathbf{K(m)}$ with some more axioms and rules. This gives us the axiom system $\mathbf{S5(m)}$, consisting of the axioms (A1),(A2), the rules (R1), (R2) and:
- A3. $K_i\varphi \rightarrow \varphi \quad (i=1, \dots m)$
- A4. $K_i\varphi \rightarrow K_iK_i\varphi \quad (i=1, \dots m)$
- A5. $\lnot K_i \varphi \rightarrow K_i \lnot K_i\varphi \quad (i=1, \dots m)$

## Common Knowledge: The logics KEC(m) and S5EC(m)

We can extend the logics $\mathbf{K(m)}$ and $\mathbf{S5(m)}$ with two more operators, E and C. The languages $\mathcal{L}^m_{\mathbf{K}}(\mathbf{P})$ and $\mathcal{L}^m_{\mathbf{S5}}(\mathbf{P})$ extended by the operators E and C are denoted $\mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$ and $\mathcal{L}^m_{\mathbf{S5EC}}(\mathbf{P})$ respectively. They are the smallest sets closed under:

1. If $ p \in \mathbf{P}$, then $p \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$.
2. If $ \varphi, \psi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P}) $, then $(\varphi \land \psi), \lnot \varphi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P}) $.
3. If $ \varphi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$, then $ K_i\varphi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$, for all $i \in \mathbf{A}$.
4. If $\varphi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$, then $E\varphi, C\varphi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$.

In addition to the axioms (A1), (A2) and rules (R1), (R2) from $\mathbf{K(m)}$ and the axioms (A3)-(A5) from $\mathbf{S5(m)}$, we have the following axioms and rule for the E- and C- operators:
- A6. $E\varphi \leftrightarrow (K_1\varphi \land \dots \land K_m\varphi)$
- A7. $C\varphi \rightarrow \varphi$
- A8. $C\varphi \rightarrow EC\varphi$
- A9. $(C\varphi \land C(\varphi \rightarrow \psi)) \rightarrow C\psi$
- A10. $C(\varphi \rightarrow E\varphi) \rightarrow (\varphi \rightarrow C\varphi)$
- R3. $\dfrac{\varphi}{C\varphi}$

Then, we define 

$\mathbf{KEC(m)} = \mathbf{K(m)} + (A6)-(A10) + (R3)$

$\mathbf{S5EC(m)} = \mathbf{S5(m)} + (A6)-(A10) + (R3)$

Furthermore, we extend the system with two more derived rules, both of which are provable in $\mathbf{KEC(m)}$:

<!--- Hier de twee rules voor E en C --->

## Public Announcement: The Logics S5\[\](m) and KEC\[\](m) 
<!---Hier nog betere namen voor verzinnen. We hebben hier ook een iets andere definitie voor common knowledge, aangezien het hier ook per agent kan verschillen, dus daar moeten we nog even naar kijken --->

We can extend our logics $\mathbf{S5(m)}$ and $\mathbf{S5EC(m)}$ with one more operator: public announcement. The languages $\mathcal{L}^m_\mathbf{S5}(\mathbf{P})$ and $\mathcal{L}^m_\mathbf{S5EC}(\mathbf{P})$ extended by the operator $\[\]$ are denoted $\mathcal{L}^m_\mathbf{S5[]}(\mathbf{P})$ and $\mathcal{L}^m_\mathbf{S5EC[]}(\mathbf{P})$ respectively. They are the smallest sets closed under the rules discussed for $\mathbf{S5(m)}$ and $\mathbf{S5EC(m)}$ and additionally:
5. If $\varphi, \psi \in \mathcal{L}^m_{\mathbf{S5\[\]}}(\mathbf{P})/\mathcal{L}^m_\mathbf{S5EC\[\]}(\mathbf{P})$, then $\[\varphi\]\psi \in \mathcal{L}^m_\mathbf{S5\[\]}(\mathbf{P})/\mathcal{L}^m_\mathbf{S5EC\[\]}(\mathbf{P})$ 

For the axiom system $ \mathbf{S5\[\](m)} $, in addition to the axioms (A1)-(A5) and rules (R1), (R2) from $\mathbf{S5(m)}$ we have the following axioms for the \[\]-operator:
- A11. $ \[\varphi\]p \leftrightarrow (\varphi \rightarrow p) $
- A12. $ \[\varphi\]\lnot\psi \leftrightarrow (\varphi \rightarrow \lnot\[\varphi\]\psi) $
- A13. $ \[\varphi\](\psi \land \chi) \leftrightarrow (\[\varphi\]\psi \land \[\varphi\]\chi) $
- A14. $ \[\varphi\]K_i\psi \leftrightarrow (\varphi \rightarrow K_i\[\varphi\]\psi) $
- A15 $ \[\varphi\]\[\psi\]\chi \leftrightarrow \[\varphi \land \[\varphi\]\psi\]\chi $
<!--- In de slides wordt hier al wel rule R4 genoemd, misschien nog even navragen --->

For the axiom system $\mathbf{S5EC\[\](m)}$, in addition to the axioms (A1)-(A5) and rules (R1), (R2) from $\mathbf{S5(m)}$, the axioms (A6)-(A10) from $\mathbf{S5EC(m)}$ and the axioms (A11)-(A15) from $\mathbf{S5\[\](m)}$ we have the following axioms and rules for the \[\]-operator:
- A16. $C_i(\varphi \rightarrow \psi) \rightarrow (C_i \varphi \rightarrow C_i \psi)$
- A17. $C_i\varphi \rightarrow (\varphi \land E_iC_i\varphi)$
- A18. $C_i(\varphi \rightarrow E_i\varphi) \rightarrow (\varphi \rightarrow C_i\varphi)$
- R4. $\dfrac{\varphi}{\[\psi\]\varphi}$
- R5. <!--- Hier wil ik dus eigenlijk \inferrule gebruiken, maar die hoort bij een package en ik weet nog niet hoe dat precies werkt --->
