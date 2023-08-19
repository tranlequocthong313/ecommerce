'use strict'

const _ = require('lodash')

const omitFields = ({ fildes = [], obj = {} }) => {
    return _.pick(obj, fildes)
}

const cleanData = (obj) => {
    return _.omitBy(obj, v => v == null || Object.keys(v).length === 0)
}

const getSelectObjFromSelectArr = (selectArr) => {
    return Object.fromEntries(selectArr.map(it => [it, 1]))
}

const getUnSelectObjFromSelectArr = (selectArr) => {
    return Object.fromEntries(selectArr.map(it => [it, 0]))
}

module.exports = {
    omitFields,
    cleanData,
    getSelectObjFromSelectArr,
    getUnSelectObjFromSelectArr
}
