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
 * const createHashTable = require('./LinkedHashTable')
 * const hashTable = createHashTable()
 * hashTable.set('A', 'B')
 * hashTable.get('A') // => 'B'
 * hashTable.remove('A') // => true
 * hashTable.get('A') // => undefined
 *
 * @param {Function} hash
 */
module.exports = (hash = stringHash) => {
  const UPPER_LOAD_LIMIT = 0.75
  const LOWER_LOAD_LIMIT = 0.25

  let size = 0
  let dimension = 2
  let table = new Array(dimension)

  return {
    get size () {
      return size
    },
    set,
    has,
    get,
    remove
  }

  /**
   * Save `value` in hash table with `key`.
   *
   * Performance: O(1)
   * @param {string|number} key
   * @param {*} value
   */
  function set (key, value) {
    const index = indexOf(key)
    if (table[index] && table[index].key === key) {
      table[index].value = value
    } else {
      table[index] = { key, value }
      size++
      resizeIfNeeded()
    }
  }

  /**
   * Check if given key is present in hash table
   *
   * Performance: O(1)
   * @param {string|number} key
   * @returns {boolean}
   */
  function has (key) {
    const index = indexOf(key)

    return table[index] !== undefined
  }

  /**
   * Retrieve value for given key.
   *
   * Performance: O(1)
   * @param {string|number} key
   * @returns {*}
   */
  function get (key) {
    const index = indexOf(key)

    return table[index] && table[index].value
  }

  /**
   * Delete entry for given key.
   *
   * Performance: O(1)
   * @param {string|number} key
   */
  function remove (key) {
    let index = indexOf(key)
    if (table[index] === undefined) return false

    let next = index
    while (table[next] !== undefined) {
      let naturalNext = hash(table[next].key) % dimension
      if (naturalNext <= index || naturalNext > next) {
        table[index] = table[next]
        index = next
      }
      next = (next + 1) % dimension
    }
    table[index] = undefined
    size--
    resizeIfNeeded()
  }

  /**
   * Get position in hash table for given key.
   *
   * @param {string|number} key
   * @returns {number}
   */
  function indexOf (key) {
    if (typeof key !== 'string' && typeof key !== 'number') {
      throw TypeError('Key must be a string or a number.')
    }

    let index = hash(key) % dimension
    while (table[index] !== undefined) {
      if (table[index].key === key) return index
      index = (index + 1) % dimension
    }

    return index
  }

  /**
   * Increase or decrease underlying table when load factor goes up or down.
   */
  function resizeIfNeeded () {
    if (loadFactor() >= UPPER_LOAD_LIMIT) {
      dimension = dimension * 2
    } else if (loadFactor() < LOWER_LOAD_LIMIT) {
      dimension = dimension / 2
    } else {
      return
    }

    const resized = new Array(dimension)
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        let index = hash(table[i].key) % dimension
        while (resized[index] !== undefined) {
          index = (index + 1) % dimension
        }
        resized[index] = table[i]
      }
    }

    table = resized
  }

  function loadFactor () {
    return size / dimension
  }
}