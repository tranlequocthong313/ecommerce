'use strict'

const { ErrorReasonStatusCode: ReasonStatusCode, ErrorStatusCode: StatusCode } = require('../utils/constants')

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
        super(message, statusCode)
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDDEN, statusCode = StatusCode.FORBIDDDEN) {
        super(message, statusCode)
    }
}

class UnauthorizedError extends ErrorResponse {
    constructor(message = ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
        super(message, statusCode)
    }
}

module.exports = {
    ConflictError,
    BadRequestError,
    ErrorResponse,
    ForbiddenError,
    UnauthorizedError
}
