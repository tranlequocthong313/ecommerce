'use strict'

const { CreatedResponse } = require('../core/success.response')
const ProdcutService = require('../services/product.service')

class ProdcutController {
    create = async (req, res, next) => {
        new CreatedResponse({
            message: 'Created new product successfully!',
            data: await ProdcutService.create(req.body.type, {
                ...req.body,
                shop: req.user.userId
            })
        }).send(res)
    }
}

module.exports = new ProdcutController()