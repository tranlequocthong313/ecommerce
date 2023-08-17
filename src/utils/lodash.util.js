'use strict'

const _ = require('lodash')

const omitFields = ({ fildes = [], obj = {} }) => {
    return _.pick(obj, fildes)
}

const cleanData = (obj) => {
    return _.omitBy(obj, v => v == null || Object.keys(v).length === 0)
}

module.exports = {
    omitFields,
    cleanData
}
