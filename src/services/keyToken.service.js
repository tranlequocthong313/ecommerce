'use strict'

const keytokenModel = require('../models/keytoken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        const tokens = await keytokenModel.create({
            user: userId, publicKey, privateKey
        })
        return tokens ? tokens.publicKey : null
    }
}

module.exports = KeyTokenService
