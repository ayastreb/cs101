const stringHash = require('../StringHash')
/**
 * Hash table is basic data structure used to implement associative array,
 * mapping keys to values. It uses a hash function to compute an index of array
 * where value can be found. If different keys hash to the same index in array,
 * that is called a collusion.
 * This implementation uses linked probing (open addressing) for collusion resolution, e.g.
 * if collision occurs and the cell is already occupied, it searches for the
 * next closest free location and inserts the key there.
 * See also LinkedHashTable.js
 *
 * Application:
 * Hash table is widely used data structure due to its performance.
 * Hash tables are used to implement associative arrays, sets, caches,
 * database indexes etc.
 *
 * Usage:
 * const HashTable = require('./LinearHashTable')
 * const hashTable = HashTable()
 * hashTable.set('A', 'B')
 * hashTable.get('A') // => 'B'
 * hashTable.remove('A') // => true
 * hashTable.get('A') // => undefined
 */
const UPPER_LOAD_LIMIT = 0.75
const LOWER_LOAD_LIMIT = 0.25

class LinearHashTable {
  /**
   * Create hash table with given hash function.
   * StringHash used by default.
   *
   * @param {Function} hashFn
   */
  constructor(hashFn = stringHash) {
    this.hashFn = hashFn
    this.size = 0
    this.dimension = 2
    this.table = new Array(this.dimension)
  }

  /**
   * Save `value` in hash table with `key`.
   *
   * Performance: O(1)
   * @param {string|number} key
   * @param {*} value
   */
  set(key, value) {
    const index = this._indexOf(key)
    if (this.table[index] && this.table[index].key === key) {
      this.table[index].value = value
    } else {
      this.table[index] = { key, value }
      this.size++
      this._resizeIfNeeded()
    }
  }

  /**
   * Check if given key is present in hash table
   *
   * Performance: O(1)
   * @param {string|number} key
   * @returns {boolean}
   */
  has(key) {
    const index = this._indexOf(key)

    return this.table[index] !== undefined
  }

  /**
   * Retrieve value for given key.
   *
   * Performance: O(1)
   * @param {string|number} key
   * @returns {*}
   */
  get(key) {
    const index = this._indexOf(key)

    return this.table[index] && this.table[index].value
  }

  /**
   * Delete entry for given key.
   *
   * Performance: O(1)
   * @param {string|number} key
   */
  remove(key) {
    let index = this._indexOf(key)
    if (this.table[index] === undefined) return false

    let next = index
    while (this.table[next] !== undefined) {
      let naturalNext = this.hashFn(this.table[next].key) % this.dimension
      if (naturalNext <= index || naturalNext > next) {
        this.table[index] = this.table[next]
        index = next
      }
      next = (next + 1) % this.dimension
    }
    this.table[index] = undefined
    this.size--
    this._resizeIfNeeded()
  }

  /**
   * Get position in hash table for given key.
   *
   * @param {string|number} key
   * @returns {number}
   */
  _indexOf(key) {
    if (typeof key !== 'string' && typeof key !== 'number') {
      throw TypeError('Key must be a string or a number.')
    }

    let index = this.hashFn(key) % this.dimension
    while (this.table[index] !== undefined) {
      if (this.table[index].key === key) return index
      index = (index + 1) % this.dimension
    }

    return index
  }

  /**
   * Increase or decrease underlying table when load factor goes up or down.
   */
  _resizeIfNeeded() {
    const loadFactor = this.size / this.dimension
    if (loadFactor >= UPPER_LOAD_LIMIT) {
      this.dimension *= 2
    } else if (loadFactor < LOWER_LOAD_LIMIT) {
      this.dimension /= 2
    } else {
      return
    }

    const resized = new Array(this.dimension)
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i] !== undefined) {
        let index = this.hashFn(this.table[i].key) % this.dimension
        while (resized[index] !== undefined) {
          index = (index + 1) % this.dimension
        }
        resized[index] = this.table[i]
      }
    }

    this.table = resized
  }
}

module.exports = LinearHashTable
