const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

usersRouter.get('/', userExtractor, async (request, response, next) => {

  try {
    const users = await User
      .find({})

    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', userExtractor, async (request, response, next) => {

  const id = request.params.id

  try {
    const user = await User
      .findById(id)
      .populate('blogs', { blogPost: 1, title: 1, author: 1})

    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.password) {
    return response.status(400).json({ error: '`password` is required' })
  }
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
