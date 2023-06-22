const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favoriteBlogDetails = blogs.reduce((max, blog) => {
    return (blog.likes > max.likes) ? blog : max
  }, {likes: -Infinity})
  const { title, author, likes } = favoriteBlogDetails
  return { title, author, likes }
}

const authorWithMost = (blogs, incrementor, propName) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = blogs.reduce((accumulator, blog) => {
    if (accumulator[blog.author]) {
      accumulator[blog.author] += incrementor(blog)
    } else {
      accumulator[blog.author] = incrementor(blog)
    }

    return accumulator
  }, {})

  const authorWithMost = Object.entries(authors).reduce((max, [author, count]) => {
    return count > max[propName] ? { author, [propName]: count } : max
  }, { author: '', [propName]: 0 })

  return authorWithMost
}

const authorWithMostBlogs = (blogs) => {
  return authorWithMost(blogs, () => 1, 'blogs')
}

const authorWithMostLikes = (blogs) => {
  return authorWithMost(blogs, (blog) => blog.likes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMostLikes
}
