const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config
const connectDB = require('./config/database')

connectDB()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use(express.urlencoded({extended:false}))


 app.use('/api/users',require('./routes/userRoutes'))


app.listen(port, ()=>{ console.log(`App listening on port ${port}`)

})