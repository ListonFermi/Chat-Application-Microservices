const controller = require('../controller/controller')

const router = require('express').Router()

router.post('/createChatroom',controller.createChatroom)

module.exports = router