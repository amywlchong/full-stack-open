import { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useBlogs from '../../hooks/useBlogs'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'
import { UserContext } from '../../contexts/UserContext'
import { NotificationContext } from '../../contexts/NotificationContext'
import LikeButton from '../StyledButtons/LikeButton'
import DeleteButton from '../StyledButtons/DeleteButton'
import CommentButton from '../StyledButtons/CommentButton'
import CommentForm from './CommentForm'

import { Container, Grid, Typography } from '@mui/material'

import Comments from '../BlogPage/Comments'

const Blog = () => {
  const [loggedInUser] = useContext(UserContext)
  const [, showNotification] = useContext(NotificationContext)

  const [showCommentForm, setShowCommentForm] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()
  const {
    oneBlog,
    isLoadingOneBlog,
    isOneBlogError,
    updateBlog,
    deleteBlog,
    createComment,
  } = useBlogs(id)

  if (isLoadingOneBlog) {
    return <Loading />
  }

  if (isOneBlogError) {
    return <Error />
  }

  const blog = oneBlog

  const isUserAllowedToLike = loggedInUser
    ? blog.likedBy.every((idOfLikedUser) => idOfLikedUser !== loggedInUser.id)
    : false

  const incrementLikes = async () => {
    await updateBlog(blog, true) // incrementLikes = true
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
    <>
      <Container>
        <section id='blog-list-container'>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '45vh',
              }}>
                <img src={`/${blog.image}`} alt="blog post" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
              </div>

              <Typography variant='h2'>{blog.title}</Typography>
              <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
                {blog.blogPost}
              </Typography>
            </Grid>
          </Grid>
        </section>

        <Grid container alignItems="center" spacing={2}>
          {loggedInUser && blog.creator.id === loggedInUser.id && (
            <Grid item xs={12} sm="auto">
              <DeleteButton handleDeleteClick={handleDeleteClick} />
            </Grid>
          )}

          <Grid item xs={12} sm="auto">
            <LikeButton
              incrementLikes={incrementLikes}
              isUserAllowedToLike={isUserAllowedToLike}
              like={blog.likes}
            />
          </Grid>

          {loggedInUser && (
            <Grid item xs={12} sm="auto">
              <CommentButton setShowComment={setShowCommentForm} />
            </Grid>
          )}
        </Grid>

        {showCommentForm && loggedInUser && (
          <CommentForm
            blogId={id}
            createComment={createComment}
            setShowCommentForm={setShowCommentForm}
          />
        )}

        <Comments comments={blog.comments} />
      </Container>
    </>
  )
}

export default Blog
