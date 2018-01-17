const test = require('tape')
const MinHeap = require('./MinHeap')

test('find returns null in empty heap', assert => {
  const heap = new MinHeap()

  assert.equal(heap.findMin(), null)
  assert.end()
})

test('length is 0 in empty heap', assert => {
  const heap = new MinHeap()

  assert.equal(heap.length, 0)
  assert.end()
})

test('length is updated when items added', assert => {
  const heap = new MinHeap()

  heap.insert(1)
  heap.insert(2)
  heap.insert(10)

  assert.equal(heap.length, 3)
  assert.end()
})

test('length is updated when items removed', assert => {
  const heap = new MinHeap()

  heap.insert(1)
  heap.insert(2)
  heap.insert(10)
  heap.extractMin()
  heap.extractMin()

  assert.equal(heap.length, 1)
  assert.end()
})

test('min item is replaced with given item', assert => {
  const heap = new MinHeap()

  heap.insert(1)
  heap.insert(2)
  heap.insert(3)
  assert.equal(heap.findMin(), 1)
  assert.equal(heap.length, 3)
  heap.replace(4)
  assert.equal(heap.findMin(), 2)
  assert.equal(heap.length, 3)
  assert.equal(heap.extractMin(), 2)
  assert.equal(heap.extractMin(), 3)
  assert.equal(heap.extractMin(), 4)
  assert.end()
})

test('find returns min item from heap', assert => {
  const heap = new MinHeap()

  heap.insert(3)
  heap.insert(1)
  heap.insert(10)

  assert.equal(heap.length, 3)
  assert.equal(heap.findMin(), 1)
  assert.equal(heap.length, 3)
  assert.end()
})

test('extract returns min item from heap', assert => {
  const heap = new MinHeap()

  heap.insert(9)
  heap.insert(8)
  heap.insert(7)
  heap.insert(6)
  heap.insert(5)
  heap.insert(4)
  heap.insert(3)
  heap.insert(2)
  heap.insert(2)
  heap.insert(2)
  heap.insert(1)

  assert.equal(heap.extractMin(), 1)
  assert.equal(heap.extractMin(), 2)
  assert.equal(heap.extractMin(), 2)
  assert.equal(heap.extractMin(), 2)
  assert.equal(heap.extractMin(), 3)
  assert.equal(heap.extractMin(), 4)
  assert.equal(heap.extractMin(), 5)
  assert.equal(heap.extractMin(), 6)
  assert.equal(heap.extractMin(), 7)
  assert.equal(heap.extractMin(), 8)
  assert.equal(heap.extractMin(), 9)
  assert.equal(heap.extractMin(), null)
  assert.equal(heap.extractMin(), null)
  assert.end()
})

test('heap can be iterated', assert => {
  const heap = new MinHeap()
  heap.insert(5)
  heap.insert(0)
  heap.insert(3)
  heap.insert(2)
  heap.insert(4)
  heap.insert(1)
  assert.deepEqual([...heap], [0, 1, 2, 3, 4, 5])
  assert.end()
})

test('heap is created from given array', assert => {
  const input = [5, 6, 3, 1, 2, 0, 4]
  const heap = new MinHeap(input)

  assert.deepEqual([...heap], [0, 1, 2, 3, 4, 5, 6])
  assert.deepEqual(input, [5, 6, 3, 1, 2, 0, 4]) // input data should not be modified
  assert.end()
})

test('sort random data with heap', assert => {
  const input = []
  for (let i = 0; i < 1e5; i++) {
    const item = Math.floor(Math.random() * 1e4)
    input.push(item)
  }

  const heap = new MinHeap(input)
  assert.deepEqual([...heap], input.sort((a, b) => a - b))
  assert.end()
})
