const test = require('tape')

function recursive(n) {
  if (n === 0) return 0
  if (n === 1) return 1

  return recursive(n - 1) + recursive(n - 2)
}

function tailRecursive(limit) {
  function calculate(n = 0, f1 = 0, f2 = 1) {
    if (n === limit) return f1

    return calculate(n + 1, f2, f1 + f2)
  }

  return calculate()
}

runTestSuite(recursive)
runTestSuite(tailRecursive)

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
  assert.equal(tailRecursive(50), 12586269025)
  assert.end()
})
