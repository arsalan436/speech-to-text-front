import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NotesProvider } from '../utils/NotesContext.jsx'
import { AuthProvider } from '../utils/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
          <NotesProvider>

    <App />,
    </NotesProvider>

    </AuthProvider>

  </StrictMode>,
)
