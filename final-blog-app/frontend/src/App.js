import { Routes, Route } from "react-router-dom";
import UserList from "./components/UserListPage";
import User from "./components/UserPage";
import BlogList from "./components/BlogListPage";
import Blog from "./components/BlogPage";
import Menu from "./components/Menu";
import Notification from "./components/Notification";
import LoginModal from "./components/LoginModal/LoginModal";
import { useModal } from "./contexts/ModalContext";
import NewBlogModal from "./components/NewBlogModal/NewBlogModal";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { NotificationContext } from "./contexts/NotificationContext";

const App = () => {
  const { isLoginModalOpen, isNewBlogModalOpen } = useModal();
  const [loggedInUser] = useContext(UserContext);
  const [notification] = useContext(NotificationContext);

  return (
    <div>
      <Menu />

      {notification?.location === "page-top" && <Notification />}

      {isLoginModalOpen && <LoginModal />}

      {loggedInUser !== null && isNewBlogModalOpen && <NewBlogModal />}

      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  );
};

export default App;
