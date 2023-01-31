'use strict'
console.log(process.argv)


console.log('number of args', process.argv.length)
console.log(process.argv[2])
const [, , ...other] = process.argv
console.log(other)


let sum = 0
for (const i of other) {
    sum += Number(i)
}

console.log(`sum: ${sum}`)