import { useContext } from 'react'
import loginService from '../../services/login'
import useAuthentication from '../../hooks/useAuthentication'
import useField from '../../hooks/useField'
import { NotificationContext } from '../../contexts/NotificationContext'
import { Typography, Button, Box, Stack } from '@mui/material'
import CustomFormLabel from '../FormComponents/CustomFormLabel'
import CustomTextField from '../FormComponents/CustomTextField'

import { useModal } from '../../contexts/ModalContext'

const LoginForm = () => {
  const { handleLogin } = useAuthentication()
  const {
    value: username,
    onChange: handleUsernameChange,
    reset: resetUsername,
  } = useField('text')
  const {
    value: password,
    onChange: handlePasswordChange,
    reset: resetPassword,
  } = useField('text')
  const [, showNotification] = useContext(NotificationContext)
  const { closeLoginModal } = useModal()

  const handleLoginClick = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      handleLogin(user)
      closeLoginModal()
      showNotification(
        `Welcome back${user.name !== 'anonymous' ? `, ${user.name}` : ''}! You have successfully logged in.`,
        'success',
        'page-top'
      )
      resetUsername()
      resetPassword()
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showNotification('Wrong username or password', 'error', 'modal')
      } else {
        showNotification(
          'Error: There was a problem logging you in. Please try again.',
          'error',
          'modal'
        )
      }
    }
  }

  return (
    <form onSubmit={handleLoginClick}>
      <Typography
        fontWeight='700'
        variant='h2'
        mb={1}
        align='center'
        color='black'
      >
        Sign In
      </Typography>

      <Stack spacing={1}>
        <Box>
          <CustomFormLabel htmlFor='username'>Username</CustomFormLabel>
          <CustomTextField
            label='Enter Your Username Here.....'
            id='username'
            value={username}
            name='Username'
            variant='outlined'
            fullWidth
            onChange={handleUsernameChange}
            autoComplete='off'
          />
        </Box>

        <Box>
          <CustomFormLabel htmlFor='password'>Password</CustomFormLabel>
          <CustomTextField
            label='Enter Your Password Here.....'
            id='password'
            name='Password'
            type='password'
            variant='outlined'
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
        </Box>

        <Box>
          <Button
            id="login-button"
            color='secondary'
            variant='contained'
            size='large'
            fullWidth
            type='submit'
          >
            Log In
          </Button>
        </Box>
      </Stack>
    </form>
  )
}

export default LoginForm
