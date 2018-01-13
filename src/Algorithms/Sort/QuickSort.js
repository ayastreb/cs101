module.exports = quickSort

function quickSort(input, lo = 0, hi = input.length - 1) {
  if (hi - lo > 0) {
    const pivot = partition(input, lo, hi)
    quickSort(input, lo, pivot - 1)
    quickSort(input, pivot + 1, hi)
  }

  return input
}

function partition(input, lo, hi) {
  const pivot = hi
  let firstHigh = lo
  for (let i = lo; i < hi; i++) {
    if (input[i] < input[pivot]) {
      swap(input, i, firstHigh)
      firstHigh++
    }
  }
  swap(input, pivot, firstHigh)

  return firstHigh
}

function swap(input, left, right) {
  if (left === right) return
  let tmp = input[left]
  input[left] = input[right]
  input[right] = tmp
}
