import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <SnackbarProvider autoHideDuration={2000} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}>
        <App />
      </SnackbarProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
