'use strict'

const _ = require('lodash')

const omitFields = ({ fildes = [], obj = {} }) => {
    return _.pick(obj, fildes)
}

const cleanData = (obj) => {
    return _.omitBy(obj, v => v == null)
}

const getSelectObjFromSelectArr = (selectArr) => {
    return Object.fromEntries(selectArr.map(it => [it, 1]))
}

const getUnSelectObjFromSelectArr = (selectArr) => {
    return Object.fromEntries(selectArr.map(it => [it, 0]))
}

const parseNestedObj = (obj) => {
    const res = {}
    Object.entries(obj).forEach(([k, v]) => {
        if (typeof v === 'object' && !Array.isArray(v)) {
            Object.entries(parseNestedObj(v)).forEach(([k2, v2]) => {
                res[`${k}.${k2}`] = v2
            })
        } else {
            res[k] = v
        }
    })
    return res
}

module.exports = {
    omitFields,
    cleanData,
    getSelectObjFromSelectArr,
    getUnSelectObjFromSelectArr,
    parseNestedObj
}
