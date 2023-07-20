const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

usersRouter.get('/', userExtractor, async (request, response) => {

  const users = await User
    .find({})

  response.json(users)
})

usersRouter.get('/:id', userExtractor, async (request, response) => {

  const id = request.params.id

  const user = await User
    .findById(id)
    .populate('blogs', { url: 1, title: 1, author: 1})

  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password) {
    return response.status(400).json({ error: '`password` is required' })
  }
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter