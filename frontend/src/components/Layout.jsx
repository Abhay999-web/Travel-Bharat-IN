import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>   {/* alag alag pages aynge yahi ??? outlet hai har jagah navbar same hai but content change */}
      <Footer />
    </div>
  )
}

export default Layout
