const createQueue = require('./Queue')
const createStack = require('./Stack')
/**
 * Abstract tree is a non-linear data structure where one node can be linked
 * to multiple other nodes. Tree always starts with a root node and has no cycles,
 * e.g. no nodes linking to another node which already has a parent.
 *
 * Trees are used to represent hierarchy (e.g. disk file system or class inheritance)
 * and also could be used for search (e.g. Binary Search Tree).
 */
module.exports = createTree

function createTree (input) {
  const children = []
  let parent = null
  let size = 1
  let height = 0
  let depth = 0

  return {
    label: input,
    children,
    parent,
    size,
    height,
    depth,
    insert,
    traverseBFS,
    traverseDFS
  }

  /**
   * Insert new node to the tree with given label and return this new node.
   * If we want to keep track of node's size, depth and height - we need to
   * update all parent nodes when we insert new one.
   *
   * Performance: O(h) where `h` is height of the parent tree
   * @param {string|number} value
   * @returns {object}
   */
  function insert (value) {
    const child = createTree(value)
    child.parent = this
    children.push(child)

    let parent = child.parent
    while (parent !== null) {
      parent.size += 1
      child.depth += 1
      parent.height = Math.max(parent.height, child.depth)
      parent = parent.parent
    }

    return child
  }

  /**
   * Traverse the tree using breadth first search and execute callback on each
   * node label. Stop traversing if callback returns `false`.
   *
   * Performance: O(n)
   * @param {function} fn
   */
  function traverseBFS (fn) {
    const queue = createQueue()
    queue.enqueue(this)

    while (queue.length > 0) {
      const node = queue.dequeue()
      if (fn(node.label) === false) return

      node.children.forEach(child => queue.enqueue(child))
    }
  }

  /**
   * Traverse the tree using depth first search and execute callback on each
   * node label. Stop traversing if callback returns `false`.
   *
   * Performance: O(n)
   * @param fn
   */
  function traverseDFS (fn) {
    const stack = createStack()
    stack.push(this)

    while (stack.length > 0) {
      const node = stack.pop()
      if (fn(node.label) === false) return

      node.children.reverse().forEach(child => stack.push(child))
    }
  }
}
