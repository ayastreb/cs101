const test = require('tape')
const isPalindrome = require('./IsPalindrome')

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
  assert.equal(isPalindrome('a!b: b a'), true)
  assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true)
  assert.equal(isPalindrome('race a car'), false)
  assert.end()
})
