'use strict'

const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const shopModel = require('../models/shop.model')
const KeyTokenService = require('./keyToken.service')
const { lodash } = require('../utils')
const { createTokenPair } = require('../auth/authUtils')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            const shop = await shopModel.findOne({ email }).lean()
            if (shop) {
                return {
                    code: 'xxx',
                    message: 'Shop is already signed up!',
                }
            }

            password = await bcrypt.hash(password, 10)

            const newShop = await shopModel.create({
                name, email, password, roles: [RoleShop.SHOP]
            })

            if (newShop) {
                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')

                console.log({ privateKey, publicKey })
                const keyStore = await KeyTokenService.createKeyToken({ userId: newShop._id, publicKey, privateKey })
                if (!keyStore) {
                    return {
                        code: 'xxxx',
                        message: 'keyStore error'
                    }
                }

                const tokens = await createTokenPair({
                    userId: newShop._id
                }, publicKey, privateKey)
                console.log(`Created token successfully::`, tokens)

                return {
                    code: 201,
                    metadata: {
                        shop: lodash.getIntoData({ fildes: ['_id', 'name', 'email'], obj: newShop }),
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metadata: null
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService
