const test = require('tape')
const ExtendedSet = require('./Set')

test('create empty set', assert => {
  const set = new ExtendedSet()
  assert.equal(set.size, 0)
  assert.deepEqual(set.values(), [])
  assert.end()
})

test('create set from input array', assert => {
  const set = new ExtendedSet(['foo', 'bar', 'foo', 'baz'])

  assert.equal(set.size, 3)
  assert.equal(set.has('foo'), true)
  assert.equal(set.has('bar'), true)
  assert.equal(set.has('baz'), true)
  assert.end()
})

test('add item to set', assert => {
  const set = new ExtendedSet()
  set.add('foo')
  assert.equal(set.size, 1)
  assert.equal(set.has('foo'), true)
  assert.deepEqual(set.values(), ['foo'])
  assert.end()
})

test('add only unique item', assert => {
  const set = new ExtendedSet()
  set.add('foo')
  set.add('bar')
  set.add('foo')
  assert.equal(set.size, 2)
  assert.equal(set.has('foo'), true)
  assert.equal(set.has('bar'), true)
  assert.deepEqual(set.values(), ['foo', 'bar'])
  assert.end()
})

test('remove item', assert => {
  const set = new ExtendedSet()
  set.add('foo')
  set.add('bar')
  assert.equal(set.size, 2)
  assert.equal(set.has('foo'), true)
  assert.equal(set.has('bar'), true)
  set.remove('foo')
  assert.equal(set.size, 1)
  assert.equal(set.has('foo'), false)
  assert.equal(set.has('bar'), true)
  assert.end()
})

test('clear set', assert => {
  const set = new ExtendedSet()
  set.add('foo')
  set.add('bar')
  assert.equal(set.size, 2)
  assert.equal(set.has('foo'), true)
  assert.equal(set.has('bar'), true)
  set.clear()
  assert.equal(set.size, 0)
  assert.equal(set.has('foo'), false)
  assert.equal(set.has('bar'), false)
  assert.end()
})

test('iterate over set', assert => {
  const set = new ExtendedSet()
  set.add('foo')
  set.add('bar')
  set.add('baz')
  set.remove('bar')
  assert.deepEqual([...set], ['foo', 'baz'])
  assert.end()
})

test('includes operator', assert => {
  const setA = new ExtendedSet(['A', 'B', 'C'])
  const setB = new ExtendedSet(['C', 'A'])
  const setC = new ExtendedSet(['A', 'D'])

  assert.equal(setA.includes(setB), true)
  assert.equal(setA.includes(setC), false)
  assert.end()
})

test('subset operator', assert => {
  const setA = new ExtendedSet(['A', 'B', 'C'])
  const setB = new ExtendedSet(['C', 'A'])
  const setC = new ExtendedSet(['A', 'D'])

  assert.equal(setB.isSubsetOf(setA), true)
  assert.equal(setC.isSubsetOf(setA), false)
  assert.end()
})

test('union two sets', assert => {
  const setA = new ExtendedSet(['A', 'B', 'C'])
  const setB = new ExtendedSet(['B', 'C', 'D'])

  assert.deepEqual(setA.union(setB).values(), ['A', 'B', 'C', 'D'])
  assert.end()
})

test('intersection of two sets', assert => {
  const setA = new ExtendedSet(['A', 'B', 'C'])
  const setB = new ExtendedSet(['B', 'C', 'D', 'E'])

  assert.deepEqual(setA.intersection(setB).values(), ['B', 'C'])
  assert.end()
})

test('difference of two sets', assert => {
  const setA = new ExtendedSet(['A', 'B', 'C'])
  const setB = new ExtendedSet(['B', 'C', 'D', 'E'])

  assert.deepEqual(setA.difference(setB).values(), ['A'])
  assert.deepEqual(setB.difference(setA).values(), ['D', 'E'])
  assert.end()
})

test('symmetric difference', assert => {
  const setA = new ExtendedSet(['A', 'B', 'C'])
  const setB = new ExtendedSet(['B', 'C', 'D', 'E'])

  assert.deepEqual(setA.symmetricDifference(setB).values(), ['A', 'D', 'E'])
  assert.deepEqual(setB.symmetricDifference(setA).values(), ['D', 'E', 'A'])
  assert.end()
})
