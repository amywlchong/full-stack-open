import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  createBlog,
  setAndClearNotification
}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
      setAndClearNotification(
        `Success! A new blog "${title}" ${author ? `by ${author}` : ''} has been added.`,
        'success'
      )
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (error) {
      setAndClearNotification(error.response.data.error, 'error')
    }
  }

  return (
    <form onSubmit={addBlog}>
      <h3>Add a new blog post</h3>
      <label>
        title: <input id="title" value={newTitle} onChange={handleTitleChange} />
      </label>
      <label>
        author: <input id="author" value={newAuthor} onChange={handleAuthorChange} />
      </label>
      <label>
        url: <input id="url" value={newUrl} onChange={handleUrlChange} />
      </label>
      <button type="submit">add</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setAndClearNotification: PropTypes.func.isRequired
}

export default BlogForm
