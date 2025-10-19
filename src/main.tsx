import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "material-symbols"; // <-- Import Material Symbols CSS
import './index.css'
import App from './App.tsx'
// import "@fontsource/roboto/100"; // bold weight 700

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
