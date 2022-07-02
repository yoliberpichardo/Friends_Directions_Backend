const mongoose = require('mongoose')

const connectionString = process.env.DATA_BASE_URL;

// conexion a mongodb

const setDatabase = () => {
    mongoose.connect(connectionString)
    .then(() => {
        console.log('**** CONEXION CORRECTA ****')
    }).catch(err => {
        console.log('**** ERROR DE CONEXION ****')
        console.error(err);
    })
}

module.exports = setDatabase