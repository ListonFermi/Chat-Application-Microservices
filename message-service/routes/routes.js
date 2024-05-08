const controller = require('../controller/controller')

const router = require('express').Router()

router.post('/sendMessage/:chatroomId',controller.sendMessage)

module.exports = router