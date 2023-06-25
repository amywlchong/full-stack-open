import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, replaceBlog, deleteBlog, user }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    margin: '10px 10px 10px 0'
  }

  const [detailsVisible, setDetailsVisible] = useState(false)
  const isLikedByUser = user
    ? blog.updatedBy.some(likedByUser => likedByUser.username === user.username)
    : true

  const toggleDetailsVisibility = () => setDetailsVisible(!detailsVisible)

  const incrementLikes = () => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1
    }

    replaceBlog(blog.id, blogObject)
  }

  const handleDeleteClick = () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="single-blog-container" style={blogStyle}>
      {blog.author ? `${blog.title} by ${blog.author}` : blog.title} <button onClick={toggleDetailsVisibility}>
        {detailsVisible ? 'hide' : 'view' }
      </button>
      {detailsVisible
        ? (
          <>
            <p><a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a></p>
            <p>{blog.likes} {blog.likes === 1 ? 'like' : 'likes'} <button onClick={incrementLikes} disabled={isLikedByUser}>like</button></p>
            <p>added by {blog.creator.name}</p>
            {user &&
                blog.creator.username === user.username
              ? <button onClick={handleDeleteClick}>delete</button>
              : ''
            }
          </>
        )
        : ''}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    creator: PropTypes.shape({
      username: PropTypes.string
    }).isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  replaceBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
