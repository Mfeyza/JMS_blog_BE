"use strict"

const router = require('express').Router()

router.use('/auth', require('./auth'))

router.use('/users', require('./user'))

router.use('/tokens', require('./token'))

router.use('/categories', require('./category'))

router.use('/blogs', require('./blog'))

router.use('/comments', require('./comment'))

router.use('/documents', require('./document'))

module.exports = router