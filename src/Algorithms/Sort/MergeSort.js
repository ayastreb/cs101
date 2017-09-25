module.exports = mergeSort

function mergeSort(input) {
  if (input.length <= 1) return input
  const mid = Math.floor(input.length / 2)
  const left = mergeSort(input.slice(0, mid))
  const right = mergeSort(input.slice(mid))

  return merge(left, right)
}

function merge(left, right) {
  const sorted = []
  let pointerL = 0
  let pointerR = 0
  while (sorted.length < left.length + right.length) {
    if (pointerL === left.length || left[pointerL] > right[pointerR]) {
      sorted.push(right[pointerR])
      pointerR++
    } else {
      sorted.push(left[pointerL])
      pointerL++
    }
  }

  return sorted
}
