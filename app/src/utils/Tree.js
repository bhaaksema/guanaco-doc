import equal from "fast-deep-equal";

import axiomsList from "../data/AxiomsKEC";
import rulesList from "../data/RulesK";
import shortcuts from "../data/Shortcuts";
import { check } from "../utils/Engine";

class Tree {
  constructor(value, base = 0, validated = false, children = [], input = false) {
    this.value = value;
    this.base = base;
    this.baseList = axiomsList
      .filter((axiom) => check(value, axiom, true))
      .concat(
        rulesList.filter((rule) => check(value, rule, false))
      ).concat(
        shortcuts.filter((shortcut) => check(value, shortcut, false))
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
    if (equal(this, node)) {
      this.base = base;
      this.validated = validated;
      this.input = input;
      this.children = children;
    } else {
      this.children = this.children.map(
        (c) => c.update(node, base, validated, children, input)
      );
    }
    return new Tree(this.value, this.base, this.validated, this.children, this.input);
  }
}

export default Tree;
