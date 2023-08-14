const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    CLIENT_ID: 'x-client-id'
}

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

const ErrorStatusCode = {
    FORBIDDDEN: 403,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401
}

const ErrorReasonStatusCode = {
    FORBIDDDEN: 'Forbidden error',
    CONFLICT: 'Conflict error',
    BAD_REQUEST: 'Bad request error',
    UNAUTHORIZED: 'Unauthorized'
}

const SuccessStatusCode = {
    OK: 200,
    CREATED: 201,
}

const SuccessReasonStatusCode = {
    OK: 'Success',
    CREATED: 'Created',
}

module.exports = {
    HEADER,
    RoleShop,
    ErrorStatusCode,
    ErrorReasonStatusCode,
    SuccessStatusCode,
    SuccessReasonStatusCode,
}
