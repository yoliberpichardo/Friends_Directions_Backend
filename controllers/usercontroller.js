const User = require('../models/User');

const viewUser = async (req, res) => {
    const data = await User.find()
    console.log(data);  
    res.json({
        data
    })
}

const register = async(req, res) => {
    const user = new User(req.body)

    // user.password = '012'

    await user.save()
    
    // res.status(200).json(user.password)
    res.status(200).json({
       user
    })
}

module.exports = {
    viewUser,
    register
}
