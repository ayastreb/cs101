/**
 * Break given string into words from given dictionary.
 * e.g. 'applepie' with dict {'apple', 'pie'} is broken into 'apple pie'.
 * If string can not be broken using given dict, return null.
 *
 * To solve this we split string into two parts: left and right, incrementally.
 * If left part is present in dict, we recursievely iterate on right part.
 * We also memoize a set of failed attempts, so that we don't recur on the same
 * input more than once.
 *
 * @param {string} string
 * @param {Set} dict
 */
module.exports = (string, dict) => {
  const failed = new Set()
  return breaker(string)

  function breaker(input) {
    if (dict.has(input)) return input
    if (failed.has(input)) return null

    for (let index = 1; index < input.length; index++) {
      let left = input.substr(0, index)
      if (dict.has(left)) {
        let right = breaker(input.substr(index))
        if (right) return `${left} ${right}`
      }
    }

    failed.add(input)
    return null
  }
}
