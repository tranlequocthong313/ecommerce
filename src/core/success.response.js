'use strict'

const { SuccessReasonStatusCode: ReasonStatusCode, SuccessStatusCode: StatusCode } = require('../utils/constants')
const { cleanData } = require('../utils/lodash.util')

class SuccessResponse {
    constructor({ message = ReasonStatusCode.OK, statusCode = StatusCode.OK, data = {} }) {
        this.message = message
        this.status = statusCode
        this.data = data
    }

    send(res, headers = {}) {
        return res.status(this.status).json(cleanData(this))
    }
}

class OkResponse extends SuccessResponse {
    constructor({ message = ReasonStatusCode.OK, data }) {
        super({ message, statusCode: StatusCode.OK, data })
    }
}

class CreatedResponse extends SuccessResponse {
    constructor({ message = ReasonStatusCode.CREATED, data, options = {} }) {
        super({ message, statusCode: StatusCode.CREATED, data })
        this.options = options
    }
}

module.exports = {
    OkResponse, CreatedResponse
}
