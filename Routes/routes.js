const express = require('express')
const { verifyJWT} = require('../middlewares/authentication')
const {viewUser, register, loginUser, editUser, requestSend, myUser, getFriendsNumber, getUsersByID, acceptFriend, getAllUsers, searchUsers, declineRequest} = require('../controllers/usercontroller')
const Router =  express.Router

const router = Router()

router.post('/register',register)
router.post('/login', loginUser)
router.get('/number_friends', verifyJWT, getFriendsNumber)
router.get('/myuser', verifyJWT, myUser)
router.get('/user',verifyJWT,viewUser)
router.put('/edit', verifyJWT,editUser)
router.post('/resquet_send',verifyJWT, requestSend)
router.get('/get_users',verifyJWT, getUsersByID)
router.put('/accept_friend',verifyJWT, acceptFriend)
router.put('/decline_request', verifyJWT, declineRequest)
router.get('/dataAll', verifyJWT, getAllUsers)
router.post('/search_users', verifyJWT, searchUsers)

module.exports = router
