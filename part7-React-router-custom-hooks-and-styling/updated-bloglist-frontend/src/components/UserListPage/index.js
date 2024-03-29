import { useContext } from 'react'
import { Link } from 'react-router-dom'
import useUsers from '../../hooks/useUsers'
import { UserContext } from '../../contexts/UserContext'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const UserList = () => {

  const [loggedInUser] = useContext(UserContext)
  const { users, isLoadingUsers, isUsersError } = useUsers()

  if (!loggedInUser) {
    return <div>Log in to view this page</div>
  }

  if (isLoadingUsers) {
    return <Loading />
  }

  if (isUsersError) {
    return <Error />
  }

  return (
    <div>
      <Typography variant="h2">Users</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.sort((a, b) => (b.blogs.length - a.blogs.length))
              .map(user =>
                (<TableRow key={user.id}>
                  <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
