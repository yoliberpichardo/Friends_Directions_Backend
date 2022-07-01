const express = require('express')
const {viewUser, addUser} = require('../controllers/usercontroller')
const Router =  express.Router

const router = Router()

router.get('/', viewUser)
router.post('/',addUser)

module.exports = router
