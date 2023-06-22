import { useContext } from 'react'
import { useQuery } from 'react-query'
import userService from '../services/users'
import { UserContext } from '../components/UserContext'

const useUsers = (id) => {

  const [loggedInUser] = useContext(UserContext)

  const { data: users = [], isLoading: isLoadingUsers, isError: isUsersError, refetch: refetchUsers } = useQuery('users', userService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!loggedInUser,
    refetchOnMount: !id
  })

  const { data: oneUser, isLoading: isLoadingOneUser, isError: isOneUserError, refetch: refetchOneUser } = useQuery(['user', id], () => userService.getOne(id), {
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!loggedInUser && !!id,
    refetchOnMount: true
  })

  return {
    users,
    isLoadingUsers,
    isUsersError,
    refetchUsers,
    oneUser,
    isLoadingOneUser,
    isOneUserError,
    refetchOneUser
  }
}

export default useUsers
