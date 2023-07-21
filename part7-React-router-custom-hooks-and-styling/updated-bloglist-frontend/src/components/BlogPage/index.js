import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useBlogs from '../../hooks/useBlogs'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'
import { UserContext } from '../../contexts/UserContext'
import { NotificationContext } from '../../contexts/NotificationContext'
import LikeButton from '../StyledButtons/LikeButton'
import DeleteButton from '../StyledButtons/DeleteButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
import Togglable from '../Togglable'
import { Typography } from '@mui/material'

const Blog = () => {

  const [loggedInUser] = useContext(UserContext)
  const [, showNotification] = useContext(NotificationContext)
  const navigate = useNavigate()

  const { id } = useParams()
  const { oneBlog, isLoadingOneBlog, isOneBlogError, updateBlog, deleteBlog, createComment } = useBlogs(id)

  if (isLoadingOneBlog) {
    return <Loading />
  }

  if (isOneBlogError) {
    return <Error />
  }

  // const blog = blogs.find(blog => blog.id === id)
  const blog = oneBlog

  const isUserAllowedToLike = loggedInUser
    ? blog.likedBy.every(idOfLikedUser => idOfLikedUser !== loggedInUser.id)
    : false

  const incrementLikes = async () => {
    await updateBlog(blog, true)      // incrementLikes = true
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
      <section className="blog-details-container">
        <Typography variant="h2">{blog.author ? `${blog.title} by ${blog.author}` : blog.title}</Typography>

        <Typography variant="body1"><a href={blog.url.startsWith('http') ? blog.url : `http://${blog.url}`} target='_blank' rel='noreferrer'>{blog.url}</a></Typography>
        <Typography variant="body1">
          {blog.likes} {blog.likes === 1 ? 'like ' : 'likes '}
          <LikeButton incrementLikes={incrementLikes} isUserAllowedToLike={isUserAllowedToLike} />
        </Typography>
        <Typography variant="body1">added by {blog.creator.name}</Typography>
      </section>

      {
        loggedInUser &&
        <>
          {blog.creator.id === loggedInUser.id &&
            <DeleteButton handleDeleteClick={handleDeleteClick} />
          }
          <Togglable buttonLabel="new comment">
            <CommentForm blogId={id} createComment={createComment} />
          </Togglable>
        </>
      }

      <Comments comments={blog.comments} />
    </div>
  )
}

export default Blog
