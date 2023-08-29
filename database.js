const { BTree } = require('./btree');

class Database {
  constructor() {
    this.records = [];
    this.indexes = {};
  }

  insert(values) {
    this.records.push(values);

    const id = this.records.length;
    Object.keys(this.indexes).forEach((attribute) => {
      this.updateIndex(attribute, values[attribute], id);
    });

    return id;
  }

  findById(id) {
    return this.records[id - 1];
  }

  findBy(attribute, value) {
    const index = this.indexes[attribute];

    if (index) {
      const ids = index.search(value) || [];
      return ids.map((id) => this.findById(id));
    } else {
      return this.records.filter((record) => record[attribute] === value);
    }
  }

  createIndex(attribute) {
    this.indexes[attribute] = new BTree();
  }

  updateIndex(attribute, value, id) {
    const index = this.indexes[attribute];
    let ids = index.search(value);

    if (!ids) {
      ids = [];
      index.insert(value, ids);
    }

    ids.push(id);
  }
}

module.exports = { Database };
