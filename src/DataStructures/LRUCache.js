/**
 * Least recently used cache.
 * The least recently used element is evicted when cache capacity is reached.
 */
class LRUCache {
  /**
   * Create cache.
   *
   * @param {Number} capacity
   */
  constructor(capacity = 8) {
    this.queue = new Queue(capacity)
    this.map = new Map()
  }

  /**
   * Insert given data with given key.
   * If element already exists with given key, its value will be updated.
   * If element does not exists and cache is full - least recently used element
   * will be evicted before inserting given element.
   *
   * Complexity: O(1)
   * @param {*} key
   * @param {*} data
   */
  insert(key, data) {
    if (!this.map.has(key)) {
      if (this.queue.isFull()) this.map.delete(this.queue.evictLast())
      this.map.set(key, this.queue.insert(key, data))
    } else {
      const node = this.map.get(key)
      this.queue.moveToFront(node)
      node.data = data
    }
  }

  /**
   * Fetch element for given key.
   * If key is not found - null is returned.
   *
   * Complexity: O(1)
   * @param {*|null} key
   */
  fetch(key) {
    if (!this.map.has(key)) return null

    const node = this.map.get(key)
    this.queue.moveToFront(node)

    return node.data
  }

  /**
   * Return string representation of the cache with least recently used element on the left.
   *
   * @returns {String}
   */
  toString() {
    const output = []
    let node = this.queue.head
    while (node) {
      output.push(`[${node.key}:${node.data}]`)
      node = node.next
    }
    return output.reverse().join(',')
  }
}

/**
 * Queue to keep track of elements order.
 * Implemented as doubly-linked list.
 */
class Queue {
  constructor(capacity) {
    this.capacity = capacity
    this.size = 0
    this.head = null
    this.tail = null
  }

  isFull() {
    return this.size >= this.capacity
  }

  insert(key, data) {
    const node = new Node(key, data, this.head)
    if (this.head) this.head.prev = node
    if (this.tail === null) this.tail = node
    this.head = node
    this.size++

    return node
  }

  moveToFront(node) {
    if (node === this.head) return
    if (node === this.tail) this.tail = node.prev
    if (node.next) node.next.prev = node.prev

    node.prev.next = node.next
    node.prev = null
    node.next = this.head
    this.head.prev = node
    this.head = node
  }

  evictLast() {
    const node = this.tail
    if (node.prev) {
      node.prev.next = null
      this.tail = node.prev
      node.prev = null
    } else {
      this.head = null
      this.tail = null
    }
    this.size--

    return node.key
  }
}

class Node {
  constructor(key, data, next = null, prev = null) {
    this.key = key
    this.data = data
    this.next = next
    this.prev = prev
  }
}

module.exports = LRUCache
