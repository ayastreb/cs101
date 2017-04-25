/**
 * Given a binary tree, print it vertically.
 * For example tree 'D', 'B', 'A', 'C', 'F', 'E', 'G' should be printed as:
 *
 *       (D)
 *    ┌---┴---┐
 *   (B)     (F)
 *  ┌-┴-┐   ┌-┴-┐
 * (A) (C) (E) (G)
 *
 * @param root
 * @returns {string}
 */
module.exports = root => {
  const whitespace = ' '

  return print(root).join('\n')

  /**
   * Recursively print node.
   * Output is array of strings, where each string represents tree level.
   *
   * @param node
   * @param height
   * @returns Array
   */
  function print (node, height) {
    if (height === undefined) height = getHeight(node)
    if (node === null) return fillEmptySpace(height)

    const output = []
    output.push(valueLine(node, height))
    output.push(flowLine(node, height))

    const leftPrint = print(node.left, height - 1)
    const rightPrint = print(node.right, height - 1)
    // glue each line of left and right subtree with a whitespace
    while (leftPrint.length > 0) {
      output.push(`${leftPrint.shift()}${whitespace}${rightPrint.shift()}`)
    }

    return output
  }

  function getHeight (node) {
    if (node === null) return 0

    return Math.max(getHeight(node.left), getHeight(node.right)) + 1
  }

  function fillEmptySpace (height) {
    const blankLine = whitespace.repeat(Math.pow(2, height + 1) - 1)

    return new Array(height * 2).fill(blankLine)
  }

  function valueLine (node, height) {
    const padding = whitespace.repeat(Math.pow(2, height) - 2)

    return `${padding}(${node.value})${padding}`
  }

  function flowLine (node, height) {
    const padding = whitespace.repeat(Math.pow(2, height - 1) - 1)
    const line = '-'.repeat(Math.pow(2, height - 1) - 1)
    const leftLine = node.left ? `┌${line}` : `${whitespace}${padding}`
    const rightLine = node.right ? `${line}┐` : `${whitespace}${padding}`

    return node.left || node.right
      ? `${padding}${leftLine}${flowLineSymbol(node)}${rightLine}${padding}`
      : whitespace.repeat(Math.pow(2, height + 1) - 1)
  }

  function flowLineSymbol (node) {
    if (node.left && node.right) return '┴'
    if (node.left && !node.right) return '┘'
    if (!node.left && node.right) return '└'
  }
}
