import React, { useState } from 'react'
import VideosContainer from './VideosContainer'
import VideoCategoriesButtonList from './VideoCategoriesButtonList'

const MainContainer = () => {
  const [categoryId, setCategoryId] = useState("");
  const [isLoading, setIsLoading]   = useState(false);

  return (
    <div className={"flex-1 px-2 relative " + (!isLoading ? "overflow-y-auto" : "overflow-y-hidden")}>
      {isLoading && (
        <div
          className="absolute inset-0 bg-white bg-opacity-80 z-30"
          style={{ pointerEvents: "auto" }}
        ></div>
      )}
        <VideoCategoriesButtonList setCategoryId={setCategoryId} />
        <VideosContainer categoryId={categoryId} isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  )
}

export default MainContainer