/**
 * Given a head of linked list we need to find if there's a loop, and if so
 * return the node where loop starts.
 *
 * This problem can be solved using Floyd's (tortoise & hare) cycle-finding algorithm.
 */
module.exports = head => {
  let slow = head
  let fast = head
  let hasLoop = false

  while (slow && fast && fast.next && !hasLoop) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      hasLoop = true
    }
  }

  if (!hasLoop) return null

  slow = head
  while (slow !== fast) {
    slow = slow.next
    fast = fast.next
  }

  return slow
}
