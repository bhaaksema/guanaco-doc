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

In this project, we present a program that helps users write syntactic proofs. We name it _Guanaco_. If you have completed or taught one of the courses _Introduction to Logic_, _Reasoning and Arguing_ or _Logica en Argumentatieleer_ at University of Groningen, then you probably recall the program Fitch. Guanaco is much like Fitch, except that it concerns syntactic proofs instead of natural deduction. Just like in Fitch, users of Guanaco enter formulas on lines and provide a justification for those formulas. The justifications are the rules and axioms of the logic ($\mathbf{K(m)}$, $\mathbf{KEC(m)}$, $\mathbf{S5(m)}$, $\mathbf{S5EC(m)}$, $\mathbf{PA}$ or $\mathbf{PAC}$) in which the users aims to derive the chosen formula. Guanaco then evaluates whether the justification is applied correctly. This helps users successfully complete syntactic proofs.

The strategy that Guanaco employs is building proofs _bottom-up_. This means that users start with the formula that they wish to derive. If this formula can only be derive by a rule, then Guanaco exploits the properties of this formula to extract new formulas the relevant rule is applied to. If the formula is an instantiation of an axiom, no new formulas are extracted. The same process is then applied until each formula has a justification and no new ones are produced. At that point, the proof is complete. We explain this bottom-up strategy in detail further on this website.

### Overview
The website is structured as follows. Under _Syntactic Proofs_, we briefly explain syntactic proofs and what they look like. We discuss the rules and axioms of the logics $\mathbf{K(m)}$, $\mathbf{KEC(m)}$, $\mathbf{S5(m)}$, $\mathbf{S5EC(m)}$, $\mathbf{PA}$ and $\mathbf{PAC}$. We also explain how the axiomatization of $\mathbf{PA}$ and $\mathbf{PAC}$ in Van Ditmarsch et al. (2008) can be used in the syntactic proof style of Meyer \& Hoek (1995). Under _Implementation_, we discuss Guanaco in detail. We explain the bottom-up strategy that Guanaco employs. We then discuss the technical details of the program. We end with a short demonstration. Under _User's Guide_, we provide a concise guide to Guanaco. Under _Results_, we provide multiple examples of derivations made with Guanaco. Moreover, we test Guanaco by entering syntactic proofs provided in Meyer \& Hoek (1995) to show that they are indeed correct. Finally, we wrap up our presentation under _Conclusion_, discuss Guanaco's limitations and perspectives for further research under _Discussion_ and provide a list of the relevant literature under _References_.

## Syntactic proofs

Syntactic proofs are done using axiom systems. An axiom system $\Gamma$ is a set of axioms and derivation rules. Given a formula $\varphi$, if we want to show that $\varphi$ is $\Gamma$-provable, we have to give a derivation. A derivation of a formula $\varphi$ is a finite sequence of formulas $\varphi_1, \varphi_2, \dots, \varphi_n=\varphi$, where each $\varphi_i$, for $1 \leq i \leq n$, is either an instance of one of the axioms or the conclusion of a derivation rule, of which the premises have been derived already, i.e. they appear as $\varphi_j$ in the sequence with $j < i$. When we can derive an epistemic formula $\varphi$ using the axioms and derivation rules of $\Gamma$, we write $\Gamma \vdash \varphi$. In this case, $\varphi$ is called a $\Gamma$-theorem.

Here is a table test.

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

### The logic K(m)

#### The language: Epistemic Formulas

Let $\mathbf{P}$ be a set of propositional atoms; $\mathbf{P} = \lbrace p_n : n \in \mathbb{N} \rbrace $. Let $\mathbf{A}$ be a set of m 'agents'; $\mathbf{A} = \lbrace 1, \dots, m \rbrace $. The set $\mathcal{L}_\mathbf{K}^m(\mathbf{P})$ of epistemic formulas $\varphi, \psi, \dots$ over $\mathbf{A}$ is the smallest set closed under:

1. If $ p \in \mathbf{P}$, then $p \in \mathcal{L}_{\mathbf{K}}^m(\mathbf{P})$.
2. If $ \varphi, \psi \in \mathcal{L}^m_{\mathbf{K}}(\mathbf{P}) $, then $ (\varphi \land \psi), \lnot \varphi \in \mathcal{L}_{\mathbf{K}}^m(\mathbf{P}) $.
3. If $ \varphi \in \mathcal{L}^m_{\mathbf{K}}(\mathbf{P})$, then $ K_i\varphi \in \mathcal{L}^m_{\mathbf{K}}(\mathbf{P})$, for all $i \in \mathbf{A}$.

Moreover, let $\varphi \lor \psi, \varphi \rightarrow \psi$ and $\varphi \leftrightarrow \psi$ be abbreviations for $\lnot(\lnot\varphi \land \lnot \psi)$, $\lnot \varphi \lor \psi$ and $(\varphi \rightarrow \psi) \land (\psi \rightarrow \varphi)$ respectively. Additionally, we use the abbreviation $M_i\varphi$ for $\lnot K_i \lnot \varphi$.

#### The Axiom System K(m)

The axiom system $\mathbf{K(m)}$, with respect to a set of agents $\mathbf{A} = \lbrace 1, \dots, m \rbrace $, consists of:

*Axioms*
- A1. All (instances of) propositional tautologies.
- A2. $(K_i \varphi \land K_i(\varphi \rightarrow \psi)) \rightarrow K_i \psi$ for $i = 1, \dots, m$.
- A2'. $K_i(\varphi \rightarrow \psi) \rightarrow (K_i \varphi \rightarrow K_i \psi)$

*Derivation Rules*
- R1. $\dfrac{\varphi \quad \varphi \rightarrow \psi}{\psi} \quad $ *Modus Ponens*.
- R2. $\dfrac{\varphi}{K_i\varphi}$ $(i = 1,\dots, m) \quad $ *Necessitation*.

Using these axioms and derivation rules, we are able to derive all provable formulas in $\mathcal{L}^m_{\mathbf{K}}(\mathbf{P})$. However, in order to make these types of proofs both shorter and easier, we've implemented some extra rules, which are all derivable in $\mathbf{K(m)}$.

<!--- En dan hier die hele lijst, maar dat weet ik echt niet hoe ik dat mooi hierin krijg --->

### The Logic S5(m)

In order to have a more complete image of knowledge and its properties, we extend the logic $\mathbf{K(m)}$ with some more axioms. Since $\mathbf{S5(m)}$ does not contain more operators than $\mathbf{K(m)}$, we have that $\mathcal{L}^m_{\mathbf{K}}(\mathbf{P}) = \mathcal{L}^m_{\mathbf{S5}}(\mathbf{P})$. These new axiom give us the axiom system $\mathbf{S5(m)}$, consisting of the axioms (A1),(A2), the rules (R1), (R2) and:
- A3. $K_i\varphi \rightarrow \varphi \quad (i=1, \dots m)$
- A4. $K_i\varphi \rightarrow K_iK_i\varphi \quad (i=1, \dots m)$
- A5. $\lnot K_i \varphi \rightarrow K_i \lnot K_i\varphi \quad (i=1, \dots m)$

### Common Knowledge: The logics KEC(m) and S5EC(m)

We can extend the logics $\mathbf{K{(m)}}$ and $\mathbf{S5{(m)}}$ with two more operators, E and C. We define them as follows: For any group B of agents from $\mathbf{A}$, "Everybody in B knows $\varphi$", written $E_B\varphi$, is defined as the conjunction of all individuals in B knowing $\varphi$, i.e. $E_B\varphi = \bigwedge_{b \in B} K_b\varphi$. If $B=\mathbf{A}$, we just write $E$. We then define common knowledge of a formula $\varphi$ for a subset $B \subseteq \mathbf{A}$ as $C_B\varphi = \varphi \land E_B\varphi \land E_BE_B\varphi \land \dots = \bigwedge_{n=0}^{\infty} E_B^n\varphi$. Again, if $B=\mathbf{A}$, we just write $C$.

The languages $\mathcal{L}^m_\mathbf{K}(\mathbf{P})$ and $\mathcal{L}^m_\mathbf{S5}(\mathbf{P})$ extended by the operators E and C are denoted $\mathcal{L}^m_\mathbf{KEC}(\mathbf{P})$ and $\mathcal{L}^m_\mathbf{S5EC}(\mathbf{P})$ respectively. They are the smallest sets closed under:
1. If $ p \in \mathbf{P}$, then $p \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$.
2. If $ \varphi, \psi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P}) $, then $(\varphi \land \psi), \lnot \varphi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P}) $.
3. If $ \varphi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$, then $ K_i\varphi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$, for all $i \in \mathbf{A}$.
4. If $\varphi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$, then $E_B\varphi, C_B\varphi \in \mathcal{L}^m_{\mathbf{KEC}}(\mathbf{P})$.

In addition to the axioms (A1), (A2) and rules (R1), (R2) from $\mathbf{K(m)}$ and the axioms (A3)-(A5) from $\mathbf{S5(m)}$, we have the following axioms and rule for the E- and C- operators:
- A6. $E\varphi \leftrightarrow (K_1\varphi \land \dots \land K_m\varphi)$
- A7. $C_B\varphi \rightarrow \varphi$
- A8. $C_B\varphi \rightarrow E_BC_B\varphi$
- A9. $(C_B\varphi \land C_B(\varphi \rightarrow \psi)) \rightarrow C_B\psi$
- A10. $C_B(\varphi \rightarrow E_B\varphi) \rightarrow (\varphi \rightarrow C_B\varphi)$
- R3. $\dfrac{\varphi}{C_B\varphi}$

Then, we define 

$\mathbf{KEC(m)} = \mathbf{K(m)} + (A6)-(A10) + (R3)$

$\mathbf{S5EC(m)} = \mathbf{S5(m)} + (A6)-(A10) + (R3)$

Furthermore, we extend the system with two more derived rules, both of which are provable in $\mathbf{KEC(m)}$:

<!--- Hier de twee rules voor E en C --->

### Public Announcement: The Logics PA and PAC 

We can extend our logics $\mathbf{S5(m)}$ and $\mathbf{S5EC(m)}$ with one more operator: public announcement. The languages $\mathcal{L}^m_\mathbf{S5}(\mathbf{P})$ and $\mathcal{L}^m_\mathbf{S5EC}(\mathbf{P})$ extended by the operator $\[\]$ are denoted $\mathcal{L}^m_]mathbf{PA}(\mathbf{P})$ and $\mathcal{L}^m_\mathbf{PAC}(\mathbf{P})$ respectively. They are the smallest sets closed under the rules discussed for $\mathbf{S5(m)}$ and $\mathbf{S5EC(m)}$ and additionally:
5. If $\varphi, \psi \in \mathcal{L}^m_\mathbf{PA}(\mathbf{P})/\mathcal{L}^m_\mathbf{PAC}(\mathbf{P})$, then $\[\varphi\]\psi \in \mathcal{L}^m_\mathbf{PA}(\mathbf{P})/\mathcal{L}^m_\mathbf{PAC}(\mathbf{P})$ 

For the axiom system $ \mathbf{PA} $, in addition to the axioms (A1)-(A5) and rules (R1), (R2) from $\mathbf{S5(m)}$ we have the following axioms for the \[\]-operator:
- A11. $ \[\varphi\]p \leftrightarrow (\varphi \rightarrow p) $
- A12. $ \[\varphi\]\lnot\psi \leftrightarrow (\varphi \rightarrow \lnot\[\varphi\]\psi) $
- A13. $ \[\varphi\](\psi \land \chi) \leftrightarrow (\[\varphi\]\psi \land \[\varphi\]\chi) $
- A14. $ \[\varphi\]K_i\psi \leftrightarrow (\varphi \rightarrow K_i\[\varphi\]\psi) $
- A15 $ \[\varphi\]\[\psi\]\chi \leftrightarrow \[\varphi \land \[\varphi\]\psi\]\chi $
<!--- In de slides wordt hier al wel rule R4 genoemd, misschien nog even navragen --->

For the axiom system $\mathbf{PAC}$, in addition to the axioms (A1)-(A5) and rules (R1), (R2) from $\mathbf{S5(m)}$, the axioms (A6)-(A10) from $\mathbf{S5EC(m)}$ and the axioms (A11)-(A15) from $\mathbf{PA}$ we have the following rules for the \[\]-operator:
- R4. $\dfrac{\varphi}{\[\psi\]\varphi}$
- R5. <!--- Hier wil ik dus eigenlijk \inferrule gebruiken, maar die hoort bij een package en ik weet nog niet hoe dat precies werkt --->

## Implementation

## User's Guide

## Results

## Conclusion

## Discussion

## References

## The Syntactic Proof Guide




