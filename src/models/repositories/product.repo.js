'use strict'

const { product } = require('../product.model')

const findByQuery = async ({ query, limit, skip }) => {
    return await product.find(query)
        .populate('shop', 'name email -_id')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const publishProductByShop = async ({ shop, productId }) => {
    return await product.findOneAndUpdate({
        shop,
        _id: productId
    }, {
        isDraft: false,
        isPublished: true
    }, {
        upsert: false
    })
}

const unPublishProductByShop = async ({ shop, productId }) => {
    return await product.findOneAndUpdate({
        shop,
        _id: productId
    }, {
        isDraft: true,
        isPublished: false
    }, {
        upsert: false
    })
}

const findProductByKeyword = async (keyword) => {
    return await product.find({
        isPublished: true,
        $text: { $search: new RegExp(keyword) }
    }, {
        score: { $meta: "textScore" }
    })
        .sort({ score: { $meta: "textScore" } })
        .lean()
}

module.exports = {
    findByQuery,
    publishProductByShop,
    unPublishProductByShop,
    findProductByKeyword
}

