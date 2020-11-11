const a = 'hello'
let b

function printHelloWorld() {
  console.log('Hello world!')
}

function multiply(x, y) {
  return x * y
}

const numbers = [1, 2, 3]

for (let i = 0; i < numbers.length; i++) {
  console.log(i * numbers[i])
}

const student = {
  name: 'Jack',
  age: 15,
  height: 177,
}

const total = multiply(5 * 6)

printHelloWorld()

b = student

console.log(b.name)

console.log(total)