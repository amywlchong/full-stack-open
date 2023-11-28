import { useContext } from "react";
import { useQuery } from "react-query";
import userService from "../services/users";
import { UserContext } from "../contexts/UserContext";

const useUsers = (id) => {
  const [loggedInUser] = useContext(UserContext);

  const {
    data: users = [],
    isLoading: isLoadingUsers,
    isError: isUsersError,
  } = useQuery("users", userService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!loggedInUser && !id,
    refetchOnMount: true,
  });

  const {
    data: oneUser,
    isLoading: isLoadingOneUser,
    isError: isOneUserError,
  } = useQuery(["user", id], () => userService.getOne(id), {
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!loggedInUser && !!id,
    refetchOnMount: true,
  });

  return {
    users,
    isLoadingUsers,
    isUsersError,
    oneUser,
    isLoadingOneUser,
    isOneUserError,
  };
};

export default useUsers;
