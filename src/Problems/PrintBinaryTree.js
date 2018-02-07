const test = require('tape')
const BinarySearchTree = require('../DataStructures/BinarySearchTree')
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
function printer(root) {
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
  function print(node, height) {
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

  function getHeight(node) {
    if (node === null) return 0

    return Math.max(getHeight(node.left), getHeight(node.right)) + 1
  }

  function fillEmptySpace(height) {
    const blankLine = whitespace.repeat(Math.pow(2, height + 1) - 1)

    return new Array(height * 2).fill(blankLine)
  }

  function valueLine(node, height) {
    const padding = whitespace.repeat(Math.pow(2, height) - 2)

    return `${padding}(${node.value})${padding}`
  }

  function flowLine(node, height) {
    const padding = whitespace.repeat(Math.pow(2, height - 1) - 1)
    const line = '-'.repeat(Math.pow(2, height - 1) - 1)
    const leftLine = node.left ? `┌${line}` : `${whitespace}${padding}`
    const rightLine = node.right ? `${line}┐` : `${whitespace}${padding}`

    return node.left || node.right
      ? `${padding}${leftLine}${flowLineSymbol(node)}${rightLine}${padding}`
      : whitespace.repeat(Math.pow(2, height + 1) - 1)
  }

  function flowLineSymbol(node) {
    if (node.left && node.right) return '┴'
    if (node.left && !node.right) return '┘'
    if (!node.left && node.right) return '└'
  }
}

test('pretty print binary tree', assert => {
  const tree = new BinarySearchTree('D')
  tree.insert('B')
  tree.insert('C')
  tree.insert('A')
  tree.insert('F')
  tree.insert('E')
  tree.insert('G')

  // prettier-ignore
  const expected =
`      (D)      
   ┌---┴---┐   
  (B)     (F)  
 ┌-┴-┐   ┌-┴-┐ 
(A) (C) (E) (G)
               `
  assert.equals(printer(tree), expected)
  assert.end()
})

test('pretty print skewed binary tree', assert => {
  const tree = new BinarySearchTree(5)
  tree.insert(0)
  tree.insert(3)
  tree.insert(2)
  tree.insert(4)
  tree.insert(1)
  tree.insert(6)
  tree.insert(7)
  tree.insert(8)
  tree.insert(9)

  // prettier-ignore
  const expected =
`                              (5)                              
               ┌---------------┴---------------┐               
              (0)                             (6)              
               └-------┐                       └-------┐       
                      (3)                             (7)      
                   ┌---┴---┐                           └---┐   
                  (2)     (4)                             (8)  
                 ┌-┘                                       └-┐ 
                (1)                                         (9)
                                                               `
  assert.equals(printer(tree), expected)
  assert.end()
})
