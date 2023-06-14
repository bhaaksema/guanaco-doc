class Tree {
  constructor(value, base = 0, validated = false, children = []) {
    this.value = value;
    this.base = base;
    this.validated = validated;
    this.children = children;
  }

  toArray() {
    const arr = this.children.map((c) => c.toArray()).flat();
    arr.push(this);
    return arr;
  }

  update(node, base, validated, children) {
    if (this == node) {
      this.base = base;
      this.validated = validated;
      this.children = children;
    } else {
      this.children = this.children.map((c) => c.update(node, base, validated, children));
    }
    return new Tree(this.value, this.base, this.validated, this.children);
  }
}

export default Tree;
