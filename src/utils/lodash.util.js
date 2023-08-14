'use strict'

const _ = require('lodash')

const getIntoData = ({ fildes = [], obj = {} }) => {
    return _.pick(obj, fildes)
}

module.exports = {
    getIntoData
}
