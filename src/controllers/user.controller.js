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

const editUser = async (req, res) => {
    const myID = req.token
    const { direction, isPublic } = req.body

    const dataToUpdate = {
        ...(direction && {direction}),
        ...(isPublic && {public: isPublic})
    }

    const user = await User.findByIdAndUpdate(myID, dataToUpdate, { new: true })


    if (!user) {
        return res.json({
            msg: "Este usuario no se encuentra"
        })
    }

    return res.status(200).json({
        msg: "cambio realizado", user
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
    editUser,
    myUser,
    getFriendsNumber,
    getUsersByID,
    getAllUsers,
    searchUsers,
}
