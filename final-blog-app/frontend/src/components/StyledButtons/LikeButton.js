import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { buttonStyle, disabledButtonStyle } from '../../styles/styles'

const LikeButton = ({ incrementLikes, isUserAllowedToLike, like }) => {

  const iconStyle = {
    color: 'red',
  }

  return (
    <Button
      variant='contained'
      onClick={incrementLikes}
      disabled={!isUserAllowedToLike}
      style={isUserAllowedToLike ? buttonStyle : disabledButtonStyle}
      startIcon={<FavoriteIcon style={iconStyle} />}
    >
      {like} Likes
    </Button>
  )
}

LikeButton.propTypes = {
  incrementLikes: PropTypes.func.isRequired,
  isUserAllowedToLike: PropTypes.bool.isRequired,
  like: PropTypes.number.isRequired,
}

export default LikeButton
