'use strict'

const { model, Schema } = require('mongoose')

const MODEL_NAME = 'Discount'
const COLLECTION_NAME = 'Discounts'

const discountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['amount', 'percentage'],
        default: 'amount'
    },
    value: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: true
    },
    maxUse: {
        type: Number,
        required: true
    },
    usedCount: {
        type: Number,
        required: true
    },
    usersUsed: {
        type: Array,
        default: []
    },
    maxUsePerUser: {
        type: Number,
        required: true
    },
    minOrderValue: {
        type: Number,
        required: true
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    applyTo: {
        type: String,
        enum: ['all', 'specific'],
        required: true
    },
    productIds: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(MODEL_NAME, discountSchema)
