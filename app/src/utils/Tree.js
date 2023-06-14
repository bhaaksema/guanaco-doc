class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  toArray() {
    const arr = this.children.map((c) => c.toArray()).flat();
    arr.push(this);
    return arr;
  }
}

export default Tree;
