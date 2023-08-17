'use strict'

const { Router } = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../utils')
const { authentication } = require('../../auth/authUtils')
const router = Router()

router.post('/shop/signup', asyncHandler(accessController.signUp))
router.post('/shop/login', asyncHandler(accessController.login))

router.use(authentication)
router.post('/shop/logout', asyncHandler(accessController.logout))
router.post('/shop/handleRefreshToken', asyncHandler(accessController.handleRefreshToken))

module.exports = router
