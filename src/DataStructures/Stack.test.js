const test = require('tape')
const Stack = require('./Stack')

test('peek on empty stack', assert => {
  const stack = new Stack()
  assert.strictEqual(stack.peek(), null)
  assert.end()
})

test('push items to the stack', assert => {
  const stack = new Stack()
  stack.push('foo')
  stack.push('bar')
  assert.equal(stack.length, 2)
  assert.equal(stack.peek(), 'bar')
  assert.end()
})

test('pop items from the stack', assert => {
  const stack = new Stack()
  stack.push('A')
  stack.push('B')
  stack.push('C')
  assert.equal(stack.pop(), 'C')
  assert.equal(stack.pop(), 'B')
  assert.equal(stack.pop(), 'A')
  assert.equal(stack.length, 0)
  assert.end()
})

test('create stack from array', assert => {
  const stack = new Stack(['A', 'B', 'C'])
  assert.equal(stack.peek(), 'C')
  assert.equal(stack.pop(), 'C')
  assert.equal(stack.pop(), 'B')
  assert.equal(stack.pop(), 'A')
  assert.end()
})

test('throws error when trying to pop empty stack', assert => {
  const stack = new Stack()
  assert.throws(() => stack.pop(), RangeError)
  assert.end()
})
