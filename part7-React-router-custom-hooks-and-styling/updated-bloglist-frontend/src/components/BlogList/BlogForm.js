import { useContext } from 'react'
import PropTypes from 'prop-types'
import useField from '../../hooks/useField'
import { NotificationContext } from '../../contexts/NotificationContext'
import { fullWidthStyles } from '../../styles/styles'
import { Typography, Button, TextField, Box } from '@mui/material'

const BlogForm = ({ createBlog, toggleVisibility }) => {
  const { value: newTitle, onChange: handleTitleChange, reset: resetTitle } = useField('text')
  const { value: newAuthor, onChange: handleAuthorChange, reset: resetAuthor } = useField('text')
  const { value: newUrl, onChange: handleUrlChange, reset: resetUrl } = useField('text')

  const [, showNotification] = useContext(NotificationContext)

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const { title, author } = await createBlog(blogObject)
      showNotification(
        `Success! A new blog "${title}" ${author ? `by ${author}` : ''} has been added.`,
        'success'
      )
      resetTitle()
      resetAuthor()
      resetUrl()
      toggleVisibility()
    } catch (error) {
      console.log(error)
      showNotification(error.response?.data?.error, 'error')
    }
  }

  return (
    <form onSubmit={addBlog}>
      <Typography variant="h3">Add a new blog post</Typography>
      <Box>
        <Box sx={fullWidthStyles}>
          <TextField label="title" id="title" fullWidth value={newTitle} onChange={handleTitleChange} />
        </Box>
        <Box sx={fullWidthStyles}>
          <TextField label="author" id="author" fullWidth value={newAuthor} onChange={handleAuthorChange} />
        </Box>
        <Box sx={fullWidthStyles}>
          <TextField label="url" id="url" fullWidth value={newUrl} onChange={handleUrlChange} />
        </Box>
        <Button variant="contained" type="submit">add</Button>
      </Box>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
