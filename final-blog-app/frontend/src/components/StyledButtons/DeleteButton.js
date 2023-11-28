import PropTypes from "prop-types";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { buttonStyle } from "../../styles/styles";

const DeleteButton = ({ handleDeleteClick }) => {
  const deleteButtonStyle = {
    ...buttonStyle,
    color: "#FF0000",
    fontWeight: 500,
  };

  const iconStyle = {
    color: "red",
  };

  return (
    <Button
      variant="contained"
      color="warning"
      style={deleteButtonStyle}
      onClick={handleDeleteClick}
      startIcon={<DeleteIcon style={iconStyle} />}
    >
      Delete
    </Button>
  );
};

DeleteButton.propTypes = {
  handleDeleteClick: PropTypes.func.isRequired,
};

export default DeleteButton;
