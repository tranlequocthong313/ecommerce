'use strict'

const { BadRequestError } = require('../core/error.response')
const { CreatedResponse, OkResponse } = require('../core/success.response')
const ProductService = require('../services/product.service')
const ProdcutService = require('../services/product.service')

class ProdcutController {
    create = async (req, res, next) => {
        new CreatedResponse({
            message: 'Created new product successfully!',
            data: await ProdcutService.create(req.body.type, {
                ...req.body,
                shop: req.user.userId
            })
        }).send(res)
    }

    update = async (req, res, next) => {
        new OkResponse({
            message: 'Updated product successfully!',
            data: await ProdcutService.update(req.params.type, req.params.id, req.body)
        }).send(res)
    }

    getAllDraftsForShop = async (req, res, next) => {
        const prods = await ProdcutService.findAllDraftsForShop({ shop: req.user.userId })
        let message = 'Get all drafts for shop successfully!'
        if (!prods || prods.length === 0) {
            message = 'No products'
        }
        new OkResponse({
            message,
            data: prods
        }).send(res)
    }

    getAllPublishedForShop = async (req, res, next) => {
        const prods = await ProdcutService.findAllPublishedForShop({ shop: req.user.userId })
        let message = 'Get all published for shop successfully!'
        if (!prods || prods.length === 0) {
            message = 'No products'
        }
        new OkResponse({
            message,
            data: prods
        }).send(res)
    }

    publishProduct = async (req, res, next) => {
        const prod = await ProdcutService.publishProductByShop({
            shop: req.user.userId,
            productId: req.params.id
        })
        if (!prod) {
            throw new BadRequestError('Not found product')
        }
        new OkResponse({
            message: 'Published product successfully!',
            data: prod
        }).send(res)
    }

    unPublishProduct = async (req, res, next) => {
        const prod = await ProdcutService.unPublishProductByShop({
            shop: req.user.userId,
            productId: req.params.id
        })
        if (!prod) {
            throw new BadRequestError('Not found product')
        }
        new OkResponse({
            message: 'Unpublished product successfully!',
            data: prod
        }).send(res)
    }

    searchProductByKeyword = async (req, res, next) => {
        new OkResponse({
            message: 'Search products by keyword',
            data: await ProductService.searchProductsByKeyword(req.query.k)
        }).send(res)
    }

    findProductsWithPaging = async (req, res, next) => {
        console.log(`find products query:::`, req.query)
        new OkResponse({
            message: 'Find products with paging',
            data: await ProductService.findProductsWithPaging(req.query)
        }).send(res)
    }

    findProductById = async (req, res, next) => {
        console.log(`find product by id:::`, req.params)
        new OkResponse({
            message: 'Find product by id',
            data: await ProductService.findProduct(req.params.id)
        }).send(res)
    }
}

module.exports = new ProdcutController()
