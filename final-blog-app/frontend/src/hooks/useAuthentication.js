import { useEffect, useContext } from "react";
import { useQueryClient } from "react-query";
import userService from "../services/users";
import blogService from "../services/blogs";
import { UserContext } from "../contexts/UserContext";

const useAuthentication = () => {
  const queryClient = useQueryClient();
  const [, loggedInUserDispatch] = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      loggedInUserDispatch({ type: "SET_USER", payload: user });
      blogService.setToken(user.token);
      userService.setToken(user.token);
    }
  }, []);

  const handleLogin = (user) => {
    blogService.setToken(user.token);
    userService.setToken(user.token);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    loggedInUserDispatch({ type: "SET_USER", payload: user });
  };

  const handleLogout = () => {
    blogService.setToken(null);
    userService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");
    loggedInUserDispatch({ type: "LOG_OUT" });
    queryClient.removeQueries("users");
  };

  return { handleLogin, handleLogout };
};

export default useAuthentication;
