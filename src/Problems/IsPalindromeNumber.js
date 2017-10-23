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
module.exports = input => {
  if (input < 0) return false
  const BASE = 10

  let left = countDigits(input)
  let right = 1
  while (left > right) {
    if (digitAt(left) !== digitAt(right)) return false
    left--
    right++
  }

  return true

  /**
   * Count how many digits there are in given number.
   *
   * @param {number} int
   * @return {number}
   */
  function countDigits(int) {
    let digits = 1
    while (int >= BASE) {
      digits++
      int = Math.floor(int / BASE)
    }

    return digits
  }

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
