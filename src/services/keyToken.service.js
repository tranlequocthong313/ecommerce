'use strict'

const { Types } = require('mongoose')
const keytokenModel = require('../models/keytoken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        const filter = { user: userId }
        const update = {
            publicKey,
            privateKey,
            refreshTokensUsed: [],
            refreshToken
        }
        const options = { upsert: true, new: true }

        const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)

        return tokens ? tokens.publicKey : null
    }

    static findByUserId = async (userId) => {
        return await keytokenModel.findOne({ user: new Types.ObjectId(userId) })
    }

    static deleteById = async (id) => {
        return await keytokenModel.deleteOne(id).lean()
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
    }

    static deleteByUserId = async (userId) => {
        return await keytokenModel.deleteOne({ user: userId })
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshToken })
    }
}

module.exports = KeyTokenService
