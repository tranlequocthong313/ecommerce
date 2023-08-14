'use strict'

const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const shopModel = require('../models/shop.model')
const KeyTokenService = require('./keyToken.service')
const { lodash } = require('../utils')
const { createTokenPair } = require('../auth/authUtils')
const { ConflictError, ErrorResponse, BadRequestError, UnauthorizedError } = require('../core/error.response')
const { findByEmail } = require('./shop.service')
const { generatePrivateAndPublicKey } = require('../utils/keyGenerator')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {
    static login = async ({ email, password, refreshtoken = null }) => {
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
            shop: lodash.getIntoData({ fildes: ['_id', 'name', 'email'], obj: shop }),
            tokens
        }
    }

    static signUp = async ({ name, email, password }) => {
        const shop = await shopModel.findOne({ email }).lean()
        if (shop) {
            throw new ConflictError('Shop is already signed up!')
        }

        password = await bcrypt.hash(password, 10)

        const newShop = await shopModel.create({
            name, email, password, roles: [RoleShop.SHOP]
        })

        if (newShop) {
            const { privateKey, publicKey } = generatePrivateAndPublicKey()

            console.log({ privateKey, publicKey })
            const keyStore = await KeyTokenService.createKeyToken({ userId: newShop._id, publicKey, privateKey })
            if (!keyStore) {
                throw new ErrorResponse()
            }

            const tokens = await createTokenPair({
                userId: newShop._id
            }, publicKey, privateKey)
            console.log(`Created token successfully::`, tokens)

            return {
                shop: lodash.getIntoData({ fildes: ['_id', 'name', 'email'], obj: newShop }),
                tokens
            }
        }
    }
}

module.exports = AccessService
