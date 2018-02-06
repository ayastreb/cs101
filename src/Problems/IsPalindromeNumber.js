const test = require('tape')
/**
 * Check if given number is a palindrome, e.g. if it reads the same from left to right
 * and from right to left. Negative numbers are not palindromes.
 * Example:
 * 12321 is a palindrome
 * 12345 is not a palindrome
 *
 * @param {number} input
 * @return {boolean}
 */
function isPalindrome(input) {
  if (input < 0) return false
  const BASE = 10

  let left = Math.floor(Math.log10(input)) + 1
  let right = 1
  while (left > right) {
    if (digitAt(left) !== digitAt(right)) return false
    left--
    right++
  }

  return true

  /**
   * Get digit of input number at given position.
   * First take remainder of dividing input number by 10^postion.
   * Then divide the remainder by 10^(position - 1).
   * E.g.
   * input: 3845
   *
   * position: 1
   * remainder: 3845 % 10^1 = 3845 % 10 = 5
   * digit: 5 / 10^0 = 5 / 1 = 5
   *
   * position: 2
   * remainder: 3845 % 10^2 = 3845 % 100 = 45
   * digit: 45 / 10^1 = 45 / 10 = 4
   *
   * position: 3
   * remainder: 3845 % 10^3 = 3845 % 1000 = 845
   * digit: 845 / 10^2 = 845 / 100 = 8
   *
   * @param {number} position
   * @return {number}
   */
  function digitAt(position) {
    return Math.floor(
      (input % Math.pow(BASE, position)) / Math.pow(BASE, position - 1)
    )
  }
}

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
