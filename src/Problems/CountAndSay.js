const test = require('tape')
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
function countAndSay(n) {
  let result = '1'
  while (--n) result = countDigits(result)

  return result
}

function countDigits(input) {
  const output = []
  let index = 0
  while (index < input.length) {
    let counter = 0
    const digit = input[index]
    while (input[index] === digit) {
      counter++
      index++
    }
    output.push(`${counter}${digit}`)
  }

  return output.join('')
}

test('it counts digits in the string', assert => {
  assert.equal(countAndSay(1), '1')
  assert.equal(countAndSay(2), '11')
  assert.equal(countAndSay(3), '21')
  assert.equal(countAndSay(4), '1211')
  assert.equal(countAndSay(5), '111221')
  assert.equal(countAndSay(6), '312211')
  assert.equal(countAndSay(7), '13112221')
  assert.equal(countAndSay(8), '1113213211')
  assert.equal(countAndSay(9), '31131211131221')
  assert.equal(countAndSay(10), '13211311123113112211')
  assert.end()
})
