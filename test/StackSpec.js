const test = require('tape')
const createStack = require('../src/Stack')

test('peek on empty stack', assert => {
  const stack = createStack()
  assert.strictEqual(stack.peek(), null)
  assert.end()
})

test('push items to the stack', assert => {
  const stack = createStack()
  stack.push('foo')
  stack.push('bar')
  assert.equal(stack.size(), 2)
  assert.equal(stack.peek(), 'bar')
  assert.end()
})

test('pop items from the stack', assert => {
  const stack = createStack()
  stack.push('A')
  stack.push('B')
  stack.push('C')
  assert.equal(stack.pop(), 'C')
  assert.equal(stack.pop(), 'B')
  assert.equal(stack.pop(), 'A')
  assert.equal(stack.size(), 0)
  assert.end()
})

test('create stack from array', assert => {
  const stack = createStack([ 'A', 'B', 'C' ])
  assert.equal(stack.peek(), 'C')
  assert.equal(stack.pop(), 'C')
  assert.equal(stack.pop(), 'B')
  assert.equal(stack.pop(), 'A')
  assert.end()
})

test('throws error when trying to pop empty stack', assert => {
  const stack = createStack()
  assert.throws(() => stack.pop(), RangeError)
  assert.end()
})
