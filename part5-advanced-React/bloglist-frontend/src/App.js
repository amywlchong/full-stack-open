import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null, type: null})

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setAndClearNotification = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification({message: null, type: null})
    }, 6000)
  }

  const createBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    blogFormRef.current.toggleVisibility()
    return returnedBlog
  }

  const replaceBlog = async (id, blogObject) => {
    const returnedBlog = await blogService.replace(id, blogObject)
    const updatedBlogs = blogs.map(blog => blog.id === returnedBlog.id
      ? returnedBlog
      : blog)
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async (id) => {
    await blogService.remove(id)
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(updatedBlogs)
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setAndClearNotification('You have been successfully logged out.', 'success')
    } catch (error) {
      setAndClearNotification('Error: There was a problem logging you out. Please try again.', 'error')
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      {user === null &&
        <Togglable buttonLabel='log in'>
          <LoginForm
            setUser={setUser}
            setAndClearNotification={setAndClearNotification} />
        </Togglable>
      }
      {user !== null &&
        <div>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>log out</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
              setAndClearNotification={setAndClearNotification} />
          </Togglable>
        </div>
      }
      <div id="main-blog-container">
        {blogs.sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} replaceBlog={replaceBlog} deleteBlog={deleteBlog} user={user} />)
        }
      </div>
    </div>
  )
}

export default App
