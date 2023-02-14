'use strict'
const toInsertArray = dog => {
    return [dog.id, dog.name, dog.breed, dog.length, dog.birth]
}

const toUpdateArray = dog => {
    return [dog.name, dog.breed, dog.length, dog.birth, dog.id,]

}

module.exports = { toInsertArray, toUpdateArray }