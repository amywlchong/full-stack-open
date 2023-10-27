import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { UserContextProvider } from './contexts/UserContext'

import { ThemeProvider } from '@mui/material/styles'
import { theme } from './styles/MUITheme'
import { ModalProvider } from './contexts/ModalContext'
import 'typeface-inter'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <NotificationContextProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </NotificationContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Router>
)
