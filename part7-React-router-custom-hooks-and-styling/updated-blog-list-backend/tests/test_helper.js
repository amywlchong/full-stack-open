const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mockBlogPost = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu tincidunt tortor aliquam nulla facilisi. Malesuada pellentesque elit eget gravida cum. Eleifend donec pretium vulputate sapien nec. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Varius duis at consectetur lorem donec massa sapien faucibus et. Nisl nisi scelerisque eu ultrices vitae auctor. A diam sollicitudin tempor id eu nisl nunc mi. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Habitasse platea dictumst vestibulum rhoncus est. Purus semper eget duis at tellus at urna. In est ante in nibh mauris cursus mattis. Fermentum odio eu feugiat pretium. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Massa massa ultricies mi quis hendrerit dolor magna eget est. Elit duis tristique sollicitudin nibh sit. Sed euismod nisi porta lorem mollis aliquam ut. Natoque penatibus et magnis dis. Mus mauris vitae ultricies leo integer malesuada nunc vel. Nunc scelerisque viverra mauris in aliquam. Ut enim blandit volutpat maecenas volutpat blandit aliquam. At elementum eu facilisis sed odio. Arcu cursus vitae congue mauris rhoncus aenean vel. Nisl rhoncus mattis rhoncus urna neque. Nunc congue nisi vitae suscipit tellus mauris a. Arcu odio ut sem nulla. Amet massa vitae tortor condimentum lacinia. Duis at tellus at urna condimentum mattis pellentesque id nibh. Lacus sed viverra tellus in. Vitae elementum curabitur vitae nunc. Nec sagittis aliquam malesuada bibendum arcu vitae elementum. Faucibus in ornare quam viverra orci sagittis eu. Mauris vitae ultricies leo integer malesuada.'

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    blogPost: mockBlogPost,
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    blogPost: mockBlogPost,
    likes: 5
  }
]

const newValidBlog = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  blogPost: mockBlogPost,
  likes: 12
}

const blogWithMissingLikes = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  blogPost: mockBlogPost,
}

const blogWithMissingTitle = {
  author: 'Edsger W. Dijkstra',
  blogPost: mockBlogPost,
  likes: 12
}

const blogWithMissingBlogPost = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  likes: 12
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Will remove this soon', blogPost: mockBlogPost })
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
      blogPost: blog.blogPost,
      likes: blog.likes,
      id: blog._id.toString(),
      creator: blog.creator._id.toString(),
      likedBy: blog.likedBy
    }
  })
}

const savedUser = async (username) => {
  const name = 'name'
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username, name, passwordHash })

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
  blogWithMissingBlogPost,
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
