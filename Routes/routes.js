const express = require('express')
// const {singInJWT, verifyJWT} = require('../middlewares/authentication')
const {viewUser, register, loginUser, editUser} = require('../controllers/usercontroller')
const Router =  express.Router

const router = Router()

router.get('/user',viewUser)
router.post('/register',register)
router.post('/login', loginUser)
router.put('/direction/:id', editUser)

module.exports = router
