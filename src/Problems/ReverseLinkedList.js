const createStack = require('../DataStructures/Stack')
const createLinkedList = require('../DataStructures/SinglyLinkedList')
/**
 * Given a linked list we need to return reversed list.
 *
 * @param list
 */
module.exports = list => {
  const reversed = createLinkedList()
  const stack = createStack()

  for (let item of list) {
    stack.push(item)
  }

  while (stack.length > 0) {
    reversed.addLast(stack.pop())
  }

  return reversed
}
