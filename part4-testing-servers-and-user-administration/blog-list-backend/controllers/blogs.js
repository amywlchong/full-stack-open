const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('creator', { username: 1, name: 1 })
    .populate('updatedBy', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    creator: user.id,
    updatedBy: []
  })

  const savedBlog = await blog.save()
  await savedBlog
    .populate('creator', { username: 1, name: 1 })

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (blog.creator.toString() !== request.user.id) {
    return response.status(403).json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  let blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  blog.updatedBy = blog.updatedBy.concat(request.user._id)

  const updatedBlog = await blog.save()
  await updatedBlog
    .populate('creator', { username: 1, name: 1 })
  await updatedBlog
    .populate('updatedBy', { username: 1, name: 1 })

  response.json(updatedBlog)
})

module.exports = blogsRouter
