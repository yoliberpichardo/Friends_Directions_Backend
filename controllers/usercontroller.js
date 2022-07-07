const User = require('../models/User');
const jwt = require('jsonwebtoken')

const viewUser = async (req, res) => {
    const data = await User.find()
    console.log(data);  
    res.json({
        data
    })
}

const register = async(req, res) => {
    const user = new User(req.body)

    await user.save()
    
    res.status(200).json({
       user
    })
}

const loginUser = async(req, res) => {
    
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err){
            res.sendStatus(403)
        }else {
            res.json({
                mensaje: 'fghjkl',
                authData
            })
        }
    })
    
}

module.exports = {
    viewUser,
    register,
    loginUser
}
