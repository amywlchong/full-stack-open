const Notification = ({ notification }) => {

  const baseStyle = {
    color: 'charcoal',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const successStyle = {
    ...baseStyle,
    background: 'palegreen',
    borderColor: 'lightgreen'
  };

  const errorStyle = {
    ...baseStyle,
    background: 'lightsalmon',
    borderColor: 'lightcoral'
  };

  if (notification.message === null) {
    return null
  }

  return (
    <div style={notification.type === 'success' ? successStyle : errorStyle}>
      {notification.message}
    </div>
  )
}

export default Notification
