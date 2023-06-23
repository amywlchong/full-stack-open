const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const newValidBlog = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12
}

const blogWithMissingLikes = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
}

const blogWithMissingTitle = {
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12
}

const blogWithMissingUrl = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  likes: 12
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Will remove this soon', url: 'http://www.will-remove-this-soon.com'})
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('creator', { username: 1, name: 1 })
  return blogs.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      id: blog._id.toString(),
      creator: blog.creator._id.toString(),
      updatedBy: blog.updatedBy
    }
  })
}

const savedUser = async (username) => {
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username, passwordHash })

  await user.save()
  return user
}

const tokenOfSavedUser = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  return token
}

const newValidUser = {
  username: 'deer',
  name: 'i am a deer',
  password: 'gooddeer',
}

const userWithoutUsername = {
  name: 'i am a deer',
  password: 'gooddeer',
}

const userWithShortUsername = {
  username: 'd',
  name: 'i am a deer',
  password: 'gooddeer',
}

const userWithDuplicateUsername = {
  username: 'root',
  password: 'secret123'
}

const userWithoutPassword = {
  username: 'deer',
  name: 'i am a deer',
}

const userWithShortPassword = {
  username: 'deer',
  name: 'i am a deer',
  password: 'g',
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  newValidBlog,
  blogWithMissingLikes,
  blogWithMissingTitle,
  blogWithMissingUrl,
  nonExistingId,
  blogsInDb,
  savedUser,
  tokenOfSavedUser,
  newValidUser,
  userWithoutUsername,
  userWithShortUsername,
  userWithDuplicateUsername,
  userWithoutPassword,
  userWithShortPassword,
  usersInDb
}
