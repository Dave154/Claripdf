import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AppProvider} from './context.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AppProvider>
   <BrowserRouter>
    <App />
   </BrowserRouter>
  </AppProvider>
)
