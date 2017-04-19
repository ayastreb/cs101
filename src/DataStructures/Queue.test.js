const test = require('tape')
const createQueue = require('./Queue')

test('peek on empty queue', assert => {
  const queue = createQueue()
  assert.strictEqual(queue.peek(), null)
  assert.end()
})

test('enqueue items to the queue', assert => {
  const queue = createQueue()
  queue.enqueue('foo')
  queue.enqueue('bar')
  assert.equal(queue.size(), 2)
  assert.equal(queue.peek(), 'foo')
  assert.end()
})

test('dequeue items from the queue', assert => {
  const queue = createQueue()
  queue.enqueue('A')
  queue.enqueue('B')
  queue.enqueue('C')
  assert.equal(queue.dequeue(), 'A')
  assert.equal(queue.dequeue(), 'B')
  assert.equal(queue.dequeue(), 'C')
  assert.end()
})

test('create queue from array', assert => {
  const queue = createQueue([ 'A', 'B', 'C' ])
  assert.equal(queue.peek(), 'A')
  assert.equal(queue.dequeue(), 'A')
  assert.equal(queue.dequeue(), 'B')
  assert.equal(queue.dequeue(), 'C')
  assert.end()
})

test('throws error when trying to dequeue empty queue', assert => {
  const queue = createQueue()
  assert.throws(() => queue.dequeue(), RangeError)
  assert.end()
})
