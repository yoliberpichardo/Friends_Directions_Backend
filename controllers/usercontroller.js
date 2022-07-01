const User = require('../models/User');

const viewUser = async (req, res) => {
    const data = await User.find()
    res.json({
        data
    })
}

const addUser = async(req, res) => {
    console.log( req.body)
    const {name, direction, public, friends} = req.body
    const user = await new User({
        name,
        direction,
        public,
        friends,
        date: new Date(),
    })

    user.save()
        .then(result => {
            return result
        })
        .catch(err => {
            console.error(err);
        })

    res.status(200).send("se agrego correctamente")
}

module.exports = {
    viewUser,
    addUser
}
