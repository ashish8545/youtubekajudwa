import React from 'react'
import ButtonList from './ButtonList'
import VideosContainer from './VideosContainer'

const MainContainer = () => {
  return (
    <div className="flex-1 overflow-y-auto">
        <ButtonList />
        <VideosContainer />
    </div>
  )
}

export default MainContainer