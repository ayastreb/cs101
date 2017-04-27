const test = require('tape')
const createBinarySearchTree = require('../DataStructures/BinarySearchTree')
const printer = require('./PrintBinaryTree')

test('pretty print binary tree', assert => {
  const tree = createBinarySearchTree('D')
  tree.insert('B')
  tree.insert('C')
  tree.insert('A')
  tree.insert('F')
  tree.insert('E')
  tree.insert('G')

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
  const tree = createBinarySearchTree(5)
  tree.insert(0)
  tree.insert(3)
  tree.insert(2)
  tree.insert(4)
  tree.insert(1)
  tree.insert(6)
  tree.insert(7)
  tree.insert(8)
  tree.insert(9)

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
