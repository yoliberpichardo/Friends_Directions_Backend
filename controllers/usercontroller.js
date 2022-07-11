const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {singInJWT} = require('../middlewares/authentication')

const viewUser = async (req, res) => {
    const data = await User.find()  
    res.json({
        data
    })
}

const register = async(req, res) => {
    const {name, email, password, direction, public, friends} = req.body

    const passwordHash = await bcrypt.hash(password, 8)
    const user = new User({
        name,
        email,
        password: passwordHash,
        direction,
        public,
        friends
    })

    await user.save()
    
    res.status(200).json({
       user
    })
}

const loginUser = async(req, res) => { 
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({
            msj: "este email no esta registrado"
        })
    }

    const comparePassword = bcrypt.compareSync(password, user.password)

    if(!comparePassword){
        return res.status(404).json({
            msj: "este email no esta registrado"
        })
    }

    const token = await singInJWT(user)

    res.status(200).json({
            token,
            user
    })
}



module.exports = {
    viewUser,
    register,
    loginUser
}
