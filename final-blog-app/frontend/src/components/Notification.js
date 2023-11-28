import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import Alert from "@mui/material/Alert";

const Notification = () => {
  const [notification] = useContext(NotificationContext);

  if (notification.message === null) {
    return null;
  }

  const status = notification.status;

  return <Alert severity={status}>{notification.message}</Alert>;
};

export default Notification;
