const controller = require('../controller/controller')

const router = require('express').Router()

router.post('/signup', controller.signup )
router.post('/login', controller.login )


module.exports = router