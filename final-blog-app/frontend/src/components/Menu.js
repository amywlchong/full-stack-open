import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
import { UserContext } from "../contexts/UserContext";
import { NotificationContext } from "../contexts/NotificationContext";
import { AppBar, Toolbar, Button, Box, Drawer } from "@mui/material";
import { useModal } from "../contexts/ModalContext";
import logo from "../assets/images/blog-logo.png";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import useViewportBreakpoints from "../hooks/useViewportBreakpoints";

const Menu = () => {
  const { handleLogout } = useAuthentication();
  const [loggedInUser] = useContext(UserContext);
  const [, showNotification] = useContext(NotificationContext);
  const { openLoginModal, openBlogModal } = useModal();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isBelow850px } = useViewportBreakpoints();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toolbarStyles = {
    display: "grid",
    gridTemplateColumns: {
      xs: "2% 58% 38% 2%",
      sm: "2% 48% 48% 2%",
      lg: "4% 46% 46% 4%",
      xl: "10% 40% 40% 10%",
    },
  };

  const leftBoxStyles = {
    gridColumn: "2/3",
    display: "flex",
    justifyContent: "start",
  };

  const rightBoxStyles = {
    gridColumn: "3/4",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  };

  const navBarButtonStyles = {
    backgroundColor: "#427ef8",
    textTransform: "capitalize",
    fontWeight: "600",
  };

  const drawerButtonStyles = {
    fontSize: "20px",
    color: "black",
    "&:hover": {
      color: "#427ef8",
    },
  };

  const handleLogoutClick = () => {
    try {
      handleLogout();
      setIsDrawerOpen(false);
      showNotification("You have been successfully logged out.", "success");
    } catch (error) {
      setIsDrawerOpen(false);
      showNotification(
        "Error: There was a problem logging you out. Please try again.",
        "error"
      );
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#FFFFFF",
        boxShadow: "none",
        height: "100px",
      }}
    >
      <Toolbar sx={toolbarStyles}>
        <Box sx={leftBoxStyles}>
          <Button
            component={Link}
            sx={{ color: "#000", fontWeight: "600" }}
            to="/"
          >
            <img
              src={logo}
              alt="logo"
              style={{ maxHeight: "80px", maxWidth: "100%", width: "auto" }}
            />
          </Button>
        </Box>

        {isBelow850px && (
          <Box sx={rightBoxStyles}>
            <Button variant="contained" size="large" onClick={toggleDrawer}>
              <MenuIcon />
            </Button>
          </Box>
        )}

        {!isBelow850px && (
          <Box sx={rightBoxStyles}>
            {loggedInUser && (
              <>
                <Button
                  variant="contained"
                  sx={{
                    ...navBarButtonStyles,
                    marginRight: "15px",
                  }}
                  size="medium"
                  onClick={() => {
                    openBlogModal();
                  }}
                >
                  Add New Blog
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    ...navBarButtonStyles,
                    marginRight: "15px",
                  }}
                  size="medium"
                  component={Link}
                  to="/users"
                >
                  <PeopleIcon sx={{ marginRight: "10px" }} />
                  Users
                </Button>
                <Button
                  variant="contained"
                  sx={navBarButtonStyles}
                  size="medium"
                  onClick={handleLogoutClick}
                >
                  Log Out
                </Button>
              </>
            )}

            {!loggedInUser && (
              <Button
                variant="contained"
                sx={navBarButtonStyles}
                size="large"
                onClick={openLoginModal}
              >
                Log In
              </Button>
            )}
          </Box>
        )}
      </Toolbar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 200, p: 2, display: "flex", flexDirection: "column" }}
        >
          <Button
            onClick={toggleDrawer}
            component={Link}
            to="/"
            sx={drawerButtonStyles}
          >
            Home
          </Button>
          {loggedInUser && (
            <>
              <Button
                onClick={() => {
                  openBlogModal();
                  toggleDrawer();
                }}
                sx={drawerButtonStyles}
              >
                Add New Blog
              </Button>

              <Button
                onClick={toggleDrawer}
                component={Link}
                to="/users"
                sx={drawerButtonStyles}
              >
                Users
              </Button>
              <Button
                onClick={() => {
                  handleLogoutClick();
                  toggleDrawer();
                }}
                sx={drawerButtonStyles}
              >
                Log Out
              </Button>
            </>
          )}
          {!loggedInUser && (
            <Button
              onClick={() => {
                openLoginModal();
                toggleDrawer();
              }}
              sx={drawerButtonStyles}
            >
              Log In
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Menu;
