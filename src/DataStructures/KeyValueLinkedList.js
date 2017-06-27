/**
 * Doubly linked list which stores key/value pairs and exposes internal nodes,
 * e.g. `find` returns a node and `remove` expects a node as an argument.
 */
module.exports = () => {
  let head
  let length = 0

  return {
    get length () {
      return length
    },
    insert: (key, value) => {
      const node = {
        next: head,
        prev: undefined,
        key,
        value
      }
      if (head) head.prev = node
      head = node
      length++
    },
    find: key => {
      let current = head
      while (current && current.key !== key) {
        current = current.next
      }

      return current
    },
    remove: node => {
      if (!node) return false
      if (!node.prev) head = node.next
      if (node.prev) node.prev.next = node.next
      if (node.next) node.next.prev = node.prev
      length--
      return true
    },
    keys: () => {
      const keys = []
      let current = head
      while (current) {
        keys.push(current.key)
        current = current.next
      }

      return keys
    },
    values: () => {
      const values = []
      let current = head
      while (current) {
        values.push(current.value)
        current = current.next
      }

      return values
    }
  }
}
