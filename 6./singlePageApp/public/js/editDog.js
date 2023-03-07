(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let idField
    let nameField;
    let breedField;
    let lengthField
    let birthField
    let messagearea
    let resultarea = document.getElementById("resultarea")
    let submit = document.getElementById('submit')

    document.addEventListener('DOMContentLoaded', init)
    async function init() {
        try {
            await getDog()
            submit.addEventListener('click', hanldeEdit)
        } catch (error) {

        }
    }

    async function getDog() {
        try {
            const data = await fetch(`/getOne/${id}`, {
                mode: 'cors',
            })
            const dog = await data.json()
            let form = ''
            for (let i in dog[0]) {
                form += createCell(dog[0], i)
            }
            resultarea.innerHTML = form
        } catch (error) {

        }

    }
    function createCell(array, i) {
        let content = `<div>
                        <label> ${i}: <input ${i === id ? 'readonly' : ""} required type="text" id="${i}" value="${array[i]}" /></label>
                       </div>`
        return content
    }
    async function hanldeEdit() {
        idField = document.getElementById('id')
        nameField = document.getElementById('name')
        breedField = document.getElementById("breed")
        lengthField = document.getElementById('length')
        birthField = document.getElementById('birth')
        messagearea = document.getElementById('messagearea')
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
            }
            const data = await fetch(`/update/${id}`, options)
            const status = await data.json()
            if (status.message) {
                updateMessage(status.message, status.type)
            }
        } catch (error) {
            updateMessage(error.message, 'error')
        }
    }
    function updateMessage(message, type) {
        messagearea.textContent = message + ' back to menu'
        messagearea.setAttribute('class', type)
    }
}())