const User = require('../models/User');
const bcrypt = require('bcrypt')
const { singInJWT } = require('../middlewares/authentication')

const viewUser = async (req, res) => {
    const data = await User.find()
    res.json({
        data
    })
}

const register = async (req, res) => {
    const { name, email, password} = req.body
    let errors = [];

    if (!name || !email || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.json({
          errors,
          name,
          email,
          password,
        });
    }else {
        const passwordHash = await bcrypt.hash(password, 8)
        const user = new User({
            name,
            email,
            password: passwordHash
        })

        await user.save()

        res.status(200).json({
            user
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    let errors = []
    let comparePassword = ''

    if (!email || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ email })
    if (!user) {
        errors.push({msj: "este usuario no esta registrado"})
    } else{
        comparePassword = bcrypt.compareSync(password, user.password)
    }   

    if (!comparePassword) {
        errors.push({msj: "esta contraseña no es correcta"})
    }

    if(errors.length > 0){
       res.json({
        errors,
        password,
        email
       })
    } else {
        const token = await singInJWT(user)

        res.status(200).json({
            token,
            user
        })
    }
}

const editUser = async (req, res) => {
    const id = req.params.id
    const { direction, public } = req.body

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({
            msj: "este usuario no esta registrado"
        })
    }

    // change direction
    if(direction) {
        user.direction = direction
    }

    // change public 
    if(public){
        user.public = public
    }

    user.save()

    res.status(200).json({
        msj: "ok", user
    })

}

const resquetSend = async (req,res) => {
    const {friendID} = req.body
    const myID = req.token
    
    const friend = await User.findById(friendID)
    const user = await User.findById(myID)

    if(friend._id === friendID){
        return res.status(500).json({
            msg: "No puedes enviarte solicitud"
        })
    }

    if(!friend || !user){
        return res.status(404).json({
            msg: "El usuario no existe"
        })
    } else{
        friend.request_received.push(myID)
        user.resquet_send.push(myID)
    }

    
    await friend.save()
    await user.save()
    res.status(200).json({
        msg: 'solicitud enviada',
        user
    })   
    
}

module.exports = {
    viewUser,
    register,
    loginUser,
    editUser,
    resquetSend
}
