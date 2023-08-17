'use strict'

const { CreatedResponse } = require('../core/success.response')
const ProdcutService = require('../services/product.service')

class ProdcutController {
    create = async (req, res, next) => {
        new CreatedResponse({
            message: 'Created new product successfully!',
            metadata: await ProdcutService.create(req.body.type, req.body)
        }).send(res)
    }
}

module.exports = new ProdcutController()
