/**
 * Check if given linked list is a plaindrome.
 *
 * @param {Object} head
 */
module.exports = head => {
  let fast = head
  let slow = head
  const stack = []

  while (fast && fast.next) {
    stack.push(slow.data)
    slow = slow.next
    fast = fast.next.next
  }
  // odd-length linked list
  if (fast) slow = slow.next

  while (slow) {
    if (stack.pop() !== slow.data) return false
    slow = slow.next
  }

  return true
}
