import { useState, useContext } from 'react'
import loginService from '../services/login'
import { NotificationContext } from './NotificationContext'
import PropTypes from 'prop-types'
import { Typography, Button, TextField, Box } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [, showNotification] = useContext(NotificationContext)

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange= ({ target }) => setPassword(target.value)

  const handleLoginClick = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      handleLogin(user)
      showNotification(`Welcome back${user.name !== 'anonymous' ? `, ${user.name}` : ''}! You have successfully logged in.`, 'success')
      setUsername('')
      setPassword('')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showNotification('Wrong username or password', 'error')
      }
    }
  }

  return (
    <form onSubmit={handleLoginClick}>
      <Typography variant="h3">Sign in</Typography>
      <Box sx={{
        display: {
          xs: 'block',
          sm: 'flex',
        },
        alignItems: 'center'
      }}>
        <div>
          <TextField label="username" id="username" value={username} name="Username" onChange={handleUsernameChange} />
        </div>
        <div>
          <TextField label="password" id="password" type="password" value={password} name="Password" onChange={handlePasswordChange} />
        </div>
        <Button variant="contained" id="login-button" type="submit">log in</Button>
      </Box>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
