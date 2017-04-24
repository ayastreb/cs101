const test = require('tape')
const BinarySearchTree = require('./BinarySearchTree')

test('throw error when no input given', assert => {
  assert.throws(() => {
    const tree = new BinarySearchTree()
    tree.find('A')
  }, TypeError)
  assert.end()
})

test('find in tree with strings', assert => {
  const tree = new BinarySearchTree('A')
  tree.insert('B')

  assert.equals(tree.find('B'), true)
  assert.equals(tree.find('A'), true)
  assert.equals(tree.find('C'), false)
  assert.end()
})

test('find in tree with duplicates', assert => {
  const input = [ 10, 27, 3, 1, 3, 3, -0.5 ]
  const tree = new BinarySearchTree(input.shift())
  input.forEach(value => tree.insert(value))

  assert.equals(tree.find(3), true)
  assert.equals(tree.find(-0.5), true)
  assert.equals(tree.find(-0.6), false)
  assert.end()
})

test('traverse tree in order', assert => {
  const input = [ 2, 18, 4, -5, 3.33, 2, 25, 1, -11 ]
  const tree = new BinarySearchTree(input.shift())
  input.forEach(value => tree.insert(value))
  const traversed = []
  tree.traverseInOrder(item => traversed.push(item))

  assert.deepEquals(traversed, [ -11, -5, 1, 2, 2, 3.33, 4, 18, 25 ])
  assert.end()
})

test('traverse tree using iterator', assert => {
  const input = [ 2, 18, 4, -5, 3.33, 2, 25, 1, -11 ]
  const tree = new BinarySearchTree(input.shift())
  input.forEach(value => tree.insert(value))

  assert.deepEquals([ ...tree ], [ -11, -5, 1, 2, 2, 3.33, 4, 18, 25 ])
  assert.end()
})
