'use strict'

const { model, Schema } = require('mongoose')

const MODEL_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    thumb: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Furniture']
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shops'
    },
    attributes: {
        type: Schema.Types.Mixed,
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

const clothingSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    size: {
        type: String,
    },
    material: {
        type: String
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shops'
    },
}, {
    collection: 'Clothes',
    timestamps: true
})

const electronicSchema = new Schema({
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
    },
    color: {
        type: String
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shops'
    },
}, {
    collection: 'Electronics',
    timestamps: true
})

module.exports = {
    product: model(MODEL_NAME, productSchema),
    clothing: model('Clothing', clothingSchema),
    electronic: model('Electronic', electronicSchema),
}
