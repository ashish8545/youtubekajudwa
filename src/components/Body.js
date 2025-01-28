import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default Body