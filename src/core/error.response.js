'use strict'

const StatusCode = {
    FORBIDDDEN: 403,
    CONFLICT: 409,
    BAD_REQUEST: 400
}

const ReasonStatusCode = {
    FORBIDDDEN: 'Forbidden error',
    CONFLICT: 'Conflict error',
    BAD_REQUEST: 'Bad request error'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
        super(message, statusCode)
    }
}

class ForbiddenRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDDEN, statusCode = StatusCode.FORBIDDDEN) {
        super(message, statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    ErrorResponse,
    ForbiddenRequestError
}
