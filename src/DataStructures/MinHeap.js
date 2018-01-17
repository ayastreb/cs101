class MinHeap {
  constructor(data = []) {
    this.data = [...data]
    let start = Math.floor(data.length / 2 - 1)
    while (start >= 0) siftDown(this.data, start--)
  }

  /**
   * Get length of the heap.
   *
   * Performance: O(1)
   * @return {number}
   */
  get length() {
    return this.data.length
  }

  /**
   * Return min element from the heap without removing it (peek).
   *
   * Performance: O(1)
   * @return {*|null}
   */
  findMin() {
    return this.length > 0 ? this.data[0] : null
  }

  /**
   * Add new item to the heap.
   * Item is added to the end of the heap and sieved up to its correct position.
   *
   * Performance: O(log(n))
   * @param {*} item
   */
  insert(item) {
    this.data.push(item)
    siftUp(this.data)
  }

  /**
   * Replace min item with given item in single pass.
   * Min item is replaced with given item, which is then sieved down to its correct position.
   *
   * Performance: O(log(n))
   * @param {*} item
   */
  replace(item) {
    this.data[0] = item
    siftDown(this.data)
  }

  /**
   * Extract min item from the heap.
   * Min item (first in heap) is replaced with the last item, which is than sieved
   * down to its correct position.
   *
   * Performance: O(log(n))
   * @return {*|null}
   */
  extractMin() {
    const minItem = this.findMin()
    if (this.length > 1) {
      this.data[0] = this.data.pop()
      siftDown(this.data)
    } else {
      this.data = []
    }

    return minItem
  }

  /**
   * Iterate over heap extracting min item in each step.
   */
  *[Symbol.iterator]() {
    while (this.length) yield this.extractMin()
  }
}

function siftUp(data, index = data.length - 1) {
  const parent = (index - (index % 2 === 0 ? 2 : 1)) / 2
  if (parent < 0 || data[parent] < data[index]) return

  swap(data, index, parent)
  siftUp(data, parent)
}

function siftDown(data, index = 0) {
  const left = index * 2 + 1
  const right = index * 2 + 2

  if (
    (left < data.length && data[index] > data[left]) ||
    (right < data.length && data[index] > data[right])
  ) {
    const smallestChild = data[left] > data[right] ? right : left
    swap(data, index, smallestChild)
    siftDown(data, smallestChild)
  }
}

function swap(data, from, to) {
  const tmp = data[from]
  data[from] = data[to]
  data[to] = tmp
}

module.exports = MinHeap
