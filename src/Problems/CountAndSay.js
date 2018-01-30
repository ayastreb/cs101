/**
 * The count-and-say sequence is the sequence of integers beginning as follows:
 *
 * 1, 11, 21, 1211, 111221, ...
 *
 * 1 is read off as one 1 or 11.
 * 11 is read off as two 1s or 21.
 * 21 is read off as one 2, then one 1 or 1211.
 *
 * Given an integer n, generate the nth sequence.
 *
 * @param {Number} n
 * @returns {String}
 */
module.exports = n => {
  let result = '1'
  while (--n) result = countDigits(result)

  return result
}

function countDigits(input) {
  const count = []
  let index = 0
  while (index < input.length) {
    let counter = 0
    const digit = input[index]
    while (input[index] === digit) {
      counter++
      index++
    }
    count.push(`${counter}${digit}`)
  }

  return count.join('')
}
