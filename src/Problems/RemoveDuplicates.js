/**
 * Convert string to array, create set based on that array and convert set back to string.
 *
 * @param {String} input
 * @returns {String}
 */
function removeOneliner(input) {
  return [...new Set(input.split(''))].join('')
}

/**
 * Keep read and write indexes and check if we've already seen the char before writing.
 *
 * @param {String} input
 * @returns {String}
 */
function removeWithLinearSpace(input) {
  const unique = {}
  let writeIndex = 0
  input = input.split('')
  for (let readIndex = 0; readIndex < input.length; readIndex++) {
    if (!unique[input[readIndex]]) {
      input[writeIndex++] = input[readIndex]
      unique[input[readIndex]] = true
    }
  }

  return input.slice(0, writeIndex).join('')
}

/**
 * For every new char we check all chars before it to see if it's unique.
 *
 * @param {String} input
 * @returns {String}
 */
function removeWithConstantSpace(input) {
  let writeIndex = 0
  input = input.split('')
  for (let readIndex = 0; readIndex < input.length; readIndex++) {
    let isUnique = true
    for (let i = 0; i < readIndex && isUnique; i++) {
      if (input[i] === input[readIndex]) isUnique = false
    }
    if (isUnique) input[writeIndex++] = input[readIndex]
  }

  return input.slice(0, writeIndex).join('')
}

module.exports = {
  removeOneliner,
  removeWithLinearSpace,
  removeWithConstantSpace
}
