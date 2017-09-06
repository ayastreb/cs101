const test = require('tape')
const fib = require('./Fibonacci')

runTestSuite(fib.recursive)
runTestSuite(fib.tailRecursive)

function runTestSuite(fn) {
  test(`${fn.name}: should return Fibonacci number`, assert => {
    assert.equal(fn(0), 0)
    assert.equal(fn(1), 1)
    assert.equal(fn(2), 1)
    assert.equal(fn(3), 2)
    assert.equal(fn(8), 21)
    assert.equal(fn(9), 34)
    assert.equal(fn(10), 55)
    assert.end()
  })
}

test('should return 50th number with tail recursion', assert => {
  assert.equal(fib.tailRecursive(50), 12586269025)
  assert.end()
})
