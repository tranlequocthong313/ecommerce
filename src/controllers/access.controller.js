'use strict'

const { CreatedResponse, OkResponse } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
    logout = async (req, res, next) => {
        console.log(`[P]::logout::`, req.keyStore)

        new OkResponse({
            message: 'Log out successfully!',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }

    login = async (req, res, next) => {
        console.log(`[P]::login::`, req.body)

        new CreatedResponse({
            message: 'Log in successfully!',
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    signUp = async (req, res, next) => {
        console.log(`[P]::signUp::`, req.body)

        new CreatedResponse({
            message: 'Signed up successfully!',
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()
