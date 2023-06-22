const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

mongoose.set('bufferTimeoutMS', 30000)

let initialUser
let headers

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  initialUser = await helper.savedUser('root')
  const token = helper.tokenOfSavedUser(initialUser)
  headers = {
    'Authorization': `Bearer ${token}`,
  }

  await Blog.insertMany(helper.initialBlogs.map((blog) => ({ ...blog, user: initialUser._id, })))
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have the id property and not the _id property', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBeUndefined()
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toContainEqual(expect.objectContaining(helper.initialBlogs[0]))
  })
})

describe('GET /api/blogs/:id', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('POST /api/blogs', () => {
  test('a valid blog can be added with a valid token', async () => {
    const response = await api
      .post('/api/blogs')
      .set(headers)
      .send(helper.newValidBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.user.id).toEqual(initialUser._id.toString())

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAfterPost).toContainEqual(expect.objectContaining(helper.newValidBlog))
  }, 100000)

  test('fails with status code 401 if blog is being added without a token', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(helper.newValidBlog)
      .expect(401)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAfterPost)
  })

  test('fails with status code 400 if blog is being added with a malformed token', async () => {
    headers.Authorization = 'Bearer invalidtoken'

    const blogsAtStart = await helper.blogsInDb()

    const result = await api
      .post('/api/blogs')
      .set(headers)
      .send(helper.newValidBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('jwt malformed')

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAfterPost)
  })

  test('the likes property defaults to 0', async () => {
    const response = await api
      .post('/api/blogs')
      .set(headers)
      .send(helper.blogWithMissingLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('fails with status code 400 if the title or url property is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .set(headers)
      .send(helper.blogWithMissingTitle)
      .expect(400)

    let blogsAfterPost = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAfterPost)

    await api
      .post('/api/blogs')
      .set(headers)
      .send(helper.blogWithMissingUrl)
      .expect(400)

    blogsAfterPost = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAfterPost)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('succeeds with status code 204 if id is valid and the token belongs to the creator', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers) // headers with token belonging to the creator from beforeEach
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAtEnd).not.toContainEqual(expect.objectContaining(blogToDelete))
  })

  test('fails with status code 403 if the token does not belong to the creator', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const anotherUser = await helper.savedUser('myusername')
    const tokenOfAnotherUser = helper.tokenOfSavedUser(anotherUser)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${tokenOfAnotherUser}`)
      .expect(403)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAtEnd)
  })

  test('fails with status code 401 if blog is being deleted without a token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAtEnd)
  })

  test('fails with status code 400 if blog is being deleted with a malformed token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    headers.Authorization = 'Bearer invalidtoken'

    const result = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('jwt malformed')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAtEnd)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set(headers)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAtEnd)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('succeeds with a valid id and a valid token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogtoUpdate = blogsAtStart[0]

    const anotherUser = await helper.savedUser('myusername')
    const tokenOfAnotherUser = helper.tokenOfSavedUser(anotherUser)

    await api
      .put(`/api/blogs/${blogtoUpdate.id}`)
      .set('Authorization', `Bearer ${tokenOfAnotherUser}`)
      .send(helper.newValidBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAfterUpdate).toHaveLength(blogsAtStart.length)
    expect(blogsAfterUpdate).toContainEqual(expect.objectContaining(helper.newValidBlog))
  })

  test('fails with status code 401 if blog is being updated without a token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(helper.newValidBlog)
      .expect(401)

    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAfterUpdate)
  })

  test('fails with status code 400 if blog is being updated with a malformed token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    headers.Authorization = 'Bearer invalidtoken'

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set(headers)
      .send(helper.newValidBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('jwt malformed')

    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAfterUpdate)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const validNonExistingId = await helper.nonExistingId()

    await api
      .put(`/api/blogs/${validNonExistingId}`)
      .set(headers)
      .send(helper.newValidBlog)
      .expect(404)

    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAfterUpdate)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .put(`/api/blogs/${invalidId}`)
      .set(headers)
      .send(helper.newValidBlog)
      .expect(400)

    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAfterUpdate)
  })

  test('fails with status code 400 if the title or url property is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const initialBlogs = await helper.blogsInDb()
    const blogtoUpdate = initialBlogs[0]

    await api
      .put(`/api/blogs/${blogtoUpdate.id}`)
      .set(headers)
      .send(helper.blogWithMissingTitle)
      .expect(400)

    let blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAfterUpdate)

    await api
      .put(`/api/blogs/${blogtoUpdate.id}`)
      .set(headers)
      .send(helper.blogWithMissingUrl)
      .expect(400)

    blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAfterUpdate)
  })
})

describe('POST /api/users', () => {
  test('a valid user can be added', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(helper.newValidUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    expect(usersAtEnd).toContainEqual(
      expect.objectContaining({
        username: helper.newValidUser.username,
        name: helper.newValidUser.name
      })
    )
  })

  test('fails with status code 400 and appropriate error message if the username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(helper.userWithoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('fails with status code 400 and appropriate error message if the username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(helper.userWithShortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toMatch(/username.*is shorter than the minimum allowed length/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('fails with status code 400 and apropriate error message if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(helper.userWithDuplicateUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('fails with status code 400 and appropriate error message if the password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(helper.userWithoutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`password` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('fails with status code 400 and appropriate error message if the password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(helper.userWithShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
