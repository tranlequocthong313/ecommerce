'use strict'

const mongoose = require('mongoose')
const { DB } = require('../configs/config')

const URI = `mongodb://${DB.SERVER}:${DB.PORT}/${DB.NAME}`

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        mongoose.set('debug', true)
        mongoose.set('debug', { color: true })

        mongoose.connect(URI, { maxPoolSize: 50 })
            .then(_ => console.log('Connected to Mongodb'))
            .catch(e => console.log(`Error::: ${e}`))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongoDb = Database.getInstance()
module.exports = instanceMongoDb
