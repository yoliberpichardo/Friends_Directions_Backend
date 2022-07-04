const express = require('express')
const {viewUser, register} = require('../controllers/usercontroller')
const Router =  express.Router

const router = Router()

router.get('/', viewUser)
router.post('/',register )

module.exports = router
