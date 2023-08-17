'use strict'

const { Router } = require('express')
const { asyncHandler } = require('../../utils')
const { authentication } = require('../../auth/authUtils')
const productController = require('../../controllers/product.controller')
const router = Router()

router.use(authentication)
router.post('', asyncHandler(productController.create))

module.exports = router
