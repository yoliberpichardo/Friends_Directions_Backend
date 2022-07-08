require('dotenv').config()

// const {singInJWT} = require('../middlewares/authentication');
const setDatabase = require('./configs/database')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT

setDatabase()

app.use(express.json());
app.use(cors())
app.use('/',require('./Routes/routes'))
app.use('/', require('./Routes/routes'))
app.use('/', require('./Routes/routes'))

app.listen(PORT,() =>{
    console.log(`Listenend on port http://localhost:${PORT}`)
})