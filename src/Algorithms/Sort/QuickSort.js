module.exports = quickSort

function quickSort(input, left = 0, right = input.length - 1) {
  if (input.length > 1) {
    const pivot = partition(input, left, right)
    if (left < pivot - 1) quickSort(input, left, pivot - 1)
    if (pivot < right) quickSort(input, pivot, right)
  }

  return input
}

function partition(array, left, right) {
  const pivot = array[Math.floor((left + right) / 2)]
  while (left <= right) {
    while (array[left] < pivot) left++
    while (array[right] > pivot) right--

    if (left <= right) {
      swap(array, left, right)
      left++
      right--
    }
  }

  return left
}

function swap(array, left, right) {
  if (left === right) return
  let tmp = array[left]
  array[left] = array[right]
  array[right] = tmp
}
