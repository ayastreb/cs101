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
  let leftIndex = 0
  let rightIndex = 0
  while (sorted.length < left.length + right.length) {
    if (leftIndex === left.length || left[leftIndex] > right[rightIndex]) {
      sorted.push(right[rightIndex++])
    } else {
      sorted.push(left[leftIndex++])
    }
  }

  return sorted
}
