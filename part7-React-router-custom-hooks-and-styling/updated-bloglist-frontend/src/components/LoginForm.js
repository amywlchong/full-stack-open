import { useContext } from 'react'
import loginService from '../services/login'
import useAuthentication from '../hooks/useAuthentication'
import useField from '../hooks/useField'
import { NotificationContext } from '../contexts/NotificationContext'
import { Typography, Button, TextField, Box } from '@mui/material'

const LoginForm = () => {
  const { handleLogin } = useAuthentication()
  const { value: username, onChange: handleUsernameChange, reset: resetUsername } = useField('text')
  const { value: password, onChange: handlePasswordChange, reset: resetPassword } = useField('text')
  const [, showNotification] = useContext(NotificationContext)

  const responsiveContainerStyles = {
    display: {
      xs: 'block',
      sm: 'flex',
    },
    alignItems: 'center'
  }

  const handleLoginClick = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      handleLogin(user)
      showNotification(`Welcome back${user.name !== 'anonymous' ? `, ${user.name}` : ''}! You have successfully logged in.`, 'success')
      resetUsername()
      resetPassword()
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showNotification('Wrong username or password', 'error')
      } else {
        showNotification('Error: There was a problem logging you in. Please try again.', 'error')
      }
    }
  }

  return (
    <form onSubmit={handleLoginClick}>
      <Typography variant="h3">Sign in</Typography>
      <Box sx={responsiveContainerStyles}>
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

export default LoginForm
