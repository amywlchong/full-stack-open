import { Button } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

const LikeButton = ({ incrementLikes, isUserAllowedToLike }) => (
  <Button
    variant="contained"
    color="secondary"
    onClick={incrementLikes}
    disabled={!isUserAllowedToLike}
    size="small"
    startIcon={<ThumbUpAltIcon />}
    sx={{ minWidth: 'initial', width: 'fit-content' }}
    className="likeButton"
  />
)

export default LikeButton
