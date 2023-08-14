'use strict'

const { Router } = require('express')
const { apiKey, permission } = require('../auth/checkAuth')
const { asyncHandler } = require('../utils')
const router = Router()

router.use(asyncHandler(apiKey))
router.use(permission('0000'))

router.use('/v1/api', require('./access'))

module.exports = router
