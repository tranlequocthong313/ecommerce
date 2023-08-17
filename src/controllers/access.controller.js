'use strict'

const { CreatedResponse, OkResponse } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
    handleRefreshToken = async (req, res, next) => {
        new CreatedResponse({
            message: 'Refreshed tokens successfully!',
            data: await AccessService.handleRefreshToken({
                refreshToken: req.refreshToken,
                keyStore: req.keyStore,
                userId: req.user.userId
            })
        }).send(res)
    }

    logout = async (req, res, next) => {
        new OkResponse({
            message: 'Log out successfully!',
            data: await AccessService.logout(req.keyStore)
        }).send(res)
    }

    login = async (req, res, next) => {
        new CreatedResponse({
            message: 'Log in successfully!',
            data: await AccessService.login(req.body)
        }).send(res)
    }

    signUp = async (req, res, next) => {
        new CreatedResponse({
            message: 'Signed up successfully!',
            data: await AccessService.signUp(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()
