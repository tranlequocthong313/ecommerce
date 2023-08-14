'use strict'

const { Router } = require('express')
const router = Router()

router.use('/v1/api', require('./access'))

module.exports = router
