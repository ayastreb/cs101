/**
 * Doubly linked list which stores key/value pairs and exposes internal nodes,
 * e.g. `find` returns a node and `remove` expects a node as an argument.
 */

class KeyValueLinkedList {
  constructor() {
    this.length = 0
    this.head
  }

  insert(key, value) {
    const node = new Node(key, value, this.head)
    if (this.head) this.head.prev = node
    this.head = node
    this.length++
  }

  find(key) {
    let current = this.head
    while (current && current.key !== key) {
      current = current.next
    }

    return current
  }

  remove(node) {
    if (!node) return false
    if (!node.prev) this.head = node.next
    if (node.prev) node.prev.next = node.next
    if (node.next) node.next.prev = node.prev
    this.length--
    return true
  }
  keys() {
    const keys = []
    let current = this.head
    while (current) {
      keys.push(current.key)
      current = current.next
    }

    return keys
  }
  values() {
    const values = []
    let current = this.head
    while (current) {
      values.push(current.value)
      current = current.next
    }

    return values
  }
}

class Node {
  constructor(key, value, next = undefined, prev = undefined) {
    this.key = key
    this.value = value
    this.prev = prev
    this.next = next
  }
}

module.exports = KeyValueLinkedList
