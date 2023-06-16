import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: '10px 10px 10px 0'
  }

  return (
    notification &&
      <div style={style}>
        {notification}
      </div>
  )
}

export default Notification
