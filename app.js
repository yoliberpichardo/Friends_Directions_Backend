require('dotenv').config()

const setDatabase = require('./configs/database')
const express = require('express')
const app = express()
const PORT = process.env.PORT

setDatabase()

app.use(express.json());
app.use('/get', require('./Routes/routes'))
app.use('/post', require('./Routes/routes'))

app.listen(PORT,() =>{
    console.log(`Listenend on port http://localhost:${PORT}`)
})