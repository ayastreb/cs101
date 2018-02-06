const test = require('tape')
const BinarySearchTree = require('../DataStructures/BinarySearchTree')
const Queue = require('../DataStructures/Queue')
/**
 * Given a binary tree, traverse it in level order, e.g. print each level of
 * the tree in a separate line.
 *
 * @param {BinarySearchTree} root
 * @returns {Array}
 */
function levelOrderTraversal(root) {
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

test('traverse tree by level order', assert => {
  /**
   *     (C)
   *     / \
   *   (A) (D)
   *     \   \
   *     (B) (F)
   *         / \
   *       (E) (G)
   */
  const tree = new BinarySearchTree('C')
  tree.insert('A')
  tree.insert('B')
  tree.insert('D')
  tree.insert('F')
  tree.insert('E')
  tree.insert('G')

  assert.deepEquals([...tree], ['A', 'B', 'C', 'D', 'E', 'F', 'G'])
  const expectedLevelOrder = [['C'], ['A', 'D'], ['B', 'F'], ['E', 'G']]
  const actualLevelOrder = levelOrderTraversal(tree)
  assert.deepEquals(actualLevelOrder, expectedLevelOrder)
  assert.end()
})
