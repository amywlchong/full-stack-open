import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({
  setUser,
  setAndClearNotification
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange= ({ target }) => setPassword(target.value)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setAndClearNotification(`Welcome back${user.name !== 'anonymous' ? `, ${user.name}` : ''}! You have successfully logged in.`, 'success')
      setUsername('')
      setPassword('')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAndClearNotification('Wrong username or password', 'error')
      }
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h3>Sign in</h3>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">log in</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setAndClearNotification: PropTypes.func.isRequired
}

export default LoginForm
