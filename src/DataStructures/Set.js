function createSet (input = []) {
  let table = {}
  let size = 0

  input.forEach(add)
  /** Public interface */
  return {
    get size () {
      return size
    },
    add,
    has,
    remove,
    clear,
    values,
    includes,
    isSubsetOf,
    union,
    intersection,
    difference,
    symmetricDifference,
    [Symbol.iterator]: iterator
  }

  /**
   * Add item to set.
   *
   * Performance: O(1)
   * @param {*} item
   */
  function add (item) {
    if (has(item)) return
    table[item] = true
    size++
  }

  /**
   * Check if item is present in set.
   *
   * Performance: O(1)
   * @param {*} item
   * @returns {boolean}
   */
  function has (item) {
    return table[item] === true
  }

  /**
   * Remove item from set.
   *
   * Performance: O(1)
   * @param {*} item
   */
  function remove (item) {
    if (has(item)) {
      delete table[item]
      size--
    }
  }

  /**
   * Remove all items from set.
   *
   * Performance: O(1)
   */
  function clear () {
    table = {}
    size = 0
  }

  /**
   * Return array of values from set.
   *
   * Performance: O(n)
   * @returns {Array}
   */
  function values () {
    return Object.keys(table)
  }

  /**
   * Check if set includes given set.
   *
   * Performance: O(n)
   * @param other
   * @returns {boolean}
   */
  function includes (other) {
    for (let key of other) {
      if (!has(key)) return false
    }
    return true
  }

  /**
   * Check if set is a subset of given set.
   *
   * Performance: O(n)
   * @param other
   * @returns {boolean}
   */
  function isSubsetOf (other) {
    for (let key of iterator()) {
      if (!other.has(key)) return false
    }
    return true
  }

  /**
   * Create new set with union of current and given sets.
   *
   * Performance: O(n)
   * @param other
   * @returns
   */
  function union (other) {
    const setUnion = createSet(values())
    for (let key of other) {
      setUnion.add(key)
    }

    return setUnion
  }

  /**
   * Create new set with intersection of current and given sets.
   *
   * Performance: O(n)
   * @param other
   * @returns
   */
  function intersection (other) {
    const setIntersection = createSet()
    for (let key of iterator()) {
      if (other.has(key)) setIntersection.add(key)
    }

    return setIntersection
  }

  /**
   * Create new set with difference between current and given set.
   *
   * Performance: O(n)
   * @param other
   * @returns
   */
  function difference (other) {
    const setDifference = createSet()
    for (let key of iterator()) {
      if (!other.has(key)) setDifference.add(key)
    }

    return setDifference
  }

  /**
   * Create new set with symmetric difference between current and given sets.
   *
   * Performance: O(n)
   * @param other
   * @returns {*}
   */
  function symmetricDifference (other) {
    return union(other).difference(intersection(other))
  }

  /**
   * Iterate over set.
   */
  function* iterator () {
    for (let key in table) {
      if (table.hasOwnProperty(key)) yield key
    }
  }
}

module.exports = createSet
