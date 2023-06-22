import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { NotificationContext } from './NotificationContext'
import { Typography, Button, TextField, Box } from '@mui/material'

const BlogForm = ({ createBlog, blogFormRef }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [, showNotification] = useContext(NotificationContext)

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

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
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
      showNotification(error.response?.data?.error, 'error')
    }
  }

  return (
    <form onSubmit={addBlog}>
      <Typography variant="h3">Add a new blog post</Typography>
      <Box sx={{
        display: {
          xs: 'block',
          sm: 'flex',
        },
        alignItems: 'center'
      }}>
        <div>
          <TextField label="title" id="title" value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          <TextField label="author" id="author" value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          <TextField label="url" id="url" value={newUrl} onChange={handleUrlChange} />
        </div>
        <Button variant="contained" type="submit">add</Button>
      </Box>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  blogFormRef: PropTypes.shape({
    current: PropTypes.shape({
      toggleVisibility: PropTypes.func,
    }),
  }).isRequired,
}

export default BlogForm
