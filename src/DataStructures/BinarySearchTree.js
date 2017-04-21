const createStack = require('./Stack')
/**
 * Binary search tree (BST) is a sorted binary tree.
 * Each node can have only two child nodes, where value in left child node is
 * less than parent's value and value in right child node is equal to or greater
 * than parent's value.
 * Because BST is sorted it is possible to use principle of binary search when
 * inserting or looking up values.
 * In order depth first search of a binary tree results in sorted input values.
 *
 * @type {BinarySearchTree}
 */
module.exports = class {
  /**
   * Build binary search tree from given initial input,
   * which can be either single value or an array of values.
   *
   * Performance: O(n*log(n)) on average
   * @param {string|number|Array} input
   */
  constructor (input) {
    if (!input.length) throw new TypeError('Initial value is required!')
    if (Array.isArray(input)) {
      this.root = new Node(input.shift())
      for (let item of input) this.insert(item)
    } else {
      this.root = new Node(input)
    }
  }

  /**
   * Insert new value into the tree.
   *
   * Performance: O(log(n)) on average, depends on tree height
   * @param {string|number} value
   */
  insert (value) {
    let parent, direction
    let node = this.root
    while (node) {
      parent = node
      direction = value < node.value ? 'left' : 'right'
      node = node[ direction ]
    }

    parent[ direction ] = new Node(value)
  }

  /**
   * Find given value in the tree.
   *
   * Performance: O(log(n)) on average, depends on tree height
   * @param {string|number} value
   * @returns {boolean}
   */
  find (value) {
    let node = this.root
    while (node) {
      if (value === node.value) return true
      node = value < node.value ? node.left : node.right
    }

    return false
  }

  /**
   * Traverse the tree using in order depth first search, e.g. visit all
   * left-most nodes before processing current node and after that visit all
   * right-most nodes.
   *
   * Performance: O(n)
   * @param {function} callback
   */
  traverseInOrder (callback) {
    const visit = node => {
      if (node) {
        visit(node.left)
        callback(node.value)
        visit(node.right)
      }
    }

    visit(this.root)
  }

  /**
   * Traverse the tree using in order depth first search.
   * Implemented without recursion.
   *
   * Performance: O(n)
   */
  *[Symbol.iterator] () {
    const stack = createStack()
    let node = this.root
    while (stack.size() > 0 || node) {
      if (node) {
        stack.push(node)
        node = node.left
      } else {
        node = stack.pop()
        yield node.value
        node = node.right
      }
    }
  }
}

class Node {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
