const User = require('../models/User');

const viewUser = async (req, res) => {
    const data = await User.find()
    res.json({
        data
    })
}

const addUser = async(req, res) => {
    console.log( req.body)
    const user =  new User(req.body)

    await user.save()

    res.status(200).json({
        user
    })
}

module.exports = {
    viewUser,
    addUser
}
