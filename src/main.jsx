import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.expand();
  window.Telegram.WebApp.ready();
}
