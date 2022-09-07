require('dotenv').config()

// const {singInJWT} = require('../middlewares/authentication');
const setDatabase = require('./src/configs/database')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT

setDatabase()

app.use(express.json());
app.use(cors())
app.use('/',require('./src/Routes/routes'))

app.listen(PORT,() =>{
    console.log(`Listenend on port http://localhost:${PORT}`)
})