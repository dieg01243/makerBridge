import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Filtros from '../src/VistaCliente/Filtros.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

createRoot(document.getElementById('misSolicitudes')).render(
  <StrictMode>
    <StatusBadge />
  </StrictMode>,
)
