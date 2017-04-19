const test = require('tape')
const calculate = require('./ReversePostfixNotation')

test('it validates input', assert => {
  assert.throws(() => calculate('1 a 2 +'), TypeError)
  assert.throws(() => calculate('ab+'), TypeError)
  assert.throws(() => calculate('12:'), TypeError)
  assert.throws(() => calculate('foo'), TypeError)
  assert.throws(() => calculate(), TypeError)
  assert.throws(() => calculate(false), TypeError)
  assert.throws(() => calculate([1, 2]), TypeError)
  assert.throws(() => calculate({a: 1, b: 2}), TypeError)
  assert.end()
})

test('it validates too many values in input', assert => {
  assert.throws(() => calculate('3 4 5 +'), TypeError)
  assert.end()
})

test('it validates too few values in input', assert => {
  assert.throws(() => calculate('3 +'), TypeError)
  assert.throws(() => calculate('3 4 + -'), TypeError)
  assert.end()
})

test('it calculates addition', assert => {
  assert.equal(calculate('3 4 +'), 7)
  assert.equal(calculate('3.75 4.1 +'), 7.85)
  assert.equal(calculate('3 4.18 +'), 7.18)
  assert.end()
})

test('it calculates subtraction', assert => {
  assert.equal(calculate('5 2 -'), 3)
  assert.equal(calculate('5 1.99 -'), 3.01)
  assert.end()
})

test('it calculates multiplication', assert => {
  assert.equal(calculate('2 3 *'), 6)
  assert.equal(calculate('2 1.5 *'), 3)
  assert.end()
})

test('it calculates division', assert => {
  assert.equal(calculate('6 2 /'), 3)
  assert.equal(calculate('5 2 /'), 2.5)
  assert.end()
})

test('it calculates exponentiation', assert => {
  assert.equal(calculate('2 3 ^'), 8)
  assert.equal(calculate('2 5 ^'), 32)
  assert.end()
})

test('it calculates long expression', assert => {
  assert.equal(calculate('1 2 + 3 *'), 9)
  assert.equal(calculate('1 2 + 3 * 6 +'), 15)
  assert.equal(calculate('1 2 + 3 * 6 + 3 /'), 5) // ((1 + 2) * 3 + 6) / 3
  assert.equal(calculate('5 1 2 + 4 * + 3 -'), 14) // 5 + ((1 + 2) × 4) − 3
  assert.equal(calculate('1 2 3 4 * * *'), 24) // 1 * 2 * 3 * 4
  assert.end()
})
