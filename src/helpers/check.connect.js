'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')

const MONITOR_MS = 5000

const countConnect = () => {
    const numOfConnection = mongoose.connect.length
    console.log(`Number of connection::: ${numOfConnection}`)
}

const checkOverload = () => {
    setInterval(() => {
        const numOfConnection = mongoose.connect.length
        const numOfCores = os.cpus().length
        const memUsage = process.memoryUsage().rss

        console.log(`Active connections:: ${numOfConnection}`)
        console.log(`Memory usage:: ${(memUsage / 1024 / 1024).toFixed(0)} MB`)

        const maxConnection = numOfCores * 5
        if (numOfConnection > maxConnection) {
            console.log(`Connection overload detected!`)
        }
    }, MONITOR_MS)
}

module.exports = {
    countConnect,
    checkOverload
}
