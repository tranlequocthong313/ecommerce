'use strict'

const jwt = require('jsonwebtoken')
const { UnauthorizedError, BadRequestError } = require('../core/error.response')
const KeyTokenService = require('../services/keyToken.service')
const { HEADER } = require('../utils/constants')

const createTokenPair = async (payload, publicKey, privateKey) => {
    const accessToken = await jwt.sign(payload, publicKey, {
        expiresIn: '2 days'
    })
    const refreshToken = await jwt.sign(payload, privateKey, {
        expiresIn: '7 days'
    })
    return { accessToken, refreshToken }
}

const checkToken = (type = 'access') => {
    if (!['access', 'refresh'].includes(type)) {
        throw new Error(`Invalid token type ${type}`)
    }
    return async (req, res, next) => {
        const userId = req.headers[HEADER.CLIENT_ID]
        if (!userId) {
            throw new UnauthorizedError()
        }
        const keyStore = await KeyTokenService.findByUserId(userId)
        if (!keyStore) {
            throw new UnauthorizedError()
        }

        let verifyKey, token
        if (type === 'access') {
            verifyKey = keyStore.publicKey
            token = req.headers[HEADER.AUTHORIZATION]
        } else {
            verifyKey = keyStore.privateKey
            token = req.headers[HEADER.REFRESH_TOKEN]
        }

        if (!token) {
            throw new BadRequestError('Not found token')
        }

        try {
            const payload = jwt.verify(token, verifyKey)
            if (userId !== payload.userId) {
                throw new UnauthorizedError('Invalid user')
            }
            req.keyStore = keyStore
            req.user = payload
            if (type === 'refresh') {
                req.refreshToken = token
            }
            return next()
        } catch (error) {
            throw new UnauthorizedError(error)
        }
    }
}

const verifyJWT = async (token, keySecret) => {
    return await jwt.verify(token, keySecret)
}

module.exports = {
    createTokenPair,
    checkToken,
    verifyJWT
}
