import { Button } from '@mui/material'

const DeleteButton = ({ handleDeleteClick }) => (
  <Button variant="outlined" sx={{color: '#808080'}} onClick={handleDeleteClick}>delete</Button>
)

export default DeleteButton
