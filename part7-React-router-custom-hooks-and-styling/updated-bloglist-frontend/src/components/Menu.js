import { Link } from 'react-router-dom'
import { useContext } from 'react'
import useAuthentication from '../hooks/useAuthentication'
import { UserContext } from '../contexts/UserContext'
import { NotificationContext } from '../contexts/NotificationContext'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const Menu = () => {
  const { handleLogout } = useAuthentication()
  const [loggedInUser] = useContext(UserContext)
  const [, showNotification] = useContext(NotificationContext)

  const toolbarStyles = {
    display: 'grid',
    gridTemplateColumns: {
      xs: '5% 45% 45% 5%',
      xl: '10% 40% 40% 10%',
    }
  }

  const leftBoxStyles = {
    gridColumn: '2/3',
    display: 'flex',
    justifyContent: 'start'
  }

  const rightBoxStyles = {
    gridColumn: '3/4',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center'
  }

  const typographyStyles = { fontSize: 14 }

  const theme = useTheme()
  const isScreenSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const handleLogoutClick = () => {
    try {
      handleLogout()
      showNotification('You have been successfully logged out.', 'success')
    } catch (error) {
      showNotification('Error: There was a problem logging you out. Please try again.', 'error')
    }
  }

  return (
    <AppBar position="static">
      <Toolbar sx={toolbarStyles}>

        <Box sx={leftBoxStyles}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {loggedInUser !== null && <Button color="inherit" component={Link} to="/users">Users</Button>}
        </Box>

        {loggedInUser &&
          <Box sx={rightBoxStyles}>
            {!isScreenSmall &&
              <Typography
                color="inherit"
                sx={typographyStyles}
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

export default Menu
