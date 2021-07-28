// indexjs file for our express api
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// for us to be able to post json data to our api
app.use(express.json())

/*
    our api endpoints will be accessed on the route
    /api/members/ on the members.js file
*/
app.use('/api/members', require('./routes/api/members'))

// listening port
app.listen(port, () => {
    console.log(`Backend Listening at Port ${port}`)
})