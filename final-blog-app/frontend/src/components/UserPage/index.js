import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../FetchStateUI/Loading";
import Error from "../FetchStateUI/Error";
import { Typography, Container, Grid, Avatar } from "@mui/material";
import lineBackground from "../../assets/images/line-background.png";
import personImage from "../../assets/images/person.png";
import CallMadeIcon from "@mui/icons-material/CallMade";
import useViewportBreakpoints from "../../hooks/useViewportBreakpoints";
import { getSnippet } from "../../utils/stringUtils";

const User = () => {
  const { isBelow400px, isBetween400and600px } = useViewportBreakpoints();

  const { id } = useParams();

  const [loggedInUser] = useContext(UserContext);
  const { oneUser, isLoadingOneUser, isOneUserError } = useUsers(id);

  if (!loggedInUser) {
    return <div>Log in to view this page</div>;
  }

  if (isLoadingOneUser) {
    return <Loading />;
  }

  if (isOneUserError) {
    return <Error />;
  }

  const user = oneUser;

  return (
    <>
      <Container
        style={{
          maxWidth: "100%",
          backgroundImage: `url(${lineBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#f8f9fb",
          height: "250px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: `${
              isBelow400px ? "column" : isBetween400and600px ? "column" : "row"
            }`,
            padding: `${
              isBelow400px ? "10px" : isBetween400and600px ? "10px" : "40px"
            }`,
          }}
        >
          <Avatar
            src={personImage}
            alt="blogger"
            sx={{ width: "120px", height: "120px" }}
          />

          <Typography
            component="div"
            style={{
              fontSize: `${
                isBelow400px ? "16px" : isBetween400and600px ? "16px" : "24px"
              }`,
              marginTop: "10px",
            }}
          >
            <div style={{ fontWeight: "700" }}> {user.name} </div>
            <div>Total Blogs: {user?.blogs?.length}</div>
          </Typography>
        </Container>
      </Container>

      <Container>
        <section id="blog-list-container-for-user">
          <Grid container spacing={4} sx={{ marginTop: "40px" }}>
            {user.blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={6} key={blog.id}>
                <img src={`/${blog.image}`} style={{ width: "100%" }} />

                <Typography variant="h3">{blog.title}</Typography>
                <Typography variant="body1" className="caption">
                  {getSnippet(blog.blogPost)}
                </Typography>

                <Typography
                  variant="body2"
                  color="#2B63D9"
                  sx={{
                    marginBottom: "5px",
                    fontWeight: "500",
                    "& a": {
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    },
                  }}
                >
                  <Link to={`/blogs/${blog.id}`}>Read More</Link>
                  <CallMadeIcon sx={{ fontSize: "16px" }} />
                </Typography>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </>
  );
};

export default User;
