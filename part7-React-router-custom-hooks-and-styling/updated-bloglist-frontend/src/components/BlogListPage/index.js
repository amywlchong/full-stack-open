import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import useBlogs from '../../hooks/useBlogs'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'
import BlogForm from './BlogForm'
import Togglable from '../Togglable'
import { Card, CardContent, Typography } from '@mui/material'

const BlogList = () => {

  const { blogs, isLoadingBlogs, isBlogsError, createBlog } = useBlogs()
  const [loggedInUser] = useContext(UserContext)

  const blogCardStyles = { margin: '5px 10px 5px 0' }

  if (isLoadingBlogs) {
    return <Loading />
  }

  if (isBlogsError) {
    return <Error />
  }

  return (
    <div>
      {loggedInUser !== null &&
      <div>
        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={createBlog} />
        </Togglable>
      </div>
      }

      <section id="blog-list-container">
        {blogs.sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Card key={blog.id} sx={blogCardStyles} className="single-blog-container" >
              <CardContent>
                <Typography variant="h6">
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.author ? `${blog.title} by ${blog.author}` : blog.title}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          )}
      </section>
    </div>
  )
}

export default BlogList
