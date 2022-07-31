const express = require('express')
const { verifyJWT} = require('../middlewares/authentication')
const {viewUser, register, loginUser, editUser, resquetSend, myUser, getNumberFriends, getUsersRequest} = require('../controllers/usercontroller')
const Router =  express.Router

const router = Router()

router.get('/register',register)
router.post('/login', loginUser)
router.get('/myuser', verifyJWT, myUser)
router.get('/user',verifyJWT,viewUser)
router.put('/edit/:id',verifyJWT,editUser)
router.post('/resquet_send',verifyJWT, resquetSend)
router.get('/number_friends',verifyJWT,getNumberFriends)
router.post('/get_users', verifyJWT,getUsersRequest)

module.exports = router
