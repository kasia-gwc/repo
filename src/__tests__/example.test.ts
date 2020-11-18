import multiply, { printLastName, printMyName } from '../example'

describe('example file', () => {
  describe('multiply function', () => {
    test('should multiply 2 by 2 and output 4', () => {
      expect(multiply(2, 2)).toEqual(4)
    })

    test('should return 0 when 2nd param is greater than 10', () => {
      expect(multiply(2, 11)).toEqual(0)
    })
  })

  describe('printMyName function', () => {
    test('should print given username when initiates', () => {
      expect(printMyName('Brad')).toEqual('Mr Brad')
    })

    test('should return a friendly message when its null', () => {
      expect(printMyName(null)).toEqual('Please enter your name!')
    })
  })

  describe('printLastName function', () => {
    test('should print the last only given an array of names', () => {
      expect(printLastName(['John', 'Brad', 'Dev'])).toEqual('Dev')
    })
    test('should return a friendly message when array is empty', () => {
      expect(printLastName([])).toEqual('Please provide names!')
    })
  })
})
