import { useState, useContext } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import LoginForm from "./LoginForm";
import { useModal } from "../../contexts/ModalContext";
import useViewportBreakpoints from "../../hooks/useViewportBreakpoints";
import { NotificationContext } from "../../contexts/NotificationContext";
import Notification from "../Notification";

const LoginModal = () => {
  const [open, setOpen] = useState(true);
  const { isBelow400px, isBetween400and600px } = useViewportBreakpoints();
  const { closeLoginModal } = useModal();
  const [notification] = useContext(NotificationContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `${
      isBelow400px ? "265px" : isBetween400and600px ? "350px" : "500px"
    }`,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };

  const handleClose = () => {
    setOpen(false);
    closeLoginModal();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {notification?.location === "modal" && <Notification />}
        <LoginForm />
      </Box>
    </Modal>
  );
};

export default LoginModal;
