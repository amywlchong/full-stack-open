import { useContext } from 'react'
import PropTypes from 'prop-types'
import useField from '../../hooks/useField'
import { NotificationContext } from '../../contexts/NotificationContext'
import { fullWidthStyles } from '../../styles/styles'
import { Typography, Button, TextField, Box } from '@mui/material'

const CommentForm = ({ blogId, createComment, toggleVisibility }) => {
  const { value: comment, onChange: handleCommentChange, reset: resetComment } = useField('text')
  const [, showNotification] = useContext(NotificationContext)

  const addComment = async (event) => {
    event.preventDefault()

    const commentObject = { comment }

    try {
      await createComment(blogId, commentObject)
      showNotification(
        'Success! A new comment has been added.',
        'success'
      )
      resetComment()
      toggleVisibility()
    } catch (error) {
      console.log(error)
      showNotification(error.response?.data?.error, 'error')
    }
  }

  return (
    <form onSubmit={addComment}>
      <Typography variant="h3">Add a comment</Typography>
      <Box>
        <Box sx={fullWidthStyles}>
          <TextField label="comment" id="comment" multiline fullWidth value={comment} onChange={handleCommentChange} />
        </Box>
        <Button variant="contained" type="submit">add</Button>
      </Box>
    </form>
  )
}

CommentForm.propTypes = {
  blogId: PropTypes.string.isRequired,
  createComment: PropTypes.func.isRequired
}

export default CommentForm
