'use strict'

const { product, clothing, electronic } = require('../models/product.model')
const { BadRequestError } = require('../core/error.response')
const productRepository = require('../models/repositories/product.repo')
const lodash = require('../utils/lodash.util')

class ProductService {
    static productClasses = {}

    static addProductClass(type, className) {
        this.productClasses[type] = className
    }

    static async create(type, payload) {
        const productClass = this.productClasses[type]
        if (!productClass) {
            throw new BadRequestError(`Invalid Product Type ${type}`)
        }
        return new productClass(payload).create()
    }

    static async findAllDraftsForShop({ shop, limit = 50, skip = 0 }) {
        return await productRepository.findByQuery({
            query: {
                shop,
                isDraft: true
            },
            limit,
            skip
        })
    }

    static async publishProductByShop({ shop, productId }) {
        return await productRepository.publishProductByShop({ shop, productId })
    }

    static async unPublishProductByShop({ shop, productId }) {
        return await productRepository.unPublishProductByShop({ shop, productId })
    }

    static async findAllPublishedForShop({ shop, limit = 50, skip = 0 }) {
        return await productRepository.findByQuery({
            query: {
                shop,
                isPublished: true
            },
            limit,
            skip
        })
    }

    static async searchProductsByKeyword(keyword) {
        return await productRepository.findProductByKeyword(keyword)
    }

    static async findProductsWithPaging({
        filter,
        limit = 50,
        page = 1,
        sort = 'ctime'
    }) {
        filter = {
            ...filter,
            isPublished: true,
            isDraft: false
        }
        return await productRepository.findProductsWithPaging({
            filter,
            limit,
            page,
            sort,
            select: ['name', 'price', 'thumb']
        })
    }

    static async findProduct(id) {
        return await productRepository.findProduct({
            productId: id,
            unSelect: ['__v', 'variation']
        })
    }

    static async update(type, productId, payload) {
        const productClass = this.productClasses[type]
        if (!productClass) {
            throw new BadRequestError(`Invalid Product Type ${type}`)
        }
        return new productClass(payload).update(productId)
    }
}

class Product {
    constructor({
        name,
        description,
        price,
        thumb,
        quantity,
        type,
        shop,
        attributes
    }) {
        this.name = name
        this.description = description
        this.price = price
        this.thumb = thumb
        this.quantity = quantity
        this.type = type
        this.shop = shop
        this.attributes = attributes
    }

    async create(productId) {
        return await product.create({ ...this, _id: productId })
    }

    async update(productId, payload) {
        return await productRepository.updateProductById({
            productId,
            payload,
            model: product
        })
    }
}

class Clothing extends Product {
    async create() {
        const newClothing = await clothing.create({
            ...this.attributes,
            shop: this.shop
        })
        if (!newClothing) {
            throw new BadRequestError('create new Clothing error')
        }

        const newProduct = await super.create(newClothing._id)
        if (!newProduct) {
            throw new BadRequestError('create new Product error')
        }
        return newProduct
    }

    async update(productId) {
        const update = lodash.cleanData(this)
        if (update.attributes) {
            await productRepository.updateProductById({
                productId,
                payload: lodash.parseNestedObj(update.attributes),
                model: clothing
            })
        }
        return super.update(productId, lodash.parseNestedObj(update))
    }
}

class Electronics extends Product {
    async create() {
        const newElectronic = await electronic.create({
            ...this.attributes,
            shop: this.shop
        })
        if (!newElectronic) {
            throw new BadRequestError('create new Electronics error')
        }

        const newProduct = await super.create(newElectronic._id)
        if (!newProduct) {
            throw new BadRequestError('create new Product error')
        }
        return newProduct
    }
}

ProductService.addProductClass('Clothing', Clothing)
ProductService.addProductClass('Electronics', Electronics)

module.exports = ProductService
