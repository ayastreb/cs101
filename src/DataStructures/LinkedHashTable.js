const stringHash = require('../StringHash')
const LinkedList = require('./KeyValueLinkedList')
/**
 * Hash table is basic data structure used to implement associative array,
 * mapping keys to values. It uses a hash function to compute an index of array
 * where value can be found. If different keys hash to the same index in array,
 * that is called a collusion.
 * This implementation uses linked lists for collusion resolution, e.g.
 * instead of writing the value directly to the table, it creates a linked list
 * and adds all values with the same key hash to the list.
 * See also LinearHashTable.js
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
    get size() {
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
  function set(key, value) {
    const bucket = getBucketFor(key)
    const node = bucket.find(key)
    if (node) {
      node.value = value
    } else {
      bucket.insert(key, value)
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
  function has(key) {
    return getBucketFor(key).find(key) !== undefined
  }

  /**
   * Retrieve value for given key.
   *
   * Performance: O(1)
   * @param {string|number} key
   * @returns {*} value for given key or null if not found
   */
  function get(key) {
    const node = getBucketFor(key).find(key)

    return node && node.value
  }

  /**
   * Delete value for given key from hash table.
   *
   * Performance: O(1)
   * @param {string|number} key
   * @returns {Boolean} true if value was found, false otherwise
   */
  function remove(key) {
    const bucket = getBucketFor(key)
    const node = bucket.find(key)
    if (!node) return false

    bucket.remove(node)
    size--
    resizeIfNeeded()
    return true
  }

  /**
   * Get the bucket (linked list) for given key
   *
   * @param {string|number} key
   * @returns {*} linked list
   */
  function getBucketFor(key) {
    if (typeof key !== 'string' && typeof key !== 'number') {
      throw TypeError('Key must be a string or a number.')
    }
    const index = hash(key) % dimension
    if (!table[index]) table[index] = new LinkedList()

    return table[index]
  }

  /**
   * Increase or decrease underlying table when load factor goes up or down.
   */
  function resizeIfNeeded() {
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
        table[i].keys().forEach(key => {
          const index = hash(key) % dimension
          if (!resized[index]) resized[index] = new LinkedList()
          resized[index].insert(key, table[i].find(key).value)
        })
      }
    }

    table = resized
  }

  function loadFactor() {
    return size / dimension
  }
}
