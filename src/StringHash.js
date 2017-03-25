/**
 * Fast string hash function.
 *
 * @see https://github.com/darkskyapp/string-hash
 * @param {String} input
 * @returns {Number}
 */
module.exports = input => {
  let hash = 5381
  let position = input.length

  while (position) {
    hash = (hash * 33) ^ input.charCodeAt(--position)
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bit shift. */
  return hash >>> 0
}
