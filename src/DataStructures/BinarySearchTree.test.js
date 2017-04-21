const test = require('tape')
const BinarySearchTree = require('./BinarySearchTree')

test('throw error when no input given', assert => {
  assert.throws(() => {
    const tree = new BinarySearchTree()
    tree.find('A')
  }, TypeError)
  assert.end()
})

test('build tree from string', assert => {
  const tree = new BinarySearchTree('A')
  tree.insert('B')

  assert.equals(tree.find('B'), true)
  assert.equals(tree.find('A'), true)
  assert.equals(tree.find('C'), false)
  assert.end()
})

test('build tree from array', assert => {
  const tree = new BinarySearchTree([ 'A', 'B' ])

  assert.equals(tree.find('B'), true)
  assert.equals(tree.find('A'), true)
  assert.equals(tree.find('C'), false)
  assert.end()
})

test('build tree with duplicates', assert => {
  const tree = new BinarySearchTree([ 10, 27, 3, 1, 3, 3, -0.5 ])

  assert.equals(tree.find(3), true)
  assert.equals(tree.find(-0.5), true)
  assert.equals(tree.find(-0.6), false)
  assert.end()
})

test('traverse tree in order with callback', assert => {
  const tree = new BinarySearchTree([ 2, 18, 4, -5, 3.33, 2, 25, 1, -11 ])
  const traversed = []
  tree.traverseInOrder(item => traversed.push(item))

  assert.deepEquals(traversed, [ -11, -5, 1, 2, 2, 3.33, 4, 18, 25 ])
  assert.end()
})

test('traverse tree using iterator', assert => {
  const tree = new BinarySearchTree([ 2, 18, 4, -5, 3.33, 2, 25, 1, -11 ])

  assert.deepEquals([ ...tree ], [ -11, -5, 1, 2, 2, 3.33, 4, 18, 25 ])
  assert.end()
})
