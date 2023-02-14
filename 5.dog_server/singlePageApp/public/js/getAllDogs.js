// 'use strict'
(function () {
    document.addEventListener('DOMContentLoaded', init)
    async function init() {
        try {
            const data = await fetch('http://localhost:4000/api/dog')
            const dogs = await data.json()
            const resultset = document.getElementById('resultset')
            for (const dog of dogs) {
                const tr = document.createElement('tr')
                const linkToEdit = document.createElement('a')
                // linkToEdit.appendChild(document.createElement('button').innerHTML = 'edit')
                linkToEdit.textContent = 'edit'
                linkToEdit.setAttribute('href', `/pages/editDog.html?id=${dog.id}`)
                tr.appendChild(createCell(dog.id))
                tr.appendChild(createCell(dog.name))
                tr.appendChild(createCell(dog.breed))
                tr.appendChild(createCell(dog.length))
                tr.appendChild(createCell(dog.birth))
                tr.appendChild(linkToEdit)
                resultset.appendChild(tr)
            }
        } catch (error) {
            document.getElementById('messagearea').innerHTML = `
                <p class='error'>
                ${error.message}
                </p>
                `
        }
    }
    function createCell(data) {
        const td = document.createElement('td')
        td.textContent = data
        return td
    }
}()) 