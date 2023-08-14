'use strict'

const jwt = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await jwt.sign(payload, publicKey, {
            expiresIn: '2 days'
        })
        const refreshToken = await jwt.sign(payload, privateKey, {
            expiresIn: '7 days'
        })
        return { accessToken, refreshToken }
    } catch (error) {
        return error
    }
}

module.exports = {
    createTokenPair
}
