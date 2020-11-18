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
  // write the logic below.
  // It should return the last child from the names array.
}

export default multiply
