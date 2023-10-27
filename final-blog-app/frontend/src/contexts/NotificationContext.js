import { createContext, useReducer } from 'react'

export const NotificationContext = createContext()

const initialState = {message: null, status: null, location: null}

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { message: action.payload.message, status: action.payload.status, location: action.payload.location }
  case 'CLEAR_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  const showNotification = (message, status, location = 'page-top') => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: {message, status, location} })

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
