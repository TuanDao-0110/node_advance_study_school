
(function () {
    let resultarea;
    let messageare;
    let computerid
    document.addEventListener('DOMContentLoaded', init)
    async function init() {
        resultarea = document.getElementById('resultarea')
        messageare = document.getElementById('messagearea')
        computerid = document.getElementById('computerid')
        document.getElementById('submit')
            .addEventListener('click', send)
    }
    async function send() {
        clearMessage()
        resultarea.innerHTML = ''
        try {
            const data = await fetch(`http://localhost:4000/api/computers/${computerid.value}`, {
                mode: 'cors',
            })
            const computer = await data.json()
            if (computer) {
                if (computer.message) {
                    updateMessage(computer.message, computer.type)
                }
                else {

                    const tr = document.createElement('tr')
                    tr.appendChild(createCell(computer[0].id))
                    tr.appendChild(createCell(computer[0].name))
                    tr.appendChild(createCell(computer[0].type))
                    tr.appendChild(createCell(computer[0].processor))
                    tr.appendChild(createCell(computer[0].amount))
                    resultarea.appendChild(tr)
                }
            }
            // updateComputer(computer)
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
    function updateComputer(result) {
        if (result.length === 0) return;
        const computer = result[0]
        resultarea.innerHTML = `
        <p>
        <span class=legen>
        ID
        </span>
        ${computer.id}
        </p>
         <p>
        <span class=legen>
        ID
        </span>
        ${computer.name}
        </p>
         <p>
        <span class=legen>
        ID
        </span>
        ${computer.type}
        </p>
         <p>
        <span class=legen>
        ID
        </span>
        ${computer.processor}
        </p>
         <p>
        <span class=legen>
        ID
        </span>
        ${computer.amount}
        </p>
        `
    }

}())