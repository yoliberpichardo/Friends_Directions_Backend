const User = require('../models/User');

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
        msg: 'solicitud acceptada',
        myUser,
        user
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

module.exports = {
    requestSend,
    declineRequest,
    acceptFriend
}