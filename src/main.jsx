import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './assets/components/navbar.jsx'
import Principal from './assets/components/principal.jsx'
import Footer from './assets/components/footer.jsx'
import './assets/css/estilo.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Principal />
    <Footer />
  </StrictMode>,
)
