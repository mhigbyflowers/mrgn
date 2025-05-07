import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ItemDetail from './components/ItemDetail'
import ObjktGallery from './components/ObjktGallery.jsx'

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:collection" element={<ObjktGallery />} />
      <Route path="/:collection/:id" element={<ItemDetail />} />
    </Routes>
  </Router>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
