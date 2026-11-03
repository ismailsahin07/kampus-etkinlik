import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import EventsProvider from './context/EventsProvider.tsx'
import AuthProvider from './context/AuthProvider.tsx'

// Router adres çubuğunu, Provider'lar ortak veriyi bütün sayfalara açar.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventsProvider>
          <App />
        </EventsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
