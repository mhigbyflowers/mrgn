import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ItemDetail from './components/ItemDetail'
import Gallery from './components/Gallery.jsx'

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:collection" element={<Gallery />} />
      <Route path="/hicetnunc" element={
        <Gallery
          customFa="KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton"
          customHolder="tz1YrA1XwPqiVVC7L2hVapAbq2bm9aaGZtKQ"
          title="hic et nunc (hen)"
        />
      } />
      <Route path="/:collection/:id" element={<ItemDetail />} />
    </Routes>
  </Router>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
