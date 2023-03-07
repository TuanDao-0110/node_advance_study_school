'use strict'

const path = require('path')
const cors = require('cors')
const express = require("express")
const app = express()


const { host, port } = require("./config.json")
const DataStorage = require(path.join(__dirname, 'storage', 'dataStorageLayer.js'))
const storage = new DataStorage()
const RESOURCE = storage.resource
// app.use(cors())
app.use(express.json())



app.get(`/api/${RESOURCE}`, (req, res) => {
    storage.getAll().then(
        result => res.json(result)
    ).catch(err => res.json(err))
})


app.get(`/api/${RESOURCE}/:key`, (req, res) => {
    storage.get(Number(req.params.key)).then(
        result => res.json(result)
    ).catch(err => res.json(err))
})

app.post(`/api/${RESOURCE}`, (req, res) => {
    storage.insert(req.body).then(
        result => res.json(result)
    ).catch(err => res.json(err))
})


app.put(`/api/${RESOURCE}/:key`, (req, res) => {
    const resourceObject = req.body
    const key = Number(req.params.key)
    storage.update(key, resourceObject).then(
        result => res.json(result)
    ).catch(err => res.json(err))
})

app.delete(`/api/${RESOURCE}/:key`, (req, res) => {
    storage.remove(Number(req.params.key)).then(
        result => res.json(result)
    ).catch(err => res.json(err))
})


app.all('*', (req, res) => {
    res.json('not supported')
})

app.listen(port, host, () => {
    console.log(`listening at ${host} ${port}....`)
})
