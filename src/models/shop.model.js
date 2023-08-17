'use strict'

const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const MODEL_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

const shopSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

shopSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

module.exports = model(MODEL_NAME, shopSchema)
