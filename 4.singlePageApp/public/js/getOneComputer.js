
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
        try {
            const data = await fetch(`http://localhost:4000/api/computers/${computerid.value}`, {
                mode: 'cors',
            })
            const computer = await data.json()
            const tr = document.createElement('tr')
            tr.appendChild(createCell(computer[0].id))
            tr.appendChild(createCell(computer[0].name))
            tr.appendChild(createCell(computer[0].type))
            tr.appendChild(createCell(computer[0].processor))
            tr.appendChild(createCell(computer[0].amount))
            resultarea.appendChild(tr)
        } catch (error) {

        }
    }
    function createCell(data) {
        const td = document.createElement('td')
        td.textContent = data
        return td
    }
}())