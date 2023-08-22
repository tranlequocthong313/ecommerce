'use strict'

const { model, Schema } = require('mongoose')

const MODEL_NAME = 'Inventory'
const COLLECTION_NAME = 'Inventories'

const inventorySchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    location: {
        type: String,
        default: 'unknown'
    },
    stock: {
        type: Number,
        required: true
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    reservation: {
        type: Array,
        default: []
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(MODEL_NAME, inventorySchema)
