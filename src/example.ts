function multiply(a: number, b: number): number {
  if (b > 10) {
    return 0
  }
  return a * b
}

export const addition = (a: number, b: number): number => {
  return a + b
}

export const printMyName = (name: string | null): string => {
  if (name) {
    return `Mr ${name}`
  }
  return 'Please enter your name!'
}

export const printLastName = (names: string[]): string => {
  if (names.length === 0) {
    return 'Please provide names!'
  }
  return names[names.length - 1]
}

export const oddOrEven = (times: number): { threeAndFive: number; fourAndSix: number } => {
  let threeAndFive = 0
  let fourAndSix = 0
  for (let i = 0; i < times; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      threeAndFive++
    } else if (i % 4 === 0 && i % 6 === 0) {
      fourAndSix++
    }
  }
  return { threeAndFive, fourAndSix }
}

export const isPalindrome = (sentence: string): string[] => {
  const palindromes: string[] = []
  const words = sentence.split(' ') || []
  words.forEach(word => {
    const reversed: string = word.split('').reverse().join('')
    if (word.toLowerCase() === reversed.toLowerCase() && word.length > 2) {
      palindromes.push(word)
    }
  })
  return palindromes
}
const pal = isPalindrome('my name is Anna and I have got a Civic')
console.log(pal)

export default multiply
