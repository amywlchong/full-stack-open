const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .select('title author likes')

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog
    .findById(id)
    .populate('creator', { username: 1, name: 1 })
    .populate('comments.commenter', { username: 1, name: 1})

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
    creator: user.id,
    likes: body.likes || 0,
    likedBy: [],
    comments: []
  })

  const savedBlog = await blog.save()
  await savedBlog.populate('creator', { username: 1, name: 1 })

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const id = request.params.id

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.creator.toString() !== request.user.id) {
    return response.status(403).json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  blog.likedBy = blog.likedBy.concat(request.user.id)

  const updatedBlog = await blog.save()
  await updatedBlog.populate('creator', { username: 1, name: 1 })
  await updatedBlog.populate('comments.commenter', { username: 1, name: 1})

  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (/^\s*$/.test(body.comment)) {
    return response.status(400).json({ error: 'Comment must not be empty' })
  }

  const newComment = {
    comment: body.comment,
    commenter: user.id
  }

  blog.comments = blog.comments.concat(newComment)

  const updatedBlog = await blog.save()
  await updatedBlog.populate('comments.commenter', { username: 1, name: 1})

  const savedComment = updatedBlog.comments[updatedBlog.comments.length - 1]

  response.status(201).json(savedComment)
})

module.exports = blogsRouter
