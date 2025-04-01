import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../screens/home,/Home'
import Register from '../screens/Register/Register'
import Login from '../screens/Login/Login'
import OTP from '../screens/OTP/OTP'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home   />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OTP/>} />
        {/* Add more routes as needed */}
    </Routes>
  )
}

export default AppRoutes