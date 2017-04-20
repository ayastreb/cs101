const test = require('tape')
const Tree = require('./Tree')

test('create root node', assert => {
  const root = new Tree('Root')
  assert.equals(root.label, 'Root')
  assert.end()
})

test('count size', assert => {
  /**
   *   (A)
   *   / \
   * (B) (D)
   *  |
   * (C)
   */
  const root = new Tree('A')
  root.insert('B').insert('C')
  root.insert('D')
  assert.equals(root.length, 4)
  assert.end()
})

test('count height', assert => {
  /**
   *   (A)
   *   / \
   * (B) (F)
   *  |
   * (C)
   *  |
   * (D)
   *  |
   * (E)
   */
  const root = new Tree('A')
  const leftTree = root.insert('B')
  const rightTree = root.insert('F')
  leftTree.insert('C').insert('D').insert('E')
  assert.equals(root.height, 5)
  assert.equals(leftTree.height, 4)
  assert.equals(rightTree.height, 1)
  assert.end()
})

test('traverse with breadth first search', assert => {
  /**
   *     (A)
   *   /  |  \
   * (B) (C) (D)
   *      |
   *     (E)
   *     / \
   *   (F) (G)
   */
  const root = new Tree('A')
  root.insert('B')
  const middleTree = root.insert('C').insert('E')
  middleTree.insert('F')
  middleTree.insert('G')
  root.insert('D')

  const expected = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const traversed = []
  root.traverseBFS(label => traversed.push(label))
  assert.deepEquals(traversed, expected)
  assert.end()
})

test('traverse with depth first search', assert => {
  /**
   *     (1)
   *   /  |  \
   * (2) (3) (7)
   *      |
   *     (4)
   *     / \
   *   (5) (6)
   */
  const root = new Tree(1)
  root.insert(2)
  const middleTree = root.insert(3).insert(4)
  middleTree.insert(5)
  middleTree.insert(6)
  root.insert(7)

  const expected = [1, 2, 3, 4, 5, 6, 7]
  const traversed = []
  root.traverseDFS(label => traversed.push(label))
  assert.deepEquals(traversed, expected)
  assert.end()
})

test('stop traversing if callback returns false', assert => {
  /**
   *     (A)
   *   /  |  \
   * (B) (C) (D) <- Stop here
   *      |
   *     (E)
   *     / \
   *   (F) (G)
   */
  const root = new Tree('A')
  root.insert('B')
  const middleTree = root.insert('C').insert('E')
  root.insert('D')
  middleTree.insert('F')
  middleTree.insert('G')

  const expected = ['A', 'B', 'C', 'D']
  const traversed = []
  root.traverseBFS(label => {
    traversed.push(label)
    return label !== 'D'
  })
  assert.deepEquals(traversed, expected)
  assert.end()
})
