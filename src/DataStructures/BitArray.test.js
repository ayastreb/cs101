const test = require('tape')
const BitArray = require('./BitArray')

test('reading bits should not resize', assert => {
  const array = new BitArray()

  assert.equal(array.length, 0)
  assert.equal(array.get(34), false)
  assert.equal(array.length, 0)

  assert.end()
})

test('writing bits should resize', assert => {
  const array = new BitArray()

  assert.equal(array.length, 0)
  array.set(34, true)
  assert.equal(array.length, 64) // two words = 64 bits

  assert.end()
})

test('set and unset bit', assert => {
  const array = new BitArray(1024)

  for (let i = 0; i <= 1024; i++) {
    array.set(i, true)
  }
  for (let i = 0; i <= 1024; i++) {
    assert.equal(array.get(i), true)
  }
  // unset every 5th bit
  for (let i = 0; i <= 1024; i += 5) {
    array.set(i, false)
  }
  // check each 5th bit is unset, other bits should still be set
  for (let i = 0; i <= 1024; i++) {
    assert.equal(array.get(i), i % 5 !== 0)
  }

  assert.end()
})

test('toggle bit', assert => {
  const array = new BitArray()

  array.toggle(5)
  assert.equal(array.get(5), true)
  array.toggle(5)
  assert.equal(array.get(5), false)

  array.set(8, true)
  array.toggle(8)
  assert.equal(array.get(8), false)

  assert.end()
})

test('logical not', assert => {
  const A = new BitArray(32)
  assert.equal(A.toString(), '00000000000000000000000000000000')
  assert.equal(A.not().toString(), '11111111111111111111111111111111')

  for (let i = 0; i < 16; i++) {
    A.set(i, true)
  }
  assert.equal(A.toString(), '00000000000000001111111111111111')
  assert.equal(A.not().toString(), '11111111111111110000000000000000')

  const B = new BitArray()
  B.set(32, true)
  B.set(63, true)
  assert.equal(
    B.toString(),
    '1000000000000000000000000000000100000000000000000000000000000000'
  )
  assert.equal(
    B.not().toString(),
    '0111111111111111111111111111111011111111111111111111111111111111'
  )

  assert.end()
})

test('logical and', assert => {
  const A = new BitArray()
  const B = new BitArray()

  A.set(0, true)
  A.set(1, true)
  A.set(3, true)
  B.set(0, true)
  B.set(2, true)
  B.set(3, true)
  B.set(63, true)
  const C = A.and(B)

  assert.equal(A.toString(), '00000000000000000000000000001011')
  assert.equal(
    B.toString(),
    '1000000000000000000000000000000000000000000000000000000000001101'
  )
  assert.equal(C.toString(), '00000000000000000000000000001001')
  assert.end()
})

test('logical or', assert => {
  const A = new BitArray()
  const B = new BitArray()

  A.set(0, true)
  A.set(63, true)
  B.set(0, true)
  B.set(15, true)
  const C = A.or(B)

  assert.equal(
    A.toString(),
    '1000000000000000000000000000000000000000000000000000000000000001'
  )
  assert.equal(B.toString(), '00000000000000001000000000000001')
  assert.equal(
    C.toString(),
    '1000000000000000000000000000000000000000000000001000000000000001'
  )
  assert.end()
})

test('logical xor', assert => {
  const A = new BitArray()
  const B = new BitArray()

  A.set(0, true)
  A.set(3, true)
  B.set(0, true)
  B.set(63, true)
  const C = A.xor(B)

  assert.equal(A.toString(), '00000000000000000000000000001001')
  assert.equal(
    B.toString(),
    '1000000000000000000000000000000000000000000000000000000000000001'
  )
  assert.equal(
    C.toString(),
    '1000000000000000000000000000000000000000000000000000000000001000'
  )
  assert.end()
})

test('print to string', assert => {
  const array = new BitArray()

  assert.equal(array.toString(), '')

  array.set(0, true)
  array.set(2, true)
  array.set(4, true)
  array.set(5, true)
  array.set(30, true)
  array.set(31, true)
  array.set(32, true)
  array.set(33, true)

  assert.equal(array.toString(true), '1111000000000000000000000000110101')

  assert.end()
})

test('default iterator', assert => {
  const array = new BitArray()
  array.set(0, true)
  array.set(31, true)
  array.set(33, true)

  const expectedArray = new Array(64)
  for (let i = 0; i < expectedArray.length; i++) {
    expectedArray[i] = false
  }
  expectedArray[0] = true
  expectedArray[31] = true
  expectedArray[33] = true
  // iterator yields bits in mathematical order, so 0th bit (rightmost) will be
  // the last element of iterated array, hence reversed expectedArray
  assert.deepEqual([...array], expectedArray.reverse())
  assert.end()
})
