import PropTypes from 'prop-types'
import { Typography, Divider, Box } from '@mui/material'

const Comments = ({ comments }) => {
  return (
    <Box sx={{ margin: '20px 0' }}>
      <Typography variant="h3">Comments</Typography>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Divider sx={{ margin: '10px 0', borderColor: 'lightgrey' }} />
          <Typography variant="body1">{comment.commenter.name}: {comment.comment}</Typography>
        </div>
      ))}
    </Box>
  )
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      commenter: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
}

export default Comments
