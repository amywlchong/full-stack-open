import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import UserList from './components/UserList'
import User from './components/User'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Menu from './components/Menu'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { Container, Typography } from '@mui/material'

const App = () => {

  const [loggedInUser] = useContext(UserContext)

  return (
    <div>
      <Menu />
      <Container>
        <Typography variant="h1">Blogs</Typography>

        <Notification />

        {loggedInUser === null &&
        <Togglable buttonLabel="log in">
          <LoginForm />
        </Togglable>
        }

        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<BlogList />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
