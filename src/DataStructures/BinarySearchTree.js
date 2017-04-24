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
module.exports = class BinarySearchTree {
  constructor (value) {
    if (value === undefined) throw new TypeError('Initial value is required!')
    this.value = value
    this.left = null
    this.right = null
  }

  /**
   * Insert new value into the tree.
   *
   * Performance: O(log(n)) on average, depends on tree height
   * @param {string|number} value
   */
  insert (value) {
    let parent
    let current = this
    while (current) {
      parent = current
      current = value < current.value ? current.left : current.right
    }

    const child = new BinarySearchTree(value)
    if (value < parent.value) {
      parent.left = child
    } else {
      parent.right = child
    }

    return child
  }

  /**
   * Find given value in the tree.
   *
   * Performance: O(log(n)) on average, depends on tree height
   * @param {string|number} value
   * @returns {boolean}
   */
  find (value) {
    let current = this
    while (current) {
      if (value === current.value) return true
      current = value < current.value ? current.left : current.right
    }

    return false
  }

  /**
   * Traverse the tree using in order depth first search, e.g. visit all
   * left-most nodes before processing current node and after that visit all
   * right-most nodes.
   *
   * Performance: O(n)
   * @param {function} fn
   */
  traverseInOrder (fn) {
    const visit = node => {
      if (node) {
        visit(node.left)
        fn(node.value)
        visit(node.right)
      }
    }

    visit(this)
  }

  /**
   * Traverse the tree using in order depth first search.
   * Implemented without recursion.
   *
   * Performance: O(n)
   */
  *[Symbol.iterator] () {
    const stack = createStack()
    let node = this
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
