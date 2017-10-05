const findNext = require('./BinarySearchNext')

/**
 * Given a string `input` and a set of words `dict`,
 * find the longest word in `dict` that is a subsequence of `input`.
 *
 * @param {string} input
 * @param {array|Set} dict
 * @return {string}
 */
module.exports = (input, dict) => {
  const positions = getCharPositionsMap()
  let longest = ''

  for (const word of dict) {
    if (word.length > longest.length && isSubsequence(word)) longest = word
  }

  return longest

  function isSubsequence(word) {
    let inputIndex = -1
    for (let wordIndex = 0; wordIndex < word.length; wordIndex++) {
      const char = word.charAt(wordIndex)
      inputIndex = findNext(inputIndex, positions.get(char))
      if (inputIndex === -1) return false
    }
    return true
  }

  function getCharPositionsMap() {
    const position = new Map()
    for (let index = 0; index < input.length; index++) {
      const char = input.charAt(index)
      const list = position.get(char) || []
      list.push(index)
      position.set(char, list)
    }

    return position
  }
}
