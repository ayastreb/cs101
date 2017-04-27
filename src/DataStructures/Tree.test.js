const test = require('tape')
const createTree = require('./Tree')

test('create root node', assert => {
  const root = createTree('Root')
  assert.equals(root.label, 'Root')
  assert.end()
})

test('tree size', assert => {
  /**
   *   (A)
   *   / \
   * (B) (D)
   *  |
   * (C)
   */
  const root = createTree('A')
  const leftTree = root.insert('B')
  leftTree.insert('C')
  const rightTree = root.insert('D')
  assert.equals(root.size, 4)
  assert.equals(leftTree.size, 2)
  assert.equals(rightTree.size, 1)
  assert.end()
})

test('tree depth', assert => {
  /**
   *             Depth:
   *     (A)     -> 0
   *   /  |  \
   * (B) (F) (G) -> 1
   *  |       |
   * (C)     (H) -> 2
   *  |
   * (D)         -> 3
   *  |
   * (E)         -> 4
   */
  const root = createTree('A')
  const nodeB = root.insert('B')
  const nodeC = nodeB.insert('C')
  const nodeD = nodeC.insert('D')
  const nodeE = nodeD.insert('E')
  const nodeF = root.insert('F')
  const nodeG = root.insert('G')
  const nodeH = nodeG.insert('H')

  assert.equals(root.depth, 0) // Depth of root is 0
  assert.equals(nodeB.depth, 1) // 1 edge from `B` to `A`
  assert.equals(nodeC.depth, 2) // 2 edges from `C` to `A`
  assert.equals(nodeD.depth, 3) // 3 edges from `D` to `A`
  assert.equals(nodeE.depth, 4) // 4 edges from `E` to `A`
  assert.equals(nodeF.depth, 1) // 1 edge from `F` to `A`
  assert.equals(nodeG.depth, 1) // 1 edge from `G` to `A`
  assert.equals(nodeH.depth, 2) // 2 edges from `H` to `A`
  assert.end()
})

test('tree height', assert => {
  /**
   *     (A)
   *   /  |  \
   * (B) (F) (G)
   *  |       |
   * (C)     (H)
   *  |
   * (D)
   *  |
   * (E)
   */
  const root = createTree('A')
  const nodeB = root.insert('B')
  const nodeC = nodeB.insert('C')
  const nodeD = nodeC.insert('D')
  const nodeE = nodeD.insert('E')
  const nodeF = root.insert('F')
  const nodeG = root.insert('G')
  const nodeH = nodeG.insert('H')

  assert.equals(root.height, 4) // 4 edges from `A` to `E`
  assert.equals(nodeB.height, 3) // 3 edges from `B` to `E`
  assert.equals(nodeC.height, 2) // 2 edges from `C` to `E`
  assert.equals(nodeD.height, 1) // 1 edge from `D` to `E`
  assert.equals(nodeE.height, 0) // No edges, `E` is a leaf
  assert.equals(nodeF.height, 0) // No edges, `F` is a leaf
  assert.equals(nodeG.height, 1) // 1 edge from `G` to `H`
  assert.equals(nodeH.height, 0) // No edges, `H` is a leaf
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
  const root = createTree('A')
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
  const root = createTree(1)
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
  const root = createTree('A')
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
