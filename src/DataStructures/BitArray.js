const WORD_SIZE = 32
class BitArray {
  /**
   * Create new bit array of given bits length.
   * Bits are stored in words array, each word is an unsigned 32-bit integer.
   *
   * @param {number} length in bits
   */
  constructor(length = 0) {
    this.words = new Uint32Array(length >> 5)
  }

  /**
   * @returns {number} length in bits (number of words * 32)
   */
  get length() {
    return this.words.length * WORD_SIZE
  }

  /**
   * Toggle bit at given position.
   *
   * @param {number} position
   */
  toggle(position) {
    const index = this._getIndex(position)
    this.words[index] ^= 1 << position
  }

  /**
   * Set but at given position to either true or false.
   *
   * @param {number} position
   * @param {boolean} value
   */
  set(position, value) {
    const index = this._getIndex(position)
    if (value) {
      this.words[index] |= 1 << position
    } else {
      this.words[index] &= ~(1 << position)
    }
  }

  /**
   * Check if bit at given position is set.
   *
   * @param {number} position
   * @returns {boolean}
   */
  get(position) {
    return ((this.words[position >> 5] >> position) & 1) !== 0
  }

  /**
   * Create inversion of current bit array (flip each bit), e.g. "logical NOT"
   *
   * @returns {BitArray}
   */
  not() {
    const result = new BitArray(this.length)
    for (let index = 0; index < this.words.length; index++) {
      result.words[index] = ~this.words[index]
    }

    return result
  }

  /**
   * Create new bit array where bits are set only if they are set in both arrays,
   * e.g. "logical AND"
   *
   * @param {BitArray} other
   * @returns {BitArray}
   */
  and(other) {
    const shorter = this.length < other.length ? this : other
    const longer = this.length < other.length ? other : this
    const result = new BitArray(shorter.length)
    for (let index = 0; index < result.words.length; index++) {
      result.words[index] = shorter.words[index] & longer.words[index]
    }

    return result
  }

  /**
   * Create new bit array where bits are set if they are set in either of both
   * arrays, e.g. "logical OR"
   *
   * @param {BitArray} other
   * @returns {BitArray}
   */
  or(other) {
    const maxLength = this.length > other.length ? this.length : other.length
    const result = new BitArray(maxLength)
    for (let index = 0; index < result.words.length; index++) {
      result.words[index] = this.words[index] | other.words[index]
    }

    return result
  }

  /**
   * Create new bit array where bits are set only if they are set in one of both
   * arrays, e.g. "logical exclusive OR"
   *
   * @param {BitArray} other
   * @returns {BitArray}
   */
  xor(other) {
    const maxLength = this.length > other.length ? this.length : other.length
    const result = new BitArray(maxLength)
    for (let index = 0; index < result.words.length; index++) {
      result.words[index] = this.words[index] ^ other.words[index]
    }

    return result
  }

  /**
   * Return string representation of current bit array.
   *
   * @param {boolean} skipLeadingZero
   * @returns {string}
   */
  toString(skipLeadingZero = false) {
    let string = ''
    for (let index = this.words.length - 1; index >= 0; index--) {
      for (let position = WORD_SIZE - 1; position >= 0; position--) {
        const isBitSet = ((this.words[index] >> position) & 1) !== 0
        if (skipLeadingZero && string.length === 0 && !isBitSet) continue
        string += isBitSet ? '1' : '0'
      }
    }

    return string
  }

  *[Symbol.iterator]() {
    for (let position = this.length - 1; position >= 0; position--) {
      yield this.get(position)
    }
  }

  /**
   * Create new bit array from given binary string.
   *
   * @param {string} string
   * @returns BitArray
   */
  static fromString(string) {
    let start = 0
    let end = string.length % WORD_SIZE
    const parsedWords = []
    while (end <= string.length) {
      parsedWords.push(parseInt(string.substr(start, end), 2))
      start = end
      end += WORD_SIZE
    }

    const array = new BitArray(parsedWords.length * WORD_SIZE)
    array.words.set(parsedWords.reverse())

    return array
  }

  /**
   * Get index of word where bit with given position should be.
   * Grow words array size if needed.
   *
   * @param {number} position
   * @returns {number}
   * @private
   */
  _getIndex(position) {
    const index = position >> 5
    if (index >= this.words.length) {
      let resized = new Uint32Array(index + 1)
      resized.set(this.words)
      this.words = resized
    }

    return index
  }
}

module.exports = BitArray
