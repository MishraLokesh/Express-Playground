const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const logger = require('./middleware/loggers')

const app = express()

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Basic way to setup get request
// app.get('/', (req, res) => {
//   // res.send('<h1>The beginning!!</h1>')
//   res.sendFile(path.join(__dirname, 'public', 'homepage.html'))
// })

// Init middleware
app.use(logger)

// Set static folder    //app.use() -> to use middleware
app.use(express.static(path.join(__dirname, 'public')))

// Members API routes
app.use('/api/members', require('./routes/api/members'))



app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))








