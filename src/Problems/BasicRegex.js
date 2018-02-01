/**
 * Check if given pattern matches the text with suppor for '.' and '*' symbols.
 * '.' is treated as a single a character wildcard,
 * and '*' is matched for a zero or more sequence of the previous letter.
 *
 * @param {String} text
 * @param {String} pattern
 * @returns {Boolean}
 */
module.exports = (text, pattern) => {
  let tIndex = 0
  let pIndex = 0
  while (tIndex < text.length || pIndex < pattern.length) {
    if (pattern[pIndex + 1] === '*') {
      const lookFor = pattern[pIndex] === '.' ? text[tIndex] : pattern[pIndex]
      while (tIndex < text.length && text[tIndex] === lookFor) tIndex++
      pIndex += 2
    } else if (pattern[pIndex] === '.' || pattern[pIndex] === text[tIndex]) {
      tIndex++
      pIndex++
    } else {
      return false
    }
  }

  return true
}
