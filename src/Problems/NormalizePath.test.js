const test = require('tape')
const normalize = require('./NormalizePath')

test('it normalizes path', assert => {
  assert.equal(normalize('/foo/./../bar/'), '/bar')
  assert.equal(
    normalize('/foo/../../../../bar/../baz/foo//./foo'),
    '/baz/foo/foo'
  )
  assert.end()
})
