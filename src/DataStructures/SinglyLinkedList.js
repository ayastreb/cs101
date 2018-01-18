/**
 * Singly Linked List is a linear data structure with sequential access.
 * List consists of nodes, where each node links to the next node in the list.
 * First node is called head, last node is called tail.
 *
 * Application:
 * Singly linked list can be used to represent any sequential data.
 * Singly linked list is often used to implement stacks and queues.
 * It can also be used in a Hash table implementation to store chain of items
 * that hash to the same position in the hash table.
 *
 * Advantages:
 * - constant time add/remove item from the beginning of the list
 * - constant time add to the end of the list
 * - less memory than Doubly Linked List
 * - simple implementation
 *
 * Disadvantages:
 * - linear time remove item from the end of the list
 * - linear time search of item in the list
 * - reverse traversing is impossible
 * - more memory than Array
 *
 * Usage:
 *
 * const SinglyLinkedList = require('./SinglyLinkedList')
 * const list = new SinglyLinkedList([ 'A', 'B', 'C' ]) // list = A->B->C
 * list.removeFirst() // => 'A', list = B->C
 * list.removeFirst() // => 'B', list = C
 * list.addLast('D')  // => list = C->D
 * list.find(1)       // => 'D'
 * list.removeFirst() // => 'C', list = D
 * list.removeLast()  // => 'D', list = null
 * list.removeLast()  // => throws RangeError when trying to remove from empty list
 */

class SinglyLinkedList {
  /**
   * Push all items of given array into the list.
   *
   * Performance: O(n)
   * @param {Array} input initial list data
   */
  constructor(input = []) {
    this.length = 0
    this.head = null
    this.tail = null

    for (const item of input) this.addLast(item)
  }

  get first() {
    return this.head ? this.head.data : null
  }

  get last() {
    return this.tail ? this.tail.data : null
  }

  /**
   * Find item at the given position from the beginning of the list.
   * Position is a 0-based index:
   * A->B->C->D
   * 0  1  2  3
   *
   * Performance: O(n)
   * @param {Number} index position of queried item
   * @returns {*}
   */
  find(index) {
    if (index >= this.length) {
      throw RangeError(`Index ${index} is out of range.`)
    }

    let current = this.head
    for (let i = 0; i < index; i++) current = current.next

    return current.data
  }

  /**
   * Add new item to the beginning of the list.
   *
   * Performance: O(1)
   * @param {*} item
   */
  addFirst(item) {
    this.head = new Node(item, this.head)
    if (this.tail === null) this.tail = this.head
    this.length++
  }

  /**
   * Add new item to the end of the list.
   *
   * Performance: O(1)
   * @param {*} item
   */
  addLast(item) {
    if (this.tail === null) return this.addFirst(item)
    const node = new Node(item)
    this.tail.next = node
    this.tail = node
    this.length++
  }

  /**
   * Remove and return item from the beginning of the list.
   *
   * Performance: O(1)
   * @returns {*}
   */
  removeFirst() {
    if (this.head === null) throw RangeError("Can't remove from empty list.")
    const item = this.head.data
    this.head = this.head.next
    if (this.head === null) this.tail = null
    this.length--

    return item
  }

  /**
   * Remove and return item from the end of the list.
   *
   * Performance: O(n)
   * @returns {*}
   */
  removeLast() {
    if (this.head === null) throw RangeError("Can't remove from empty list.")
    if (this.length === 1) return this.removeFirst()

    let previous
    let current = this.head
    while (current.next !== null) {
      previous = current
      current = current.next
    }
    previous.next = null
    this.length--

    return current.data
  }

  /**
   * Insert new item after given position.
   *
   * Performance: O(n)
   * @param {Number} index
   * @param {*} item
   */
  insertAfter(index, item) {
    if (index === 0) return this.addFirst(item)
    if (index === this.length) return this.addLast(item)
    if (index > this.length) throw RangeError(`Index ${index} is out of range.`)

    let previous
    let current = this.head
    for (let i = 0; i <= index; i++) {
      previous = current
      current = current.next
    }

    previous.next = new Node(item, current)
  }

  /**
   * Iterate over current list.
   */
  *[Symbol.iterator]() {
    let current = this.head
    while (current !== null) {
      yield current.data
      current = current.next
    }
  }
}

class Node {
  /**
   * Node container.
   *
   * @param {*} data
   * @param {Node} next
   */
  constructor(data, next = null) {
    this.data = data
    this.next = next
  }
}

module.exports = SinglyLinkedList
