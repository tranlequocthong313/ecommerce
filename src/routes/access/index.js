'use strict'

const { Router } = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../utils')
const router = Router()

router.post('/shop/signup', asyncHandler(accessController.signUp))
router.post('/shop/login', asyncHandler(accessController.login))

module.exports = router
