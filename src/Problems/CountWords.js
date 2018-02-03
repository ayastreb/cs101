/**
 * Implement a document scanning function, which receives a string input
 * and returns a list of all unique words in it and their number of occurrences,
 * sorted by the number of occurrences in a descending order.
 *
 * @param {String} input
 * @returns {Array}
 */
module.exports = input => {
  const result = []
  const words = tokenize(input)
  const counter = countFrequency(words)

  return result.concat(...sortByFrequency(counter))
}

/**
 * Cleanup input and split it into words.
 *
 * @param {String} input
 * @returns {Array}
 */
function tokenize(input) {
  return input
    .replace(/[^0-9a-z\s]/gi, '')
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 0)
}

/**
 * Count frequency of eqch unique word in given array.
 *
 * @param {Array} words
 * @returns {Map}
 */
function countFrequency(words) {
  const counter = new Map()
  for (const word of words) {
    counter.set(word, counter.has(word) ? counter.get(word) + 1 : 1)
  }

  return counter
}

/**
 * Sort frequency map using frequency as index in sorted array (like bucket/count sort).
 *
 * @param {Map} map
 * @returns {Array}
 */
function sortByFrequency(map) {
  const sorted = []
  for (const [word, count] of map) {
    if (sorted[count] === undefined) sorted[count] = []
    sorted[count].push([word, count.toString()])
  }

  return sorted.filter(Array.isArray).reverse()
}
