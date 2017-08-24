/**
 * Given a head of linked list we need to return reversed list.
 *
 * @param head
 */
module.exports = {
  iterative: head => {
    let prev = null
    while (head) {
      let next = head.next
      head.next = prev
      prev = head
      head = next
    }

    return prev
  },
  recursive
}

function recursive (head, prev = null) {
  if (head === null) return prev

  let next = head.next
  head.next = prev
  return recursive(next, head)
}
