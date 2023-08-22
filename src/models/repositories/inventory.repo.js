'use strict'

const inventoryModel = require('../inventory.model')

const insertInventory = async ({
    productId,
    shopId,
    stock,
    location = 'unknown'
}) => {
    return await inventoryModel.create({
        productId,
        shopId,
        stock,
        location
    })
}

module.exports = {
    insertInventory
}
