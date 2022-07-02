const mongoose = require('mongoose')
const { model, Schema } = mongoose

const newUser = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    direction: {
        type: String,
    },
    public: {
        type: Boolean,
    },
    friends: {
        type: Array,
    },
    date:  {
        type: Date,
    }

})

const User = model('Users', newUser)

module.exports = User