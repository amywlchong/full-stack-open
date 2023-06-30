import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return initialState
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotificationWithTimeout = (message, durationInSeconds) => {
  return async (dispatch) => {
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(clearNotification())
    }, durationInSeconds * 1000)
  }
}

export default notificationSlice.reducer
