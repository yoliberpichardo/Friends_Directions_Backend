const express = require('express')
const {singInJWT, verifyJWT} = require('../middlewares/authentication')
const {viewUser, register, loginUser} = require('../controllers/usercontroller')
const Router =  express.Router

const router = Router()

router.get('/',viewUser)
router.post('/register',register)
router.post('/login', loginUser)

module.exports = router
