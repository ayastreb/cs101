const test = require('tape')
const check = require('./CheckParentheses')

test('it returns true for balanced input', assert => {
  assert.equal(check('(())'), true)
  assert.equal(check('((())())()'), true)
  assert.equal(check('(a + b) + ((2 * 3) + 5)'), true)
  assert.equal(check('2 + 2'), true)
  assert.end()
})

test('it returns position of first offender for unbalanced input', assert => {
  assert.equal(check(')()'), 0)
  assert.equal(check('())'), 2)
  assert.equal(check('(())(()('), 5)
  assert.equal(check('(a + b) / ((2 * 3)'), 11)
  assert.equal()
  assert.end()
})
