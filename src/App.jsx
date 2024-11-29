import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar'
import AppRoutes from './routes/appRoutes'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='flex-1 h-screen overflow-y-auto'>
          <Navbar />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
