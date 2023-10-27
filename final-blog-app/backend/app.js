const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { tokenExtractor, requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const { info, errorLogger } = require('./utils/logger')
const mongoose = require('mongoose')
const path = require('path')

mongoose.set('strictQuery',false)

info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    errorLogger('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/uploads', express.static('uploads'))

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
