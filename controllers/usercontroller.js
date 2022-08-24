const User = require('../models/User');
const bcrypt = require('bcrypt')
const { singInJWT } = require('../middlewares/authentication')

const myUser = async (req, res) => {
    const myID = req.token

    const data = await User.findById(myID)

    res.status(200).json({
        data
    })
}

const viewUser = async (req, res) => {
    const myID = req.token

    const data = await User.find()

    const dataFilter = data.filter(element => {
        if (element._id != myID) {
            return element
        }
    })

    res.status(200).json({
        dataFilter
    })
}

const register = async (req, res) => {
    const { name, email, password } = req.body

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
        return res.send({ msg: "este usuario no esta registrado" })
    } else {
        comparePassword = bcrypt.compareSync(password, user.password)
    }

    if (!comparePassword) {
        return res.send({ msg: "esta contraseña no es correcta, por favor verifica e introduzcala de nuevo" })
    }

    const token = await singInJWT(user)

    res.status(200).json({
        token,
        user
    })
}

const editUserDirection = async (req, res) => {
    const myID = req.token
    const { direction } = req.body

    const user = await User.findByIdAndUpdate(myID, {$set: { 'direction': direction } }, { new: true })

    if(!user){
        return res.json({
            msg: "Este usuario no se encuentra"
        })
    }

    return res.status(200).json({
        msg: "cambio realizado", user
    })

}

const editUserPublic = async (req, res) => {
    const myID = req.token
    const { isPublic } = req.body

    
    const user = await User.findByIdAndUpdate(myID, { 'public': isPublic }, { new: true })

    if(!user){
        return res.json({
            msg: "Este usuario no se encuentra"
        })
    }

    return res.status(200).json({
        msg: "cambio realizado", user
    })

}

const requestSend = async (req, res) => {
    const { friendID } = req.body
    const myID = req.token

    const myuser = await User.findByIdAndUpdate(myID, { $push: { 'request_send': friendID } }, { new: true })
    const friend = await User.findByIdAndUpdate(friendID, { $push: { 'request_received': myID } }, { new: true })

    if (friend._id === myID) {
        return res.status(500).json({
            msg: "No puedes enviarte solicitud"
        })
    }

    if (!friend || !myuser) {
        return res.status(404).json({
            msg: "El usuario no existe"
        })
    }

    res.status(200).json({
        msg: 'solicitud enviada',
        myuser
    })

}

const getFriendsNumber = async (req, res) => {
    const myID = req.token

    const data = await User.findById(myID).select("request_received -_id")

    if (!data) {
        return res.status(404).json({
            msg: "usuario no encontrado"
        })
    }

    res.status(200).json({
        data
    })

}


const acceptFriend = async (req, res) => {
    const { userID } = req.body
    const myID = req.token


    const myUser = await User.findByIdAndUpdate(myID, { $push: { 'friends': userID }, $pull: { 'request_received': userID } }, { new: true })
    const user = await User.findByIdAndUpdate(userID, { $push: { 'friends': myID }, $pull: { 'request_send': myID } }, { new: true })



    if (!user || !myUser) {
        return res.status(404).json({
            msg: "usuario no encontrado"
        })
    }


    res.status(200).json({
        msg: 'solicitud acceptada'
    })
}

const declineRequest = async (req, res) => {
    const { userID } = req.body
    const myID = req.token

    const myUser = await User.findByIdAndUpdate(myID, { $pull: { 'request_received': userID } }, { new: true })
    const user = await User.findByIdAndUpdate(userID, { $pull: { 'request_send': myID } }, { new: true })


    if (!user || !myUser) {
        return res.status(404).json({
            msg: "usuario no encontrado"
        })
    }

    res.status(200).json({
        msg: 'solicitud rechazada'
    })
}

const getAllUsers = async (req, res) => {
    const myID = req.token
    let { q = '' } = req.query
    q = q.toString().toLocaleLowerCase();

    if (!q) {
        const [dataFriends, dataPublic] = await Promise.all([
            User.find({ 'friends': { $in: myID } }),
            User.find({ 'public': true, 'friends': { $nin: myID } })
        ])

        return res.status(200).json({
            dataFriends,
            dataPublic
        })
    }

    const [dataFriends, dataPublic] = await Promise.all([
        User.find({ 'name': { $regex: q, $options: "i" }, 'friends': { $in: myID } }),
        User.find({ 'name': { $regex: q, $options: "i" }, 'public': true, 'friends': { $nin: myID } })
    ])

    return res.status(200).json({
        dataFriends,
        dataPublic
    })
}

const getUsersByID = async (req, res) => {
    const myID = req.token
    let { q = '' } = req.query
    q = q.toString().toLocaleLowerCase();

    const data = await User.find({ 'name': { $regex: q, $options: "i" }, 'friends': { $nin: myID } })

    if (!data) {
        return res.status(404).json({
            msg: "usuario no encontrado"
        })
    }

    res.status(200).json({
        data
    })
}

const searchUsers = async (req, res) => {
    const myID = req.token
    const { usersID } = req.body

    const data = await User.find({ _id: { $in: usersID } })

    if (!data) {
        return res.status(404).json({
            msg: "usuario no encontrado"
        })
    }

    res.status(200).json({
        data
    })
}

module.exports = {
    viewUser,
    register,
    loginUser,
    editUserDirection,
    editUserPublic,
    requestSend,
    myUser,
    getFriendsNumber,
    getUsersByID,
    acceptFriend,
    getAllUsers,
    searchUsers,
    declineRequest
}
