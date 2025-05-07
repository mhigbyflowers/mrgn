import { useState } from 'react'
import './App.css'

import ObjktGallery from './components/ObjktGallery.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    sup boi!
    <ObjktGallery contractAddress="KT1NMayQZJMuZFTPSSskTqj82rhogNjgStSw" />
    </>
  )
}

export default App
ObjktGallery