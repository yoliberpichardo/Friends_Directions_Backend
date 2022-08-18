require('dotenv').config()
const mongoose = require('mongoose');

const db_connect = process.env.DATA_BASE_URL

// conexion a mongodb

const setDatabase = () => {
    mongoose.connect(db_connect)
    .then(() => {
        console.log('**** CONEXION CORRECTA ****')
    }).catch(err => {
        console.log('**** ERROR DE CONEXION ****')
        console.error(err);
    })
}

module.exports = setDatabase