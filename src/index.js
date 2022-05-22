const fs = require('fs')
const path = require('path')
const http = require('http')
const utils = require('./utils')

function open(result) {
    const port = 8881
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
        res.end(JSON.stringify(result, null, ' '))
    }).listen(port)
    console.log(`Server running at http://localhost:${port}/`)
    utils.openBrowse(`http://localhost:${port}/`)
}
module.exports = open
