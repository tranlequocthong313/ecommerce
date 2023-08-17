'use strict'

const { CreatedResponse, OkResponse } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
    handleRefreshToken = async (req, res, next) => {
        new CreatedResponse({
            message: 'Refreshed tokens successfully!',
            metadata: await AccessService.handleRefreshToken({
                refreshToken: req.refreshToken,
                keyStore: req.keyStore,
                userId: req.user.userId
            })
        }).send(res)
    }

    logout = async (req, res, next) => {
        new OkResponse({
            message: 'Log out successfully!',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }

    login = async (req, res, next) => {
        new CreatedResponse({
            message: 'Log in successfully!',
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    signUp = async (req, res, next) => {
        new CreatedResponse({
            message: 'Signed up successfully!',
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()
