const moment = require('moment')


// Create a middleware (middlewares are basically used to perform any functions when a req is hit, we have access to req res so we can perform anyting in it)  usually we don't create middleware but we directly use it 
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
  next()
}



module.exports = logger