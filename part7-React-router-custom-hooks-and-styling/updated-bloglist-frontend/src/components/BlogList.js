import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@mui/material'

const BlogList = ({ blogs }) => {
  return (
    <section id="blog-list-container">
      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Card key={blog.id} sx={{ margin: '5px 10px 5px 0' }} className="single-blog-container" >
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
  )
}

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string,
    title: PropTypes.string.isRequired,
  })).isRequired,
}

export default BlogList
