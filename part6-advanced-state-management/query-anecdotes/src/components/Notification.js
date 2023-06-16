import { useContext } from 'react'
import { NotificationContext } from './NotificationContext'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5
}

const Notification = () => {
  const [notification] = useContext(NotificationContext)

  return (
    notification &&
        <div style={style}>
          {notification}
        </div>
  )
}

export default Notification
