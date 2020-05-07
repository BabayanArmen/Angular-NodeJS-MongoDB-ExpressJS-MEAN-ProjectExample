const express = require('express')
const router = express.Router()
const userContorller = require('../contorllers/user')

//localhost:3000/api/user/signup
router.post('/signup', userContorller.createUser)

//localhost:3000/api/user/login
router.post('/login', userContorller.userLogin)


module.exports = router
