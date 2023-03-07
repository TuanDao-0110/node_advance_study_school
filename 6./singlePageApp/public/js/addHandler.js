// 'use strict'

let idField
let nameField;
let breedField;
let lengthField
let birthField
let messagearea
document.addEventListener('DOMContentLoaded', init)



function init() {
    idField = document.getElementById('id')
    nameField = document.getElementById('name')
    breedField = document.getElementById("breed")
    lengthField = document.getElementById('length')
    birthField = document.getElementById('birth')
    messagearea = document.getElementById('messagearea')
    document.getElementById('submit').addEventListener('click', send)
}
async function send() {
    messagearea.innerHTML = ''
    const dog = {
        id: +idField.value,
        name: nameField.value,
        breed: breedField.value,
        length: lengthField.value,
        birth: +birthField.value
    }
    try {
        const options = {
            method: 'post',
            body: JSON.stringify(dog),
            headers: {
                'Content-Type': 'application/json'
            },
            // mode: 'cors'
        }
        // fetch and the rest here
        const data = await fetch('/add', options)
        const status = await data.json()
        if (status.message) {
            updateMessage(status.message, status.type)
        }

    } catch (error) {
        updateMessage(error.message, 'error')
    }
}

function updateMessage(message, type) {
    messagearea.textContent = message
    messagearea.setAttribute('class', type)
}
function clearMessage() {
    messagearea.textContent = '';
    messagearea.removeAttribute('class')
}

