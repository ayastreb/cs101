class ExtendedSet {
  constructor(input = []) {
    this.table = {}
    this.size = 0
    for (const item of input) this.add(item)
  }

  /**
   * Check if item is present in set.
   *
   * Performance: O(1)
   * @param {*} item
   * @returns {boolean}
   */
  has(item) {
    return this.table[item] === true
  }

  /**
   * Add item to set.
   *
   * Performance: O(1)
   * @param {*} item
   */
  add(item) {
    if (this.has(item)) return
    this.table[item] = true
    this.size++
  }

  /**
   * Remove item from set.
   *
   * Performance: O(1)
   * @param {*} item
   */
  remove(item) {
    if (this.has(item)) {
      delete this.table[item]
      this.size--
    }
  }

  /**
   * Remove all items from set.
   *
   * Performance: O(1)
   */
  clear() {
    this.table = {}
    this.size = 0
  }

  /**
   * Return array of values from set.
   *
   * Performance: O(n)
   * @returns {Array}
   */
  values() {
    return Object.keys(this.table)
  }

  /**
   * Check if set includes given set.
   *
   * Performance: O(n)
   * @param {ExtendedSet} other
   * @returns {boolean}
   */
  includes(other) {
    for (const key of other) if (!this.has(key)) return false

    return true
  }

  /**
   * Check if set is a subset of given set.
   *
   * Performance: O(n)
   * @param {ExtendedSet} other
   * @returns {boolean}
   */
  isSubsetOf(other) {
    for (const key of this) if (!other.has(key)) return false

    return true
  }

  /**
   * Create new set with union of current and given sets.
   *
   * Performance: O(n)
   * @param {ExtendedSet} other
   * @returns {ExtendedSet}
   */
  union(other) {
    const setUnion = new ExtendedSet(this.values())
    for (let key of other) setUnion.add(key)

    return setUnion
  }

  /**
   * Create new set with intersection of current and given sets.
   *
   * Performance: O(n)
   * @param {ExtendedSet} other
   * @returns {ExtendedSet}
   */
  intersection(other) {
    const setIntersection = new ExtendedSet()
    for (let key of this) {
      if (other.has(key)) setIntersection.add(key)
    }

    return setIntersection
  }

  /**
   * Create new set with difference between current and given set.
   *
   * Performance: O(n)
   * @param {ExtendedSet} other
   * @returns {ExtendedSet}
   */
  difference(other) {
    const setDifference = new ExtendedSet()
    for (let key of this) {
      if (!other.has(key)) setDifference.add(key)
    }

    return setDifference
  }

  /**
   * Create new set with symmetric difference between current and given sets.
   *
   * Performance: O(n)
   * @param {ExtendedSet} other
   * @returns {ExtendedSet}
   */
  symmetricDifference(other) {
    return this.union(other).difference(this.intersection(other))
  }

  /**
   * Iterate over set.
   */
  *[Symbol.iterator]() {
    for (const key in this.table) {
      if (this.table.hasOwnProperty(key)) yield key
    }
  }
}

module.exports = ExtendedSet
