import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { UserContext } from './UserContext'
import { NotificationContext } from './NotificationContext'
import { Typography, Button } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

const Blog = ({ blogs, updateBlog, deleteBlog }) => {

  const [user] = useContext(UserContext)
  const [, showNotification] = useContext(NotificationContext)
  const navigate = useNavigate()

  const { id } = useParams()
  const blog = blogs.find(blog => blog.id === id)

  const isLikedByUser = user
    ? blog.likedBy.some(idOfLikedUser => idOfLikedUser === user.id)
    : true

  const incrementLikes = () => {
    updateBlog(blog, true)      // incrementLikes = true
  }

  const handleDeleteClick = async () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      try {
        await deleteBlog(blog.id)
        showNotification(`Deleted ${blog.title}`, 'success')
        navigate('/')
      } catch (error) {
        showNotification('An error occurred while deleting the blog.', 'error')
      }
    }
  }

  return (
    <article className="blog-details-container">
      <Typography variant="h2">{blog.author ? `${blog.title} by ${blog.author}` : blog.title}</Typography>

      <Typography variant="body1"><a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a></Typography>
      <Typography variant="body1">
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
        <Button
          variant="contained"
          color="secondary"
          onClick={incrementLikes}
          disabled={isLikedByUser}
          size="small"
          startIcon={<ThumbUpAltIcon />}
          sx={{ minWidth: 'initial', width: 'fit-content' }}
          className="likeButton"
        >
        </Button>
      </Typography>
      <Typography variant="body1">added by {blog.creator.name}</Typography>
      {user &&
        blog.creator.id === user.id
        ? <Button variant="outlined" sx={{color: '#808080'}} onClick={handleDeleteClick}>delete</Button>
        : ''
      }
    </article>
  )
}

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    likedBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    creator: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
  })).isRequired,
}

export default Blog
