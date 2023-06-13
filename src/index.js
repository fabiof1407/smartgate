import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FingerPoseApp from './pages/Home'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <FingerPoseApp />
  </React.StrictMode>
)
