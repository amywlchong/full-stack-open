import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import { buttonStyle } from '../../styles/styles'

const CommentButton = ({ setShowComment }) => {

  const iconStyle = {
    color: '#696969',
  }

  return (
    <Button
      variant='contained'
      style={buttonStyle}
      onClick={() => setShowComment(true)}
      startIcon={<ChatIcon style={iconStyle} />}
    >
      Comment
    </Button>
  )
}

CommentButton.propTypes = {
  setShowComment: PropTypes.func.isRequired,
}

export default CommentButton
