const test = require('tape')
const createBinarySearchTree = require('../DataStructures/BinarySearchTree')
const levelOrderTraversal = require('./LevelOrderTraversal')

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
  const tree = createBinarySearchTree('C')
  tree.insert('A')
  tree.insert('B')
  tree.insert('D')
  tree.insert('F')
  tree.insert('E')
  tree.insert('G')

  assert.deepEquals([ ...tree ], [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ])
  const expectedLevelOrder = [
    [ 'C' ],
    [ 'A', 'D' ],
    [ 'B', 'F' ],
    [ 'E', 'G' ]
  ]
  const actualLevelOrder = levelOrderTraversal(tree)
  assert.deepEquals(actualLevelOrder, expectedLevelOrder)
  assert.end()
})
