'use strict'

const { Router } = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../utils')
const { checkToken } = require('../../auth/authUtils')
const router = Router()

router.post('/shop/signup', asyncHandler(accessController.signUp))
router.post('/shop/login', asyncHandler(accessController.login))

router.post('/shop/logout', asyncHandler(checkToken('access')), asyncHandler(accessController.logout))

router.post('/shop/handleRefreshToken', asyncHandler(checkToken('refresh')), asyncHandler(accessController.handleRefreshToken))

module.exports = router
