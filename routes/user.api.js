const express = require('express')
const router = express.Router()
const { createUser, loginWithEmail } = require('../controller/user.controller')

router.post('/', createUser)

router.post('/login', loginWithEmail)

module.exports = router