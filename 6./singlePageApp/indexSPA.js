'use strict'
const path = require('path')
const express = require('express')
const app = express()
const fetch = require('node-fetch')



const { port, host } = require('./config.json')
// 1 set up rest server 

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'))
})
app.get('/getAll', (req, res) => {
    fetch('http://localhost:4000/api/dog')
        .then(data => {
            return data.json()
        })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.get('/getOne/:id', (req, res) => {
    fetch(`http://localhost:4000/api/dog/${req.params.id}`)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.post('/add', (req, res) => {
    const dog = req.body
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    }
    fetch('http://localhost:4000/api/dog', options)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err))

})
app.post('/update/:id', (req, res) => {
    const dog = req.body
    const id = req.params.id
    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    }
    fetch(`http://localhost:4000/api/dog/${id}`, options)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.post('/remove', (req, res) => {
    const dogID = req.body.id
    const options = {
        method: 'DELETE'
    }
    if (dogID && dogID.length > 0) {
        fetch(`http://localhost:4000/api/dog/${dogID}`, options)
            .then(data => data.json())
            .then(result => res.json(result))
            .catch(err => res.json(err))
    } else {
        res.json({ message: 'empty id' })
    }
})
app.all('*',(req,res)=> { 
    res.json({ message: 'empty id' })
})
app.listen(port, host, () => {
    console.log(`listening at ${port} ${host}...`)
})