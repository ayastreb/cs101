const stringHash = require('../StringHash')
/**
 * Hash table is basic data structure used to implement associative array,
 * mapping keys to values. It uses a hash function to compute an index of array
 * where value can be found.
 *
 * Application:
 * Hash table is widely used data structure due to its performance.
 * Hash tables are used to implement associative arrays, sets, caches,
 * database indexes etc.
 *
 * Usage:
 * const createHashTable = require('./HashTable')
 * const hashTable = createHashTable()
 * hashTable.set('A', 'B')
 * hashTable.get('A') // => 'B'
 * hashTable.remove('A') // => true
 * hashTable.get('A') // => null
 *
 * @param input
 * @param {Function} hashFunc
 */

// TODO: implement collision handling
module.exports = (hashFunc = stringHash) => {
  let length = 0
  let table = []

  return {
    size,
    set,
    get,
    remove
  }

  /**
   * Get hash table size.
   *
   * Performance: O(1)
   * @returns {Number}
   */
  function size () {
    return length
  }

  /**
   * Save `value` in hash table with `key`.
   *
   * Performance: O(1)
   * @param {String|Number} key
   * @param {*} value
   */
  function set (key, value) {
    validateKey(key)
    const index = hashFunc(key)
    if (table[ index ] === undefined) length++
    table[ index ] = {
      key: key,
      value: value
    }
  }

  /**
   * Retrieve value for given key.
   *
   * Performance: O(1)
   * @param {String|Number} key
   * @returns {*} value for given key or null if not found
   */
  function get (key) {
    validateKey(key)

    const index = hashFunc(key)
    if (table[ index ] !== undefined) return table[ index ].value

    return null
  }

  /**
   * Delete value for given key from hash table.
   *
   * Performance: O(1)
   * @param {String|Number} key
   * @returns {Boolean} true if value was found, false otherwise
   */
  function remove (key) {
    validateKey(key)

    const index = hashFunc(key)
    if (table[ index ] === undefined) return false
    table[ index ] = undefined
    length--
    return true
  }

  /**
   * Check that given key is either string or a number.
   *
   * @param {*} key
   */
  function validateKey (key) {
    if (typeof key === 'string' || typeof key === 'number') return

    throw TypeError('Key must be a string or a number.')
  }
}
