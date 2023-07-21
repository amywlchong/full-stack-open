import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import useUsers from '../../hooks/useUsers'
import { UserContext } from '../../contexts/UserContext'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

const User = () => {
  const { id } = useParams()

  const [loggedInUser] = useContext(UserContext)
  const { oneUser, isLoadingOneUser, isOneUserError } = useUsers(id)

  const listStyles = { listStyleType: 'disc' }
  const listItemStyles = { display: 'list-item', paddingLeft: '10px' }

  if (!loggedInUser) {
    return <div>Log in to view this page</div>
  }

  if (isLoadingOneUser) {
    return <Loading />
  }

  if (isOneUserError) {
    return <Error />
  }

  // const user = users.find(user => user.id === id)
  const user = oneUser

  return (
    <section>
      <Typography variant="h2">{user.name}</Typography>
      <List style={listStyles}>
        {user.blogs.map(blog =>
          (<ListItem key={blog.id} style={listItemStyles}>
            <ListItemText primary={<Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>} />
          </ListItem>)
        )}
      </List>
    </section>
  )
}

export default User
