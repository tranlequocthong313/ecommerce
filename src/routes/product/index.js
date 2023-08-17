'use strict'

const { Router } = require('express')
const asyncHandler = require('../../utils/asyncHandler')
const { checkToken } = require('../../auth/authUtils')
const productController = require('../../controllers/product.controller')
const router = Router()

router.use(asyncHandler(checkToken('access')))
router.post('', asyncHandler(productController.create))

module.exports = router
