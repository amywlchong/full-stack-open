const mongoose = require('mongoose')

const toJSON = {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
}

const commentSchema = new mongoose.Schema({
  comment: String,
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

commentSchema.set('toJSON', toJSON)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  blogPost: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: Number,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [commentSchema]
})

blogSchema.set('toJSON', toJSON)

module.exports = mongoose.model('Blog', blogSchema)
