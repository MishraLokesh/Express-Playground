const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const members = require('./members')
const logger = require('./middleware/loggers')

const app = express()


// Basic way to setup get request
// app.get('/', (req, res) => {
//   // res.send('<h1>The beginning!!</h1>')
//   res.sendFile(path.join(__dirname, 'public', 'homepage.html'))
// })

// Init middleware
app.use(logger)

// Set static folder    //app.use() -> to use middleware
app.use(express.static(path.join(__dirname, 'public')))


// GETs all members (could be the same as retrieving data from database, except here we are hard coding in js object)
app.get('/api/members', (req, res) => {
  res.json(members)
})





app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))








