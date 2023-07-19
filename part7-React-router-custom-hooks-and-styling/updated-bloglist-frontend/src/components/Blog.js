import { useContext, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useBlogs from '../hooks/useBlogs'
import { UserContext } from './UserContext'
import { NotificationContext } from './NotificationContext'
import Comments from './Comments'
import CommentForm from './CommentForm'
import Togglable from './Togglable'
import { Typography, Button } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

const Blog = () => {

  const [loggedInUser] = useContext(UserContext)
  const [, showNotification] = useContext(NotificationContext)
  const navigate = useNavigate()
  const commentFormRef = useRef()

  const { id } = useParams()
  const { oneBlog, isLoadingOneBlog, isOneBlogError, updateBlog, deleteBlog } = useBlogs(id)

  if (isLoadingOneBlog) {
    return <div>Loading...</div>
  }

  if (isOneBlogError) {
    return <div>Error: An error occurred while fetching data from the server</div>
  }

  // const blog = blogs.find(blog => blog.id === id)
  const blog = oneBlog

  const isUserAllowedToLike = loggedInUser
    ? blog.likedBy.every(idOfLikedUser => idOfLikedUser !== loggedInUser.id)
    : false

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
    <div>
      <article className="blog-details-container">
        <Typography variant="h2">{blog.author ? `${blog.title} by ${blog.author}` : blog.title}</Typography>

        <Typography variant="body1"><a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a></Typography>
        <Typography variant="body1">
          {blog.likes} {blog.likes === 1 ? 'like ' : 'likes '}
          <Button
            variant="contained"
            color="secondary"
            onClick={incrementLikes}
            disabled={!isUserAllowedToLike}
            size="small"
            startIcon={<ThumbUpAltIcon />}
            sx={{ minWidth: 'initial', width: 'fit-content' }}
            className="likeButton"
          >
          </Button>
        </Typography>
        <Typography variant="body1">added by {blog.creator.name}</Typography>
      </article>

      {
        loggedInUser &&
        <>
          {blog.creator.id === loggedInUser.id &&
            <Button variant="outlined" sx={{color: '#808080'}} onClick={handleDeleteClick}>delete</Button>
          }
          <Togglable buttonLabel="new comment" ref={commentFormRef}>
            <CommentForm blogId={id} commentFormRef={commentFormRef} />
          </Togglable>
        </>
      }

      <Comments comments={blog.comments} />
    </div>
  )
}

export default Blog
