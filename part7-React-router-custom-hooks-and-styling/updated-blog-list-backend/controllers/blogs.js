const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor, checkBlogExists } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .select('title author likes')

  response.json(blogs)
})

blogsRouter.get('/:id', checkBlogExists, async (request, response) => {
  const blog = request.blog
  await blog.populate('creator', { username: 1, name: 1 })
  await blog.populate('comments.commenter', { username: 1, name: 1})

  response.json(blog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    blogPost: body.blogPost,
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

blogsRouter.delete('/:id', userExtractor, checkBlogExists, async (request, response) => {
  const id = request.params.id
  const blog = request.blog

  if (blog.creator.toString() !== request.user.id) {
    return response.status(403).json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndRemove(id)

  const user = await User.findById(request.user.id)
  user.blogs = user.blogs.filter(blogId => blogId.toString() !== id)
  await user.save()

  response.status(204).end()
})


blogsRouter.put('/:id', userExtractor, checkBlogExists, async (request, response) => {

  const { title, author, blogPost, likes } = request.body
  const blog = request.blog

  blog.title = title
  blog.author = author
  blog.blogPost = blogPost
  blog.likes = likes
  blog.likedBy = blog.likedBy.concat(request.user.id)

  const updatedBlog = await blog.save()
  await updatedBlog.populate('creator', { username: 1, name: 1 })
  await updatedBlog.populate('comments.commenter', { username: 1, name: 1})

  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', userExtractor, checkBlogExists, async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = request.blog

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
