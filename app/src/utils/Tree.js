import equal from "fast-deep-equal";

import axiomsList from "../data/Axioms";
import rulesList from "../data/Rules";
import { check } from "../utils/Engine";

class Tree {
  constructor(value, base = 0, validated = false, children = [], input = false) {
    this.value = value;
    this.base = base;
    this.baseList = axiomsList
      .filter((axiom) => check(value, axiom, true))
      .concat(
        rulesList.filter((rule) => check(value, rule, false))
      );
    this.validated = validated;
    this.children = children;
    this.input = input;
  }

  toArray() {
    const arr = this.children.map((c) => c.toArray()).flat();
    arr.push(this);
    return arr;
  }

  update(node, base, validated, children, input) {
    let newChildren = children
    if (!equal(this, node)) {
      newChildren = this.children.map(
        (c) => c.update(node, base, validated, children, input)
      );
    }
    return new Tree(this.value, base, validated, newChildren, input);
  }
}

export default Tree;
