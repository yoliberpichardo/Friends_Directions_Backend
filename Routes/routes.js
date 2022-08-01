const express = require('express')
const { verifyJWT} = require('../middlewares/authentication')
const {viewUser, register, loginUser, editUser, resquetSend, myUser, getFriendsNumber, getUsersByID} = require('../controllers/usercontroller')
const Router =  express.Router

const router = Router()

router.get('/number_friends', verifyJWT, getFriendsNumber)
router.post('/myuser', verifyJWT, myUser)
router.post('/user',verifyJWT,viewUser)
router.post('/register',register)
router.post('/login', loginUser)
router.put('/edit/:id', editUser)
router.post('/resquet_send',verifyJWT, resquetSend)
router.post('/get_users',verifyJWT, getUsersByID)


module.exports = router
