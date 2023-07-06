import { useEffect, useContext, useRef } from 'react'
import { useQueryClient } from 'react-query'
import { Routes, Route, useMatch } from 'react-router-dom'
import UserList from './components/UserList'
import User from './components/User'
import userService from './services/users'
import useBlogs from './hooks/useBlogs'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Menu from './components/Menu'
import Notification from './components/Notification'
import { UserContext } from './components/UserContext'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { Container, Typography } from '@mui/material'

const App = () => {

  const queryClient = useQueryClient()
  const [loggedInUser, loggedInUserDispatch] = useContext(UserContext)
  const blogFormRef = useRef()
  const matchRootPath = useMatch('/')
  const matchBlogsIdPath = useMatch('/blogs/:id')

  const { blogs, isLoading: isLoadingBlogs, isError: isBlogsError, createBlog, updateBlog, deleteBlog } = useBlogs()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      loggedInUserDispatch({type: 'SET_USER', payload: user})
      blogService.setToken(user.token)
      userService.setToken(user.token)
    }
  }, [])

  const handleLogin = (user) => {
    blogService.setToken(user.token)
    userService.setToken(user.token)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    loggedInUserDispatch({type:'SET_USER', payload: user})
  }

  const handleLogout = () => {
    blogService.setToken(null)
    userService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    loggedInUserDispatch({type: 'LOG_OUT'})
    queryClient.removeQueries('users')
  }

  if (isLoadingBlogs) {
    return <div>Loading...</div>
  }

  if (isBlogsError) {
    return <div>Error: An error occurred while fetching data from the server</div>
  }

  return (
    <div>
      <Menu handleLogout={handleLogout} />
      <Container>
        <Typography variant="h1">Blogs</Typography>
        <Notification />
        {loggedInUser === null &&
        <Togglable buttonLabel="log in">
          <LoginForm handleLogin={handleLogin}/>
        </Togglable>
        }
        {loggedInUser !== null && (matchRootPath || matchBlogsIdPath) &&
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog} blogFormRef={blogFormRef}/>
          </Togglable>
        </div>
        }
        <Routes>
          <Route path="/blogs/:id" element={<Blog blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<BlogList blogs={blogs} />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
