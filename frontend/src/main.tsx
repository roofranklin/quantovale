import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuantoVale from './QuantoVale'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuantoVale />
  </StrictMode>,
)
