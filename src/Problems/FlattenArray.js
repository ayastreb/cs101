function flatten(input) {
  const flat = []
  input.forEach(item => {
    if (Array.isArray(item)) {
      flat.push(...flatten(item))
    } else {
      flat.push(item)
    }
  })

  return flat
}

module.exports = flatten
