const a = 'hello' // assigning a value 'hello' in a var 'a'
let b //'b' - undefined

function printHelloWorld() { // creates a function called printHelloWorld which doesn't take any paramiters
  console.log('Hello world!') // 
}

function multiply(x, y) { //creatig a function 'multiply' that takes 2 paramiters
  return x * y // returning multiplication of 2 arguments
}

const numbers = [1, 2, 3] // creating a const 'numbers' which is an array of numbers

for (let i = 0; i < numbers.length; i++) { // i=0; i < 3; i increased by 1
  console.log(i * numbers[i]) // 0 * 1 = 0; 1*2=2; 2*3=6
}

const student = { 
  name: 'Jack',
  age: 15,
  height: 177,
}

const total = multiply(5 * 6) // total = 30

printHelloWorld()

b = student

console.log(b.name) // 'Jack'
b.name = 'Ahmad'
console.log(student.name)
console.log(total) // 30
b = Object.assign({}, student)
b.name = 'Ahmad'
let c = Object.assign({}, student)

const car = {
  name: 'Mercedes',
  year: 2019,
  running: function () {
    console.log('I am driving home for Christmas')
  },
  models: ['SX8', 'SX9'],
}
car.year = 2020
car.running()