const test = require('tape')
/**
 * Normalize given path, e.g. convert "/a/b/../c/" to "/a/c"
 *
 * @param {String} input
 * @returns {String}
 */
function normalizePath(input) {
  const normalized = []
  for (const part of input.split('/')) {
    if (part === '..') {
      normalized.pop()
    } else if (part.length > 1 && part !== '.') {
      normalized.push(part)
    }
  }

  return '/' + normalized.join('/')
}

test('it normalizes path', assert => {
  assert.equal(normalizePath('/foo/./../bar/'), '/bar')
  assert.equal(
    normalizePath('/foo/../../../../bar/../baz/foo//./foo'),
    '/baz/foo/foo'
  )
  assert.end()
})
