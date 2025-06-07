import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const Root = () => {
  return (
    <div className='flex flex-col min-h-screen'>
    <Navbar />
    <div className='grow'>
    <Outlet />
    </div>
    <Footer />
    </div>
  )
}

export default Root