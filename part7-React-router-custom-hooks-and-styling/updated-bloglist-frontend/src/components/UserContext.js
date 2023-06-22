import { createContext, useReducer } from 'react'

export const UserContext = createContext()

const initialState = null

const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.payload
  case 'LOG_OUT':
    return initialState
  default:
    return state
  }
}

export const UserContextProvider = (props) => {
  const [loggedInUser, loggedInUserDispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={[loggedInUser, loggedInUserDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}
