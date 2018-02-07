const test = require('tape')
/**
 * Given an array of characters `chars` and a string `str`,
 * find the smallest substring of `str` containing all the characters in `chars`.
 *
 * Example:
 *
 * input:  chars = ['x','y','z'], str = "xyyzyzyx"
 * output: "zyx"
 *
 * input:  chars = ['a', 'b', 'b', 'a'], str = "ddcdabadddddbbeafa"
 * output: "bbeafa"
 *
 * Solution approach:
 * Using a sliding window technique expand right side until we cover all chars,
 * after that reduce left side and keep track of the shortest window length.
 *
 * @param {Array} chars
 * @param {String} str
 */
function getShortestWindowSubstring(chars, str) {
  let left = 0
  let start = 0
  let length = Infinity
  const charWindow = new CharWindow(chars)

  for (let right = 0; right < str.length; right++) {
    charWindow.insert(str[right])
    while (charWindow.isCovered()) {
      if (right - left < length) {
        start = left
        length = right - left
      }
      charWindow.remove(str[left])
      left++
    }
  }

  return length < Infinity ? str.substr(start, length + 1) : ''
}

class CharWindow {
  /**
   * Char window object keeps track of the chars currently in the window
   * and allows us to quickly check if current window covers all given chars.
   *
   * @param {Array} chars
   */
  constructor(chars) {
    this.total = chars.length
    this.map = new Map()
    for (const char of chars) {
      this.map.set(char, this.map.has(char) ? this.map.get(char) + 1 : 1)
    }
  }

  insert(char) {
    if (this.map.has(char)) {
      const count = this.map.get(char) - 1
      this.map.set(char, count)
      if (count >= 0) this.total--
    }
  }

  remove(char) {
    if (this.map.has(char)) {
      const count = this.map.get(char) + 1
      this.map.set(char, count)
      if (count > 0) this.total++
    }
  }

  isCovered() {
    return this.total === 0
  }
}

test('empty string', assert => {
  assert.equal(getShortestWindowSubstring(['A'], ''), '')
  assert.end()
})

test('finds no substring', assert => {
  assert.equal(getShortestWindowSubstring(['B'], 'ACD'), '')
  assert.equal(getShortestWindowSubstring(['A', 'B', 'C'], 'ABBBBBBBBBBD'), '')
  assert.end()
})

test('shortest substring is whole string', assert => {
  assert.equal(
    getShortestWindowSubstring(
      ['A', 'B', 'C', 'E', 'K', 'I'],
      'KADOBECODEBANCDDDEI'
    ),
    'KADOBECODEBANCDDDEI'
  )
  assert.end()
})

test('finds shortest substring with all chars', assert => {
  assert.equal(getShortestWindowSubstring(['x', 'y', 'z'], 'xyyzyzyx'), 'zyx')
  assert.equal(
    getShortestWindowSubstring(['A', 'B', 'C'], 'ADOBECODEBANCDDD'),
    'BANC'
  )
  assert.end()
})

test('finds shortest substring with duplicated chars', assert => {
  assert.equal(
    getShortestWindowSubstring(['A', 'B', 'B', 'C'], 'XABCDADDDACBDBF'),
    'ACBDB'
  )
  assert.equal(
    getShortestWindowSubstring(['a', 'b', 'b', 'a'], 'ddcdabadddddbbeafa'),
    'bbeafa'
  )
  assert.end()
})
