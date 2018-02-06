const test = require('tape')
/**
 * Check if given string is a palindrome, e.g. if it reads the same from both ends.
 *
 * @param {String} input
 * @returns {Boolean}
 */
function isPalindrome(input) {
  if (input.length <= 1) return true

  let left = 0
  let right = input.length - 1
  let isChar = /[a-z0-9]/i
  const inputLower = input.toLowerCase()
  while (left < right) {
    if (inputLower[left].match(isChar) && inputLower[right].match(isChar)) {
      if (inputLower[left] !== inputLower[right]) return false
      left++
      right--
    } else if (!inputLower[left].match(isChar)) {
      left++
    } else {
      right--
    }
  }
  return true
}

test('empty string is palindrome', assert => {
  assert.equal(isPalindrome(''), true)
  assert.end()
})

test('single char string is palindrome', assert => {
  assert.equal(isPalindrome('a'), true)
  assert.end()
})

test('validates palindrome', assert => {
  assert.equal(isPalindrome('abba'), true)
  assert.equal(isPalindrome('race a car'), false)
  assert.end()
})

test('ignores punctuation chars', assert => {
  assert.equal(isPalindrome('a!b: b a'), true)
  assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true)
  assert.end()
})
