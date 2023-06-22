import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './UserContext'
import { NotificationContext } from './NotificationContext'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const Menu = ({ handleLogout }) => {
  const [loggedInUser] = useContext(UserContext)
  const [, showNotification] = useContext(NotificationContext)

  const handleLogoutClick = () => {
    try {
      handleLogout()
      showNotification('You have been successfully logged out.', 'success')
    } catch (error) {
      showNotification('Error: There was a problem logging you out. Please try again.', 'error')
    }
  }

  const theme = useTheme()
  const isScreenSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <AppBar position="static">
      <Toolbar sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '5% 45% 45% 5%',
          xl: '10% 40% 40% 10%',
        }
      }}>

        <Box sx={{ gridColumn: '2/3', display: 'flex', justifyContent: 'start'}}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {loggedInUser !== null && <Button color="inherit" component={Link} to="/users">Users</Button>}
        </Box>

        {loggedInUser &&
          <Box sx={{ gridColumn: '3/4', display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
            {!isScreenSmall &&
              <Typography
                component="div"
                color="inherit"
                sx={{ fontSize: 14 }}
              >
              Logged in as {loggedInUser.name}
              </Typography>}
            <Button color="inherit" onClick={handleLogoutClick}>log out</Button>
          </Box>
        }
      </Toolbar>
    </AppBar>
  )
}

Menu.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default Menu
