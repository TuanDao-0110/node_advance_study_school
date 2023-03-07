'use strict'
// const http = require('http')
import * as http from 'http'
const fetch = (uri, fetchOptions) => new Promise((resolve, reject) => {
    const url = new URL(uri)
    const { hostname, port, pathname } = url
    const options = {
        hostname,
        port,
        path: pathname
    }
    Object.assign(options, fetchOptions)
    http.request(options, res => {
        let databuffer = []
        // 1.check when response is on
        res.on('data', datachunk => databuffer.push(datachunk))
        res.on('end', () => resolve({
            json: () => JSON.parse(Buffer.concat(databuffer).toString())
        }))
    })
        // 2 when request have error 
        .on('error', () => reject('error'))
        // 3. when request done
        .end(options.body)
})
export { fetch }