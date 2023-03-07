
(function () {
    let resultarea;
    let messageare;
    let dogid
    document.addEventListener('DOMContentLoaded', init)
    async function init() {
        resultarea = document.getElementById('resultarea')
        messageare = document.getElementById('messagearea')
        dogid = document.getElementById('dogid')
        document.getElementById('submit')
            .addEventListener('click', send)
    }
    async function send() {
        clearMessage()
        resultarea.innerHTML = ''
        if (dogid.value.trim().length === 0) {
            return updateMessage('no id')
        }
        try {
            const data = await fetch(`/getOne/${dogid.value}`, {
                mode: 'cors',
            })
            const dog = await data.json()
            if (dog) {
                if (dog.message) {
                    updateMessage(dog.message, dog.type)
                }
                else {

                    const tr = document.createElement('tr')
                    tr.appendChild(createCell(dog[0].id))
                    tr.appendChild(createCell(dog[0].name))
                    tr.appendChild(createCell(dog[0].breed))
                    tr.appendChild(createCell(dog[0].length))
                    tr.appendChild(createCell(dog[0].birth))
                    resultarea.appendChild(tr)
                }
            }
        } catch (error) {
            updateMessage(`not found ${error.message}`, 'error')
        }
    }
    function createCell(data) {
        const td = document.createElement('td')
        td.textContent = data
        return td
    }
    function updateMessage(message, type) {
        messageare.textContent = message
        messageare.setAttribute('class', type)
    }
    function clearMessage() {
        messageare.textContent = '';
        messageare.removeAttribute('class')
    }


}())