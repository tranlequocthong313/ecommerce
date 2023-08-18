'use strict'

const { model, Schema } = require('mongoose')
const slugify = require('slugify')

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
        ref: 'Shop'
    },
    attributes: {
        type: Schema.Types.Mixed,
        required: true
    },
    slug: {
        type: String
    },
    rating_avg: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: (val) => Math.round(val * 10) / 10
    },
    variation: {
        type: Array,
        default: []
    },
    isDraft: {
        type: Boolean,
        default: true,
        index: true,
        select: false
    },
    isPublished: {
        type: Boolean,
        default: false,
        index: true,
        select: false
    },
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

productSchema.index({ name: 'text', description: 'text' })

productSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

module.exports = {
    product: model(MODEL_NAME, productSchema),
    clothing: model('Clothing', clothingSchema),
    electronic: model('Electronic', electronicSchema),
}
