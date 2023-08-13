'use strict'

const app = require('./src/app')
const config = require('./src/configs/config')

const PORT = config.APP.PORT

const server = app.listen(PORT, () => {
    console.log(`WSV eCommerce start with port ${PORT}`)
})

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit server express`))
})
