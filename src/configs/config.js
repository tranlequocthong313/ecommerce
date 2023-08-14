'use strcit'

const configs = {
    development: {
        APP: {
            PORT: process.env.DEV_APP_PORT || 3055,
        },
        DB: {
            PORT: process.env.DEV_MONGODB_PORT || 27017,
            NAME: process.env.DEV_MONGODB_DB_NAME || 'ecommerce',
            SERVER: process.env.DEV_MONGODB_SERVER || '127.0.0.1',
        }
    }
}

const env = process.env.NODE_ENV || 'development'

module.exports = configs[env]
