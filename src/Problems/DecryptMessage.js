const test = require('tape')
/**
 * Input consist of lowercase latin letters only, and  is encrypted separately as follows:
 * Convert every letter to its ASCII value.
 * Add 1 to the first letter, and then for every letter from the second one to the last one,
 * add the value of the previous letter.
 * Subtract 26 from every letter until it is in the range of lowercase letters a-z in ASCII.
 * Convert the values back to letters.
 *
 * @param {String} word
 * @returns {String}
 */
function decrypt(word) {
  const lowestCode = asciiCode('a')
  const alphabetLength = asciiCode('z') - lowestCode + 1
  const output = []
  let prev = 1
  for (const char of word) {
    let code = asciiCode(char) - prev
    code += Math.ceil((lowestCode - code) / alphabetLength) * alphabetLength
    prev += code
    output.push(String.fromCharCode(code))
  }

  return output.join('')
}

function asciiCode(char) {
  return char.charCodeAt(0)
}

test('decrypt string', assert => {
  assert.equal(decrypt('dnotq'), 'crime')
  assert.equal(decrypt('flgxswdliefy'), 'encyclopedia')
  assert.equal(
    decrypt('bvqmjhgghjmqvbiqzjugthwmdv'),
    'abcdefghijklmnopqrstuvwxyz'
  )
  assert.end()
})
