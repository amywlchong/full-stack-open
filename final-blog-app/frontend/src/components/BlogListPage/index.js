import { Link } from "react-router-dom";

import useBlogs from "../../hooks/useBlogs";
import Loading from "../FetchStateUI/Loading";
import Error from "../FetchStateUI/Error";

import { Container, Grid, Typography } from "@mui/material";
import useViewportBreakpoints from "../../hooks/useViewportBreakpoints";
import { getSnippet } from "../../utils/stringUtils";

const BlogList = () => {
  const { isBelow400px, isBetween400and600px } = useViewportBreakpoints();

  const { blogs, isLoadingBlogs, isBlogsError } = useBlogs();

  if (isLoadingBlogs) {
    return <Loading />;
  }

  if (isBlogsError) {
    return <Error />;
  }

  return (
    <div>
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "250px" }}
        >
          <Grid item xs={12} md={8}>
            <div style={{ textAlign: "center" }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: `${
                    isBelow400px
                      ? "22px"
                      : isBetween400and600px
                      ? "28px"
                      : "36px"
                  }`,
                  lineHeight: `${
                    isBelow400px
                      ? "28px"
                      : isBetween400and600px
                      ? "38px"
                      : "46px"
                  }`,

                  fontWeight: 700,

                  letterSpacing: "-0.01em",
                  marginTop: "0px",
                  color: "black",
                }}
              >
                Every secret of a writer’s soul, every experience of their life,
                every quality of their mind, is written large in their works.
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>– Virginia Woolf</Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <section id="blog-list-container">
          <Grid container spacing={2}>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <div style={{ padding: "16px" }}>
                    <img
                      src={`/${blog.image}`}
                      alt="blogpost"
                      style={{ width: "100%" }}
                    />
                    <div>
                      <Typography
                        sx={{
                          color: "#000",
                          fontWeight: "700",
                          fontSize: "14px",
                          marginTop: "0px",
                        }}
                      >
                        {blog.title}
                      </Typography>

                      <Typography
                        sx={{
                          margin: "8px 0 16px 0",
                          color: "#666",
                          fontSize: "12px",
                        }}
                      >
                        {getSnippet(blog.blogPost)}
                      </Typography>

                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid>
                          <Typography
                            sx={{
                              marginLeft: "16px",
                              fontWeight: "600",
                              fontSize: "12px",
                            }}
                          >
                            {blog.author && `by ${blog.author}`}
                          </Typography>
                        </Grid>

                        <Grid>
                          <Typography
                            color="#2B63D9"
                            component={Link}
                            to={`/blogs/${blog.id}`}
                          >
                            Read More
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Grid>
              ))}
          </Grid>
        </section>
      </Container>
    </div>
  );
};

export default BlogList;
