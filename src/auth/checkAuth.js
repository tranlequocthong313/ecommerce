'use strict'

const apiKeyService = require('../services/apiKey.service')

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }

        const objKey = await apiKeyService.findById(key)
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }

        req.key = objKey
        return next()
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.key.permissions) {
            return res.status(403).json({
                message: 'Permission denied'
            })
        }
        console.log('permissions::', req.key.permissions)
        if (!req.key.permissions.includes(permission)) {
            return res.status(403).json({
                message: 'Permission denied'
            })
        }
        return next()
    }
}

module.exports = {
    apiKey,
    permission
}
