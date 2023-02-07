'use strict'
// "insert into computer (id,name,type,processor,amount from computer)",
const toInsertArray = computer => {
    return [computer.id, computer.name, computer.type, computer.processor, computer.amount]
}

const toUpdateArray = computer => {
    // return +computer.id, computer.name, computer.type, computer.processor, +computer.amount, +computer.id
    return [computer.name, computer.type, computer.processor, computer.amount, computer.id,]

}

module.exports = { toInsertArray, toUpdateArray }