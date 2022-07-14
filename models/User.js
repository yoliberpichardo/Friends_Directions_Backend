const mongoose = require('mongoose')
const { model, Schema } = mongoose

const register = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    direction: {
        type: Array,
        default: []
    },
    public: {
        type: Boolean,
        default: true
    },
    friends: {
        type: Array,
        default: []
    },
    date:{
        type: Date,
        default: new Date()
    },
    request_received:{
        type: Array,
        default: []
    },
    resquet_send:{
        type: Array,
        default: []
    }

})

register.method("toJSON",function (){
    const { __v, _id, password, ...rest} = this.toObject()
    rest.uid = _id
    return rest
})

const User = model('Users', register)

module.exports = User