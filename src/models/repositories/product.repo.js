'use strict'

const { product } = require('../product.model')
const lodash = require('../../utils/lodash.util')

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

const findProductsWithPaging = async ({ filter, limit, page, sort, select = [] }) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? { id: -1 } : { id: 1 } // ctime sort by the newest products

    return await product.find(filter)
        .select(lodash.getSelectObjFromSelectArr(select))
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .lean()
}

const findProduct = async ({ productId, unSelect = [] }) => {
    return await product.findOne({
        _id: productId,
        isPublished: true
    })
        .select(lodash.getUnSelectObjFromSelectArr(unSelect))
        .lean()
}

const updateProductById = async ({
    productId,
    payload,
    model,
    returnNew = true
}) => {
    return await model.findByIdAndUpdate(productId, payload, { new: returnNew })
}

module.exports = {
    findByQuery,
    publishProductByShop,
    unPublishProductByShop,
    findProductByKeyword,
    findProductsWithPaging,
    findProduct,
    updateProductById
}

