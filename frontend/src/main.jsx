import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { persist, store } from './context/store.js'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PersistGate loading={null} persist={persist}>

        <App />

      </PersistGate>

    </BrowserRouter>
  </StrictMode>,
)
