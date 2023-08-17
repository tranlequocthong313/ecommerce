'use strict'

const shopModel = require('../models/shop.model')
const KeyTokenService = require('./keyToken.service')
const lodash = require('../utils/lodash.util')
const { createTokenPair } = require('../auth/authUtils')
const { ConflictError, ErrorResponse, BadRequestError, UnauthorizedError, ForbiddenError } = require('../core/error.response')
const { findByEmail } = require('./shop.service')
const { generatePrivateAndPublicKey } = require('../utils/keyGenerator')
const { RoleShop } = require('../utils/constants')
const bcrypt = require('bcrypt')

class AccessService {
    static handleRefreshToken = async ({
        refreshToken,
        keyStore,
        userId
    }) => {
        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.deleteByUserId(userId)
            throw new ForbiddenError('Something went wrong! Please login again')
        }

        const tokens = await createTokenPair({
            userId
        }, keyStore.publicKey, keyStore.privateKey)

        await keyStore.updateOne({
            $set: { refreshToken: tokens.refreshToken },
            $addToSet: { refreshTokensUsed: refreshToken }
        })

        return {
            userId,
            tokens
        }
    }

    static logout = async (keyStore) => {
        const delKey = await KeyTokenService.deleteById(keyStore._id)
        return delKey
    }

    static login = async ({ email, password }) => {
        const shop = await findByEmail({ email })
        if (!shop) {
            throw new BadRequestError('Shop does not exist')
        }

        const matchPassword = await bcrypt.compare(password, shop.password)
        if (!matchPassword) {
            throw new UnauthorizedError('Authentication error')
        }

        const { privateKey, publicKey } = generatePrivateAndPublicKey()
        const tokens = await createTokenPair({
            userId: shop._id
        }, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            userId: shop._id,
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey
        })

        return {
            shop: lodash.omitFields({ fildes: ['_id', 'name', 'email'], obj: shop }),
            tokens
        }
    }

    static signUp = async ({ name, email, password }) => {
        const shop = await shopModel.findOne({ email }).lean()
        if (shop) {
            throw new ConflictError('Shop is already signed up!')
        }

        const newShop = await shopModel.create({
            name,
            email,
            password,
            roles: [RoleShop.SHOP]
        })

        if (newShop) {
            const { privateKey, publicKey } = generatePrivateAndPublicKey()

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })
            if (!keyStore) {
                throw new ErrorResponse()
            }

            const tokens = await createTokenPair({
                userId: newShop._id
            }, publicKey, privateKey)

            return {
                shop: lodash.omitFields({
                    fildes: ['_id', 'name', 'email'],
                    obj: newShop
                }),
                tokens
            }
        }
    }
}

module.exports = AccessService
