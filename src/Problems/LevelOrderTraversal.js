const Queue = require('../DataStructures/Queue')
/**
 * Given a binary tree, traverse it in level order, e.g. print each level of
 * the tree in a separate line.
 *
 * @param {BinarySearchTree} root
 * @returns {Array}
 */
module.exports = root => {
  let pendingNodes = 0
  const output = []
  const queue = new Queue()
  queue.enqueue(root)

  while (queue.length > 0) {
    const level = []
    pendingNodes = queue.length
    while (pendingNodes > 0) {
      const node = queue.dequeue()
      level.push(node.value)
      if (node.left) queue.enqueue(node.left)
      if (node.right) queue.enqueue(node.right)
      pendingNodes--
    }
    output.push(level)
  }

  return output
}
