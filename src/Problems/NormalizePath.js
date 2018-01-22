/**
 * Normalize given path, e.g. convert "/a/b/../c/" to "/a/c"
 *
 * @param {String} input
 * @returns {String}
 */
module.exports = input => {
  const normalized = []
  for (const part of input.split('/')) {
    if (part === '..') {
      normalized.pop()
    } else if (part.length > 1 && part !== '.') {
      normalized.push(part)
    }
  }

  return '/' + normalized.join('/')
}
