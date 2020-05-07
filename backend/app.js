const express = require('express')
const bodyParser = require('body-parser')
const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

mongoose.connect("mongodb+srv://armen:armen123@cluster0-iem0j.mongodb.net/mean2?retryWrites=true&w=majority")
  .then(() => {
    console.log('Conected to database')
  })
  .catch(() => {
    console.log('Conection failed')
  })

// cors //
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With')
  next()
})
/////////

app.use('/api/posts', postsRoutes)
app.use('/api/user', userRoutes)

app.listen(3000, () => {
  console.log('server has been started')
})
