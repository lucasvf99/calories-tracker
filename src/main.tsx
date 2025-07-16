import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ActivityProvider } from './context/ActivityContext.tsx' // de aca vienen los datos 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActivityProvider>
      <App />
    </ActivityProvider>
  </StrictMode>,
)
