const express = require('express')
const morgan = require('morgan')
const app = express()
const fs = require('fs')
const router = require('./routes/api')
const config = require('../config/default.json')

const PORT = config.app.port || 8000

const logfile = 'access.log'
var accessLogStream = fs.createWriteStream(logfile, { flags: 'a' })
app.use(morgan('dev', { stream: accessLogStream }))

app.use(express.json())
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
