import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../FetchStateUI/Loading";
import Error from "../FetchStateUI/Error";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardActionArea,
} from "@mui/material";
import personImage from "../../assets/images/person.png";
import lineBackground from "../../assets/images/line-background.png";

const UserList = () => {
  const [loggedInUser] = useContext(UserContext);
  const { users, isLoadingUsers, isUsersError } = useUsers();

  if (!loggedInUser) {
    return <div>Log in to view this page</div>;
  }

  if (isLoadingUsers) {
    return <Loading />;
  }

  if (isUsersError) {
    return <Error />;
  }

  return (
    <div>
      <Container
        maxWidth="xl"
        style={{
          backgroundImage: `url(${lineBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#f8f9fb",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "250px" }}
        >
          <Grid item xs={12} md={6}>
            <div style={{ textAlign: "center" }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "52px",
                  fontWeight: 700,
                  lineHeight: "60px",
                  letterSpacing: "-0.01em",
                  marginTop: "0px",
                  color: "black",
                }}
              >
                Users
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container spacing={6} style={{ marginTop: "40px" }}>
          {users
            ?.sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <Grid item xs={12} sm={6} md={3} key={user.id}>
                <CardActionArea component={RouterLink} to={`/users/${user.id}`}>
                  <Card
                    style={{
                      padding: "16px",
                      backgroundColor: "#F8F9FB",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={personImage}
                      alt="post"
                      style={{
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                        marginTop: "15px",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: "10px",
                        fontWeight: "500",
                        fontSize: "18px",
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography variant="body2">
                      {user.blogs.length}{" "}
                      {user.blogs.length === 1 ? "blog" : "blogs"}
                    </Typography>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default UserList;
