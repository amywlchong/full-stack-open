const Notification = ({ notification }) => {

    const successStyle = {
        color: 'charcoal',
        background: 'palegreen',
        fontSize: 20,
        borderStyle: 'solid',
        borderColor: 'lightgreen',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {
        color: 'charcoal',
        background: 'lightsalmon',
        fontSize: 20,
        borderStyle: 'solid',
        borderColor: 'lightcoral',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

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
