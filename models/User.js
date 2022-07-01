const mongoose = require('mongoose')
const { model, Schema } = mongoose

const newUser = new Schema({
    name: String,
    direction: String,
    public: Boolean,
    friends: Array,
    date: Date

})

const User = model('Users', newUser)

module.exports = User