'use strict'

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init db
require('./db/init.mongodb')

require('./helpers/check.connect').checkOverload()

// init routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcome',
        metadata: 'HelloWorld'
    })
})

// handle errors

module.exports = app
