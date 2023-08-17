'use strict'

const { SuccessReasonStatusCode: ReasonStatusCode, SuccessStatusCode: StatusCode } = require('../utils/constants')
const { cleanData } = require('../utils/lodash.util')

class SuccessResponse {
    constructor({ message = ReasonStatusCode.OK, statusCode = StatusCode.OK, metadata = {} }) {
        this.message = message
        this.status = statusCode
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.status).json(cleanData(this))
    }
}

class OkResponse extends SuccessResponse {
    constructor({ message = ReasonStatusCode.OK, metadata }) {
        super({ message, statusCode: StatusCode.OK, metadata })
    }
}

class CreatedResponse extends SuccessResponse {
    constructor({ message = ReasonStatusCode.CREATED, metadata, options = {} }) {
        super({ message, statusCode: StatusCode.CREATED, metadata })
        this.options = options
    }
}

module.exports = {
    OkResponse, CreatedResponse
}
