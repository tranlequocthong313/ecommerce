'use strict'

const { product, clothing, electronic } = require('../models/product.model')
const { BadRequestError } = require('../core/error.response')

class ProductService {
    static async create(type, payload) {
        switch (type) {
            case 'Electronics':
                return new Electronics(payload).create()
            case 'Clothing':
                return new Clothing(payload).create()
            default:
                throw new BadRequestError(`Invalid Product Type ${type}`)
        }
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

module.exports = ProductService
