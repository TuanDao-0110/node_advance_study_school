// 'use strict'
let inputField;
let messagearea
document.addEventListener('DOMContentLoaded', init)

function init() {
    inputField = document.getElementById('dogid')
    messagearea = document.getElementById('messagearea')
    document.getElementById('submit').addEventListener('click', send)
}
async function send() {
    clearMessage()
    let id = inputField.value
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        }
        const data = await fetch(`/remove`, options)
        const status = await data.json()
        if (status.message) {
            updateMessage(status.message, status.type)
        }
    } catch (error) {
        updateMessage(error.message, error.type)

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