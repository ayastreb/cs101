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
 * const HashTable = require('./LinkedHashTable')
 * const hashTable = new HashTable()
 * hashTable.set('A', 'B')
 * hashTable.get('A') // => 'B'
 * hashTable.remove('A') // => true
 * hashTable.get('A') // => undefined
 */
const UPPER_LOAD_LIMIT = 0.75
const LOWER_LOAD_LIMIT = 0.25

class LinkedHashTable {
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
    const bucket = this._getBucketFor(key)
    const node = bucket.find(key)
    if (node) {
      node.value = value
    } else {
      bucket.insert(key, value)
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
    return this._getBucketFor(key).find(key) !== undefined
  }

  /**
   * Retrieve value for given key.
   *
   * Performance: O(1)
   * @param {string|number} key
   * @returns {*} value for given key or null if not found
   */
  get(key) {
    const node = this._getBucketFor(key).find(key)

    return node && node.value
  }

  /**
   * Delete value for given key from hash table.
   *
   * Performance: O(1)
   * @param {string|number} key
   * @returns {Boolean} true if value was found, false otherwise
   */
  remove(key) {
    const bucket = this._getBucketFor(key)
    const node = bucket.find(key)
    if (!node) return false

    bucket.remove(node)
    this.size--
    this._resizeIfNeeded()
    return true
  }

  /**
   * Get the bucket (linked list) for given key
   *
   * @param {string|number} key
   * @returns {*} linked list
   */
  _getBucketFor(key) {
    if (typeof key !== 'string' && typeof key !== 'number') {
      throw TypeError('Key must be a string or a number.')
    }
    const index = this.hashFn(key) % this.dimension
    if (!this.table[index]) this.table[index] = new LinkedList()

    return this.table[index]
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
        this.table[i].keys().forEach(key => {
          const index = this.hashFn(key) % this.dimension
          if (!resized[index]) resized[index] = new LinkedList()
          resized[index].insert(key, this.table[i].find(key).value)
        })
      }
    }

    this.table = resized
  }
}

module.exports = LinkedHashTable
