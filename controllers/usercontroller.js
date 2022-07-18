const User = require('../models/User');
const bcrypt = require('bcrypt')
const { singInJWT } = require('../middlewares/authentication')

const viewUser = async (req, res) => {
    const myID = req.token

    const data = await User.find()
    
    const dataFilter = data.filter(element => {
        if(element._id != myID){
           return element
        }
    })

    res.status(200).json({
        dataFilter
    })
}

const register = async (req, res) => {
    const { name, email, password} = req.body

    if (!name || !email || !password) {
        return res.json({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
        return res.json({ msg: 'Password must be at least 6 characters' });
    }

    const passwordHash = await bcrypt.hash(password, 8)
    const user = new User({
        name,
        email,
        password: passwordHash
    })

    await user.save()

    return res.status(200).json({
        user
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    let comparePassword = ''

    if (!email || !password) {
        return res.send({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.send({msg: "este usuario no esta registrado"})
    } else{
        comparePassword = bcrypt.compareSync(password, user.password)
    }   

    if (!comparePassword) {
        return res.send({msg: "esta contraseña no es correcta, por favor verifica e introduzcala de nuevo"})
    }

    const token = await singInJWT(user)

    res.status(200).json({
        token,
        user
    })
}

const editUser = async (req, res) => {
    const id = req.params.id
    const { direction, public } = req.body

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({
            msg: "este usuario no esta registrado"
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

    return res.status(200).json({
        msj: "sesion iniciada correctamente", user
    })

}

const resquetSend = async (req,res) => {
    const {friendID} = req.body
    const myID = req.token
    
    const friend = await User.findById(friendID)
    const user = await User.findById(myID)

    if(friend._id === myID){
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
        user.resquet_send.push(friend._id)
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
