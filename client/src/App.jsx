import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'


function App() {
  return (
    <div>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
