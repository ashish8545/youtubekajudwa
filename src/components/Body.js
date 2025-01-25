import React from 'react'
import Sidebar from './Sidebar'
import MainContainer from './MainContainer'

const Body = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContainer />
    </div>
  )
}

export default Body