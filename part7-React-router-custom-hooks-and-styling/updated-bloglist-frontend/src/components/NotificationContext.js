import { createContext, useReducer } from 'react'

export const NotificationContext = createContext()

const initialState = {message: null, status: null}

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { message: action.payload.message, status: action.payload.status}
  case 'CLEAR_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  const showNotification = (message, status) => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: {message, status} })

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, showNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
