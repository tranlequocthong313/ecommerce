'use strict'

const { ForbiddenError } = require('../core/error.response')
const apiKeyService = require('../services/apiKey.service')

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
        throw new ForbiddenError('Not found api key')
    }

    const objKey = await apiKeyService.findById(key)
    if (!objKey) {
        throw new ForbiddenError('Invalid api key')
    }

    req.key = objKey
    return next()
}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.key.permissions) {
            throw new ForbiddenError('Permission denied')
        }
        console.log('permissions::', req.key.permissions)
        if (!req.key.permissions.includes(permission)) {
            throw new ForbiddenError('Permission denied')
        }
        return next()
    }
}

module.exports = {
    apiKey,
    permission
}
