const test = require('tape')
const isPalindrome = require('./IsPalindromeNumber')

test('it validates number', assert => {
  assert.equal(isPalindrome(-2), false)
  assert.equal(isPalindrome(0), true)
  assert.equal(isPalindrome(9), true)
  assert.equal(isPalindrome(22), true)
  assert.equal(isPalindrome(121), true)
  assert.equal(isPalindrome(1001), true)
  assert.equal(isPalindrome(12321), true)
  assert.equal(isPalindrome(12344321), true)
  assert.equal(isPalindrome(123), false)

  assert.end()
})
