const test = require('tape')
/**
 * Break given string into words from given dictionary.
 * e.g. 'applepie' with dict {'apple', 'pie'} is broken into 'apple pie'.
 * If string can not be broken using given dict, return null.
 *
 * To solve this we split string into two parts: left and right, incrementally.
 * If left part is present in dict, we recursievely iterate on right part.
 * We also memoize a set of failed attempts, so that we don't recur on the same
 * input more than once.
 *
 * @param {String} string
 * @param {Set} dict
 * @returns {String}
 */
function wordBreak(string, dict) {
  const failed = new Set()
  return breaker(string)

  function breaker(input) {
    if (dict.has(input)) return input
    if (failed.has(input)) return null

    for (let index = 1; index < input.length; index++) {
      let left = input.substr(0, index)
      if (dict.has(left)) {
        let right = breaker(input.substr(index))
        if (right) return `${left} ${right}`
      }
    }

    failed.add(input)
    return null
  }
}

test('return null if not found', assert => {
  const string = 'applepie'
  const dict = new Set(['orange', 'apple', 'cookie'])
  assert.equal(wordBreak(string, dict), null)
  assert.end()
})

test('break one word', assert => {
  const string = 'apple'
  const dict = new Set(['orange', 'apple', 'banana'])
  assert.equal(wordBreak(string, dict), 'apple')
  assert.end()
})

test('break two words', assert => {
  const string = 'applepie'
  const dict = new Set(['apple', 'banana', 'pie'])
  assert.equal(wordBreak(string, dict), 'apple pie')
  assert.end()
})

test('break mulptiple words', assert => {
  const string = 'peanutbutterjelly'
  const dict = new Set(['apple', 'butter', 'jelly', 'peanut'])
  assert.equal(wordBreak(string, dict), 'peanut butter jelly')
  assert.end()
})

test('backrtacking issue', assert => {
  const string = 'aaaaaaab'
  const dict = new Set(['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa'])
  assert.equal(wordBreak(string, dict), null)
  assert.end()
})
