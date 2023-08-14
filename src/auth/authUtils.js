'use strict'

const jwt = require('jsonwebtoken')
const { UnauthorizedError, BadRequestError } = require('../core/error.response')
const KeyTokenService = require('../services/keyToken.service')
const { asyncHandler } = require('../utils')
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

const authentication = asyncHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) {
        throw new UnauthorizedError()
    }
    const keyStore = await KeyTokenService.findByUserId(userId)
    if (!keyStore) {
        throw new UnauthorizedError()
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) {
        throw new BadRequestError('Not found token')
    }

    try {
        const payload = jwt.verify(accessToken, keyStore.publicKey)
        if (userId !== payload.userId) {
            throw new UnauthorizedError('Invalid user')
        }
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})

module.exports = {
    createTokenPair,
    authentication
}
