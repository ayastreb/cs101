const test = require('tape')
/**
 * Generate all parentheses combinations for a given value `n` such that they are balanced.
 *
 * @param {Number} n
 * @returns {Array}
 */
function allValidParentheses(n) {
  const result = []
  const buffer = []
  generate()

  return result

  function generate(leftCount = 0, rightCount = 0) {
    if (leftCount === n && rightCount === n) {
      result.push(buffer.join(''))
    }

    if (leftCount < n) {
      buffer.push('{')
      generate(leftCount + 1, rightCount)
      buffer.pop()
    }

    if (rightCount < leftCount) {
      buffer.push('}')
      generate(leftCount, rightCount + 1)
      buffer.pop()
    }
  }
}

test('returns valid parentheses for 1', assert => {
  assert.deepEqual(allValidParentheses(1), ['{}'])
  assert.end()
})

test('returns valid parentheses for 2', assert => {
  assert.deepEqual(allValidParentheses(2), ['{{}}', '{}{}'])
  assert.end()
})

test('returns valid parentheses for 3', assert => {
  assert.deepEqual(allValidParentheses(3), [
    '{{{}}}',
    '{{}{}}',
    '{{}}{}',
    '{}{{}}',
    '{}{}{}'
  ])
  assert.end()
})
