const a = [1, 2, 3, 4]

const b = Array(a.length)
console.log(b)
b.fill('?')
console.log(b)
console.log(b.join())
console.log(`values(${b.join(', ')})`)


console.log(Array(a.length).fill('?').join(', '))