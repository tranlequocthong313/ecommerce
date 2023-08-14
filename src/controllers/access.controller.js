'use strict'

const { CreatedResponse } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
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
