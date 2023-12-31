'use strict'

const { Router } = require('express')
const asyncHandler = require('../../utils/asyncHandler')
const { checkToken } = require('../../auth/authUtils')
const productController = require('../../controllers/product.controller')
const router = Router()

router.get('/search', asyncHandler(productController.searchProductByKeyword))
router.get('/:id', asyncHandler(productController.findProductById))
router.get('', asyncHandler(productController.findProductsWithPaging))

router.use(asyncHandler(checkToken('access')))
router.post('', asyncHandler(productController.create))
router.patch('/:type/:id', asyncHandler(productController.update))

router.get('/drafts', asyncHandler(productController.getAllDraftsForShop))
router.get('/published', asyncHandler(productController.getAllPublishedForShop))

router.put('/publish/:id', asyncHandler(productController.publishProduct))
router.put('/unpublish/:id', asyncHandler(productController.unPublishProduct))

module.exports = router
