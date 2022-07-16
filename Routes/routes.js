const express = require('express')
const { verifyJWT} = require('../middlewares/authentication')
const {viewUser, register, loginUser, editUser, resquetSend} = require('../controllers/usercontroller')
const Router =  express.Router

const router = Router()

router.post('/user',verifyJWT,viewUser)
router.post('/register',register)
router.post('/login', loginUser)
router.put('/edit/:id', editUser)
router.post('/resquet_send',verifyJWT, resquetSend)

module.exports = router
