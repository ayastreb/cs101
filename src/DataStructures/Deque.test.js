const test = require('tape')
const createDeque = require('./Deque')

test('create empty deque', assert => {
  const deque = createDeque()
  assert.equal(deque.length, 0)
  assert.strictEqual(deque.first, null)
  assert.strictEqual(deque.last, null)
  assert.end()
})

test('create deque from initial data', assert => {
  const deque = createDeque(['A', 'B', 'C'])
  assert.equal(deque.length, 3)
  assert.equal(deque.first, 'A')
  assert.equal(deque.last, 'C')
  assert.end()
})

test('add item to the front of the deque', assert => {
  const deque = createDeque()
  deque.push('A')
  deque.push('B')
  assert.equal(deque.first, 'A')
  assert.equal(deque.last, 'B')
  assert.end()
})

test('add item to the back of the deque', assert => {
  const deque = createDeque(['B', 'C', 'D'])
  deque.unshift('A')
  assert.equal(deque.first, 'A')
  assert.end()
})

test('remove item from the front of the deque', assert => {
  const deque = createDeque(['A', 'B', 'C'])
  assert.equal(deque.pop(), 'C')
  assert.equal(deque.first, 'A')
  assert.equal(deque.last, 'B')
  assert.end()
})

test('remove item from the back of the deque', assert => {
  const deque = createDeque(['A', 'B', 'C'])
  assert.equal(deque.shift(), 'A')
  assert.equal(deque.first, 'B')
  assert.equal(deque.last, 'C')
  assert.end()
})

test('throws error when trying to remove from empty deque', assert => {
  const deque = createDeque()
  assert.throws(() => deque.pop(), RangeError)
  assert.throws(() => deque.shift(), RangeError)
  assert.end()
})
