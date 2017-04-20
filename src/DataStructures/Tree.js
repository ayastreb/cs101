const createQueue = require('./Queue')
const createStack = require('./Stack')
/**
 * Abstract tree is a non-linear data structure where one node can be linked
 * to multiple other nodes. Tree always starts with a root node and has no cycles,
 * e.g. no nodes linking to another node which already has a parent.
 *
 * Trees are used to represent hierarchy (e.g. disk file system or class inheritance)
 * and also could be used for search (e.g. Binary Search Tree).
 *
 * @type {Tree}
 */
module.exports = class Tree {
  /**
   * Create new tree root with given label.
   *
   * @param {string|number} label
   */
  constructor (label) {
    this.label = label
    this.children = []
  }

  /**
   * Insert new node to the tree with given label and return this new node.
   *
   * Performance: O(1)
   * @param {string|number} label
   * @returns {Tree}
   */
  insert (label) {
    const child = new Tree(label)
    this.children.push(child)

    return child
  }

  /**
   * Traverse the tree using breadth first search and execute callback on each
   * node label. Stop traversing if callback returns `false`.
   *
   * Performance: O(n)
   * @param {function} callback
   */
  traverseBFS (callback) {
    const queue = createQueue()
    queue.enqueue(this)

    while (queue.size() > 0) {
      const node = queue.dequeue()
      if (callback(node.label) === false) return

      node.children.forEach(child => queue.enqueue(child))
    }
  }

  /**
   * Traverse the tree using depth first search and execute callback on each
   * node label. Stop traversing if callback returns `false`.
   *
   * Performance: O(n)
   * @param callback
   */
  traverseDFS (callback) {
    const stack = createStack()
    stack.push(this)

    while (stack.size() > 0) {
      const node = stack.pop()
      if (callback(node.label) === false) return

      node.children.reverse().forEach(child => stack.push(child))
    }
  }

  /**
   * Calculate size of the tree by visiting all children and summing up.
   *
   * Performance: O(n)
   * @returns {number}
   */
  get length () {
    return this.children.reduce((size, child) => size + child.length, 1)
  }

  /**
   * Calculate height of the tree, e.g. distance from root to its furthest leaf.
   *
   * Performance: O(n)
   * @returns {number}
   */
  get height () {
    if (this.children.length === 0) return 1

    return 1 + Math.max(...this.children.map(child => child.height))
  }
}
