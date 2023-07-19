import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import useBlogs from '../hooks/useBlogs'
import { NotificationContext } from './NotificationContext'
import { Typography, Button, TextField, Box } from '@mui/material'

const CommentForm = ({ blogId, commentFormRef }) => {
  const [comment, setComment] = useState('')
  const [, showNotification] = useContext(NotificationContext)

  const { createComment } = useBlogs()

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()

    const commentObject = { comment }

    try {
      await createComment(blogId, commentObject)
      showNotification(
        'Success! A new comment has been added.',
        'success'
      )
      setComment('')
      commentFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
      showNotification(error.response?.data?.error, 'error')
    }
  }

  return (
    <form onSubmit={addComment}>
      <Typography variant="h3">Add a comment</Typography>
      <Box sx={{
        display: {
          xs: 'block',
          sm: 'flex',
        },
        flexDirection: {
          sm: 'row',
        },
        alignItems: 'center'
      }}>
        <Box sx={{ flexGrow: 1 }}>
          <TextField label="comment" id="comment" multiline fullWidth value={comment} onChange={handleCommentChange} />
        </Box>
        <Button variant="contained" type="submit">add</Button>
      </Box>
    </form>
  )
}

CommentForm.propTypes = {
  blogId: PropTypes.string.isRequired,
  commentFormRef: PropTypes.shape({
    current: PropTypes.shape({
      toggleVisibility: PropTypes.func,
    }),
  }).isRequired,
}

export default CommentForm
