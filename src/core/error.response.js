'use strict'

const StatusCode = {
    FORBIDDDEN: 403,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401
}

const ReasonStatusCode = {
    FORBIDDDEN: 'Forbidden error',
    CONFLICT: 'Conflict error',
    BAD_REQUEST: 'Bad request error',
    UNAUTHORIZED: 'Unauthorized'
}

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
