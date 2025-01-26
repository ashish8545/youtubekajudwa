import React from 'react'
import VideosContainer from './VideosContainer'
import VideoCategoriesButtonList from './VideoCategoriesButtonList'

const MainContainer = () => {
  return (
    <div className="flex-1 overflow-y-auto p-2">
        <VideoCategoriesButtonList />
        <VideosContainer />
    </div>
  )
}

export default MainContainer