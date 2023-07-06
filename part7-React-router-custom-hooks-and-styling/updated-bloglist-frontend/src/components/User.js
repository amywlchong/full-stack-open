import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import useUsers from '../hooks/useUsers'
import { UserContext } from '../components/UserContext'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

const User = () => {

  const { id } = useParams()

  const [loggedInUser] = useContext(UserContext)
  const { oneUser, isLoadingOneUser, isOneUserError } = useUsers(id)

  if (!loggedInUser) {
    return <div>Log in to view this page</div>
  }

  if (isLoadingOneUser) {
    return <div>Loading...</div>
  }

  if (isOneUserError) {
    return <div>Error: An error occurred while fetching data from the server</div>
  }

  // const user = users.find(user => user.id === id)
  const user = oneUser

  return (
    <section>
      <Typography variant="h2">{user.name}</Typography>
      <List style={{ listStyleType: 'disc' }}>
        {user.blogs.map(blog =>
          (<ListItem key={blog.id} style={{ display: 'list-item', paddingLeft: '10px' }}>
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
