class BTree {
  constructor() {
    this.root = new Node();
  }

  search(key) {
    return this.root.search(key);
  }

  insert(key, value) {
    if (this.root.isFull()) {
      const oldRoot = this.root;
      this.root = new Node();
      this.root.children.push(oldRoot);
      this.root.split(0);
    }

    this.root.insert(key, value);
  }

  inspect() {
    return this.root.inspect();
  }
}

class Node {
  constructor() {
    this.children = [];
    this.keys = [];
    this.values = [];
  }

  search(key) {
    let i = 0;

    while (key > this.keys[i]) i++;

    if (key === this.keys[i]) {
      return this.values[i];
    } else if (this.isLeaf()) {
      return;
    }

    return this.children[i].search(key);
  }

  isFull() {
    return this.keys.length >= 2 * BTree.degree - 1;
  }

  isLeaf() {
    return this.children.length === 0;
  }

  insert(key, value) {
    let i = 0;
    while (key > this.keys[i]) i++;

    if (this.isLeaf()) {
      this.keys.splice(i, 0, key);
      this.values.splice(i, 0, value);
    } else {
      const child = this.children[i];

      if (child.isFull()) {
        this.split(i);
        this.insert(key, value);
      } else {
        child.insert(key, value);
      }
    }
  }

  split(i) {
    const middle = BTree.degree - 1;

    const splitChild = this.children[i];
    const newChild = new Node();

    newChild.keys = splitChild.keys.splice(middle + 1);
    newChild.values = splitChild.values.splice(middle + 1);
    newChild.children = splitChild.children.splice(middle + 1);

    this.children.splice(i + 1, 0, newChild);
    this.keys.splice(i, 0, splitChild.keys[middle]);
    this.values.splice(i, 0, splitChild.values[middle]);

    splitChild.keys.splice(middle);
    splitChild.values.splice(middle);
  }

  inspect(indent = '') {
    let out = indent + this.keys.join(', ');
    this.children.forEach((child) => {
      out += '\n' + child.inspect(indent + '  ');
    });
    return out;
  }
}

BTree.degree = 2;

module.exports = { BTree };
