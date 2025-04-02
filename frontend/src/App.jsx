import React from 'react'
import AppRoutes from './Routes/AppRoutes'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <AppRoutes/>
      <ToastContainer />
    </div>
  )
}

export default App