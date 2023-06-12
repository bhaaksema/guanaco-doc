---
title: Guanaco
description: Final Project for Logical Aspects of Multi-Agent Systems
---

<script>
  MathJax = { tex: { inlineMath: [['$', '$']] } };
</script>
<script id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>

# Guanaco: A Syntactic Proof Guide

You can find the current version of the program [here](https://github.com/bhaaksema/rug-lamas).

## Introduction

In this project, we present a program that helps users write syntactic proofs. We name it _Guanaco_. If you have completed or taught one of the courses _Introduction to Logic_, _Reasoning and Arguing_ or _Logica en Argumentatieleer_ at University of Groningen, then you probably recall the program Fitch. Guanaco is much like Fitch, except that it concerns syntactic proofs instead of natural deduction. Just like in Fitch, users of Guanaco enter formulas on lines and provide a justification for those formulas. The justifications are the rules and axioms of the logic ($\mathbf{K(m)}$, $\mathbf{KEC(m)}$, $\mathbf{S5(m)}$, $\mathbf{S5EC(m)}$, $\mathbf{PA}$ or $\mathbf{PAC}$) in which the users aims to derive the chosen formula. Guanaco then evaluates whether the justification is applied correctly. This helps users successfully complete syntactic proofs.

The strategy that Guanaco employs is building proofs _bottom-up_. This means that users start with the formula that they wish to derive. If this formula can only be derived by a rule, then Guanaco exploits the properties of this formula to extract new formulas the relevant rule is applied to. If the formula is an instantiation of an axiom, no new formulas are extracted. The same process is then applied until each formula has a justification and no new ones are produced. At that point, the proof is complete. We explain this bottom-up strategy in detail further on this website.

The intended goal of this program is mostly educational. We hope that students will be able to use the tool to guide them with making syntactic proofs correctly, and we hope that the tool aids teachers with teaching syntactic proofs. To fully facilitate this kind of use, we may need to revise the program in the future with usability in mind. For now, we aim to make the tool work correctly for the variety of logics taught in the course _Logical Aspects of Multi-Agent Systems_.

### Overview
The website is structured as follows. Under _Syntactic Proofs_, we briefly explain syntactic proofs and what they look like. We discuss the rules and axioms of the logics $\mathbf{K(m)}$, $\mathbf{KEC(m)}$, $\mathbf{S5(m)}$, $\mathbf{S5EC(m)}$, $\mathbf{PA}$ and $\mathbf{PAC}$. We also explain how the axiomatization of $\mathbf{PA}$ and $\mathbf{PAC}$ in Van Ditmarsch et al. (2008) can be used in the syntactic proof style of Meyer \& Hoek (1995). Under _Implementation_, we discuss Guanaco in detail. We explain the bottom-up strategy that Guanaco employs. We then discuss the technical details of the program. We end with a short demonstration. Under _User's Guide_, we provide a concise guide to Guanaco. Under _Results_, we provide multiple examples of derivations made with Guanaco. Moreover, we test Guanaco by entering syntactic proofs provided in Meyer \& Hoek (1995) to show that they are indeed correct. Finally, we wrap up our presentation under _Conclusion_, discuss Guanaco's limitations and perspectives for further research under _Discussion_ and provide a list of the relevant literature under _References_.

## Syntactic proofs

Syntactic proofs are done using axiom systems. An axiom system $\Gamma$ is a set of axioms and derivation rules. Given a formula $\varphi$, if we want to show that $\varphi$ is $\Gamma$-provable, we have to give a derivation. A derivation of a formula $\varphi$ is a finite sequence of formulas $\varphi_1, \varphi_2, \dots, \varphi_n=\varphi$, where each $\varphi_i$ for $1 \leq i \leq n$ is either an instance of one of the axioms or the conclusion of a derivation rule of which the premises have been derived already, i.e. the premises appear as $\varphi_j$ in the sequence with $j < i$. When we can derive an epistemic formula $\varphi$ using the axioms and derivation rules of $\Gamma$, we write $\Gamma \vdash \varphi$. In this case, $\varphi$ is called a $\Gamma$-theorem.

Visually, a syntactic proof is presented like this:

| Line number    | Axiom system  |          | Formula     | Justification |
| :------------: | :-----------: | :------: | :---------: | :-----------: |  
| $1$            | $\Gamma$      | $\vdash$ | $\varphi_1$ | $Ak$ / $Rk$   | 
| $...$          | $\Gamma$      | $\vdash$ | $...$       | $Ak$ / $Rk$   |
| $i$            | $\Gamma$      | $\vdash$ | $\varphi_i$ | $Ak$ / $Rk$   |
| $...$          | $\Gamma$      | $\vdash$ | $...$       | $Ak$ / $Rk$   |
| $n$            | $\Gamma$      | $\vdash$ | $\varphi_n$ | $Ak$ / $Rk$   |

So each member of the sequence of formulas has its own line, specifying the used axiom system $\Gamma$, the formula itself and the justification for that formula (an axiom $Ak$ or rule $Rk$ of $\Gamma$, where $k$ is a natural number). If the justification is a rule, then the premises to which the rule is applied are cited too.

### The language: Epistemic Formulas

In syntactic proofs, each formula $\varphi$ is a formula of a _language_. In Guanaco, there are four available languages: $\mathcal{L}\_{\mathbf{K}}^m(\mathbf{P})$, $\mathcal{L}\_{\mathbf{KEC}}^m(\mathbf{P})$, $\mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P})$ and $\mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$. When we present axiom systems later, we specify for which language it is an axiom system.

Let $\mathbf{P}$ be a set of propositional atoms; $\mathbf{P} = \lbrace p_n : n \in \mathbb{N} \rbrace $. Let $\mathbf{A}$ be a set of $m$ agents; $\mathbf{A} = \lbrace 1, \dots, m \rbrace $. The set $\mathcal{L}\_\mathbf{K}^m(\mathbf{P})$ of epistemic formulas $\varphi, \psi, \dots$ over $\mathbf{A}$ is the smallest set closed under:

1. If $p \in \mathbf{P}$, then $p \in \mathcal{L}\_{\mathbf{K}}^m(\mathbf{P})$.
2. If $\varphi, \psi \in \mathcal{L}^m_{\mathbf{K}}(\mathbf{P}) $, then $(\varphi \land \psi), \lnot \varphi \in \mathcal{L}\_{\mathbf{K}}^m(\mathbf{P})$.
3. If $\varphi \in \mathcal{L}^m\_{\mathbf{K}}(\mathbf{P})$, then $K\_{i}\varphi \in \mathcal{L}^m\_{\mathbf{K}}(\mathbf{P})$, for all $i \in \mathbf{A}$.

Moreover, let $\varphi \lor \psi, \varphi \rightarrow \psi$ and $\varphi \leftrightarrow \psi$ be abbreviations for $\lnot(\lnot\varphi \land \lnot \psi)$, $\lnot \varphi \lor \psi$ and $(\varphi \rightarrow \psi) \land (\psi \rightarrow \varphi)$ respectively. Additionally, we use the abbreviation $M_i\varphi$ for $\lnot K_i \lnot \varphi$.

The language $\mathcal{L}\_{\mathbf{KEC}}^m(\mathbf{P})$ is an extension of $\mathcal{L}\_{\mathbf{K}}^m(\mathbf{P})$; it also contains the operators $E$ and $C$. We define this language as follows: for any group B of agents from $\mathbf{A}$, "Everybody in B knows $\varphi$", written $E\_B\varphi$, is defined as the conjunction of all individuals in B knowing $\varphi$, i.e. $E\_B\varphi = \bigwedge\_{b \in B} K_b\varphi$. If $B=\mathbf{A}$, we just write $E$. We then define common knowledge of a formula $\varphi$ for a subset $B \subseteq \mathbf{A}$ as $C\_B\varphi = \varphi \land E_B\varphi \land E\_BE\_B\varphi \land \dots = {\bigwedge} \_{n=0} ^{\infty} E\_B^n\varphi$. Again, if $B=\mathbf{A}$, we just write $C$.

So the language $\mathcal{L}\_{\mathbf{KEC}}^m(\mathbf{P})$ is the smallest set closed under:
1. If $p \in \mathbf{P}$, then $p \in \mathcal{L}^m\_{\mathbf{KEC}}(\mathbf{P})$.
2. If $\varphi, \psi \in \mathcal{L}^m\_{\mathbf{KEC}}(\mathbf{P}) $, then $(\varphi \land \psi), \lnot \varphi \in \mathcal{L}^m\_{\mathbf{KEC}}(\mathbf{P}) $.
3. If $\varphi \in \mathcal{L}^m\_{\mathbf{KEC}}(\mathbf{P})$, then $K\_i\varphi \in \mathcal{L}^m\_{\mathbf{KEC}}(\mathbf{P})$, for all $i \in \mathbf{A}$.
4. If $\varphi \in \mathcal{L}^m\_{\mathbf{KEC}}(\mathbf{P})$, then $E\_B\varphi, C\_B\varphi \in \mathcal{L}^m\_{\mathbf{KEC}}(\mathbf{P})$ for $B \subseteq \mathbf{A}$.

The language $\mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P})$ is an extension of $\mathcal{L}\_{\mathbf{K}}^m(\mathbf{P})$; it also contains the operator $[\phi]$. A formula $[\phi]\psi$ means "after a public announcement of $\phi$, $\psi$ holds". The language $\mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P})$ is the smallest set closed under:
1. If $p \in \mathbf{P}$, then $p \in \mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P})$.
2. If $\varphi, \psi \in \mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P})$, then $(\varphi \land \psi), \lnot \varphi \in \mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P}) $.
3. If $\varphi \in \mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P})$, then $K\_i\varphi \in \mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P})$, for all $i \in \mathbf{A}$.
4. If $\varphi,\psi \in \mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P})$, then $[\phi]\psi \in \mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P})$.

Now, $\mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$ is an extension of $\mathcal{L}\_{\mathbf{K[]}}(\mathbf{A,P})$; it also contains the operators $E$ and $C$ as defined before. So the language $\mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$ is the smallest set closed under:
1. If $p \in \mathbf{P}$, then $p \in \mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$.
2. If $\varphi, \psi \in \mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$, then $(\varphi \land \psi), \lnot \varphi \in \mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$.
3. If $\varphi \in \mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$, then $K\_i\varphi \in \mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$, for all $i \in \mathbf{A}$.
4. If $\varphi,\psi \in \mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$, then $[\phi]\psi \in \mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$, for all $i \in \mathbf{A}$.
5. If $\varphi \in \mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$, then $E\_B\varphi, C\_B\varphi \in \mathcal{L}\_{\mathbf{KEC[]}}(\mathbf{A,P})$ for $B \subseteq \mathbf{A}$.

## Axiom Systems

In Guanaco, there are five logics $\Gamma$ available: $\mathbf{K(m)}$, $\mathbf{KEC(m)}$, $\mathbf{S5(m)}$, $\mathbf{S5EC(m)}$, $\mathbf{PA}$ and $\mathbf{PAC}$. We present the axioms system of each of these logics below.

### The logic $\mathbf{K(m)}$

The axiom system $\mathbf{K(m)}$, with respect to a set of agents $\mathbf{A} = \lbrace 1, \dots, m \rbrace $, consists of:

*Axioms*
- A1. All (instances of) propositional tautologies.
- A2. $(K_i \varphi \land K_i(\varphi \rightarrow \psi)) \rightarrow K_i \psi$ for $i = 1, \dots, m$.
- A2'. $K_i(\varphi \rightarrow \psi) \rightarrow (K_i \varphi \rightarrow K_i \psi)$ for $i = 1, \dots, m$.

*Derivation Rules*
- R1. $\dfrac{\varphi \quad \varphi \rightarrow \psi}{\psi} \quad$ *Modus Ponens*.
- R2. $\dfrac{\varphi}{K_i\varphi}$ $(i = 1,\dots, m) \quad$ *Necessitation*.

Using these axioms and derivation rules, we are able to derive all provable formulas in $\mathcal{L}^m_{\mathbf{K}}(\mathbf{P})$. However, in order to make these types of proofs both shorter and easier, we've implemented some extra rules, which are all derivable in $\mathbf{K(m)}$.

<!--- En dan hier die hele lijst, maar dat weet ik echt niet hoe ik dat mooi hierin krijg --->

### The Logic S5(m)

The axiom system $\mathbf{S5(m)}$ is an extension of $\mathbf{K(m)}$. The axiom system $\mathbf{S5(m)}$ consists of the axioms $(A1)$, $(A2)$, the rules $(R1)$, $(R2)$ and:
- A3. $K_i\varphi \rightarrow \varphi \quad (i=1, \dots m)$
- A4. $K_i\varphi \rightarrow K_iK_i\varphi \quad (i=1, \dots m)$
- A5. $\lnot K_i \varphi \rightarrow K_i \lnot K_i\varphi \quad (i=1, \dots m)$

### Common Knowledge: The logics $\mathbf{KEC(m)}$ and $\mathbf{S5EC(m)}$

In addition to the axioms (A1), (A2) and rules (R1), (R2) from $\mathbf{K(m)}$ and the axioms (A3)-(A5) from $\mathbf{S5(m)}$, we have the following axioms and rule for the $E$- and $C$- operators:
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

### Public Announcement Logic: The Logics $\mathbf{PA}$ and $\mathbf{PAC}$ 

For the axiom system $\mathbf{PA} $, in addition to the axioms (A1)-(A5) and rules (R1), (R2) from $\mathbf{S5(m)}$ we have the following axioms for the \[\]-operator:
- A11. $\[\varphi\]p \leftrightarrow (\varphi \rightarrow p) $
- A12. $\[\varphi\]\lnot\psi \leftrightarrow (\varphi \rightarrow \lnot\[\varphi\]\psi) $
- A13. $\[\varphi\](\psi \land \chi) \leftrightarrow (\[\varphi\]\psi \land \[\varphi\]\chi) $
- A14. $\[\varphi\]K_i\psi \leftrightarrow (\varphi \rightarrow K_i\[\varphi\]\psi) $
- A15 $\[\varphi\]\[\psi\]\chi \leftrightarrow \[\varphi \land \[\varphi\]\psi\]\chi $
<!--- In de slides wordt hier al wel rule R4 genoemd, misschien nog even navragen --->

For the axiom system $\mathbf{PAC}$, in addition to the axioms (A1)-(A5) and rules (R1), (R2) from $\mathbf{S5(m)}$, the axioms (A6)-(A10) from $\mathbf{S5EC(m)}$ and the axioms (A11)-(A15) from $\mathbf{PA}$ we have the following rules for the \[\]-operator:
- R4. $\dfrac{\varphi}{\[\psi\]\varphi}$
- R5. $\dfrac{\chi\to[\phi]\psi, \chi \wedge \phi \to E\_{B}\chi}{\chi\to[\phi]C\_B\psi}$

<!--- Hier wil ik dus eigenlijk \inferrule gebruiken, maar die hoort bij een package en ik weet nog niet hoe dat precies werkt --->

## Implementation

In this section, we cover the important details of the implementation strategy. We first present the parsing process of our program, followed by our employed strategies for the implementation of axioms and rules.

### Input parsing

When a user provides an input on a line, the program needs to know what formula the user is trying to write. We made a parser that takes lines of unicode symbols as its input and provides an abstract syntax tree as its output.

| Input    | Parser interpretation                                     | Formula of the relevant language      |
| -------- | --------------------------------------------              | --------------------------            |
| pn       | propositional atom $n$, where $n$ is an integer           | $p\_n$                                |
| fn       | formula $n$, where $n$ is an integer                      | $\varphi\_n$                          |
| !x       | negation of the formula $x$                               | $\neg\varphi$                         |
| x & y    | conjunction of the formulas $x$ and $y$                   | $\varphi\wedge\psi$                   |
| x \| y   | disjunction of the formulas $x$ and $y$                   | $\varphi\wedge\psi$                   |
| x -> y   | implication of $x$ to $y$                                 | $\varphi\to\psi$                      |
| x <-> y  | biimplication of $x$ and $y$                              | $\varphi\leftrightarrow\psi$          |
| K{an}x   | agent $a\_n$ (where $n$ is an integer) knows formula $x$  | $K\_{i}\varphi$                       |
| K{n}x    | the agent $n\in \mathbf{A}$ knows formula $x$             | $K\_{n}\varphi$                       |
| Ex       | everybody knows formula $x$                               | $C\varphi$                            |
| Cx       | there is common knowledge of formula $x$                  | $E\varphi$                            |
| [x]y     | announcement of $x$ followed by $y$                       | $\[\varphi\]\psi$                     |

If only one atom, formula or agent is needed in the user's proof, the user can omit the integer $n$ without issue.

In order to facilitate infinitely many possible inputs, the parser is able to distinguish between inputs for all integers. For example, the parser recognizes that p1 and p2 are two different propositional atoms, that f1 and f2 are two different formulas, and that a1 and a2 are different agents.

To avoid ambiguity, the user is required to place brackets around binary operators if and only if the binary operator is part of a _subformula_. For example, the parser does not recognize the input 'f1 & f2 \| f3', but it does recognize '(f1 & f2) \| f3' and 'f1 & (f2 \| f3)'.

White spaces are ignored, so users may use white spaces in the way they like.

### Axioms

The axioms of the available logics are _schemes_; they represent not one tautology, but infinitely many. This is because an axiom is defined on formulas $\varphi$, which can represent any formula of the respective language. For example, take the axiom A3 ($K\_i\varphi\to\varphi$). We can instantiate this axiom on any formula of our language to get a tautology. For example, $K\_ip\to p$ is a tautology, but so are $K\_i\neg p\to\neg p$ and $K\_i(p\to q)\to(p\to q)$. Moreover, schemes can instantiate schemes: $K\_i\neg\varphi\to\neg\varphi$ is also an instantiation of A3, even though it is a scheme.

Our parser recognizes this flexibility of axioms. For all axioms, it treats the formulas on which they are defined as 'holes', which are any formula or scheme of the language. For example, if the users provides the line 'K{a1}!!f1 -> !!f1' as an input, when it encounters '!!f1' in the first hole, it checks whether '!!f1' is also in the second hole. In this case, it is, so the parses recognizes it as an instantiation of A3.

### Rules

In many cases, syntactic proofs are finished by applying rules. For example, suppose we try to derive $K\_i(p\wedge q)\to K\_ip$. We may then start with the propositional tautology $(p\wedge q)\to p$ and apply $K$-distribution (KD) to it. In our program, we do it the opposite way. We start with the formula we aim to derive ($K\_i(p\wedge q)\to K\_ip$) and then we generate the premise on which we would apply KD to get to this formula. We call this strategy a _bottom-up strategy_. So, in this case, justifying a line with KD means that (1) the line is a conditional, (2) the conditional has $K\_i$ before both the antecedent and consequent, and (3) its premise is the same conditional without the $K\_i$ before the antecedent and consequent.

We apply this strategy in general. For any formula $\varphi$ of the relevant language, there is a set of rules of which the conclusion has the same formula structure as $\varphi$. Only those rules are available to justify $\varphi$.

There are a few exceptions here. In some cases, the premises of a given rule contain formulas that are not in the conclusion. For example, consider Hypothetical Syllogism (HS). If we try to derive $\phi \to \psi$ with HS, then we would generate two premises: $\varphi \to \chi$ and $\chi \to \psi$. But what should $\chi$ be? Our program cannot determine this by itself. The user has to provide input for $\chi$ to make the rule work. 

Note also that in Meyer & Hoek (1998), the HS rule allows for more than two premises. But the program cannot determine how many premises HS should generate. For example, we can justify $\phi \to \psi$ with HS with two premises, but also three, four or more. For example, we could use $\varphi \to \chi$, $\chi \to \chi'$ and $\chi'\to\psi$ (this is three premises).
But this is not problematic. If we can use HS with $n$ premises, we can also use HS with 2 premises $n-1$ times. For example, suppose we want to prove $\varphi\to\psi$ from $\varphi \to \chi$, and $\chi \to \chi'$ and $\chi'\to\psi$. Instead of applying HS once to all three premises, we can also apply HS twice ($3-1=2$) to get the same result. In this case we get $\varphi\to\chi'$ by applying HS to $\varphi \to \chi$ and $\chi \to \chi'$, and then we get $\phi\to\psi$ by applying HS to $\varphi \to \chi'$ and $\chi'\to\psi$.
So to keep things simple, we do not facilitate HS with more than two premises. If we are to expand this project in the future, we will for sure make such a feature available.

Below is a table with the rules that we aim to implement. Formulas $\chi$ are (sub)formulas of premises that need user input as described above.

Note that with this bottom-up strategy, the user cannot add lines to the proof by themselves. The user always needs to select a rule that generates new lines for the user.

### Other implementation details

### Generating syntactic proofs

## Results

## Conclusion

## Discussion

## References




