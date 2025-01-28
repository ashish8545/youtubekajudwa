import React, { useEffect, useRef, useState } from 'react'
import VideosContainer from './VideosContainer'
import VideoCategoriesButtonList from './VideoCategoriesButtonList'

const MainContainer = () => {
  const [categoryId, setCategoryId]       = useState("");
  const [isMainLoading, setMainIsLoading] = useState(false);
  const [videos, setVideos]               = useState([]);
  const parentRef                         = useRef(null);
  const overlayRef                        = useRef(null);

  useEffect(() => {
    const updateOverlayHeight = () => {
      if (overlayRef.current && parentRef.current) {
        overlayRef.current.style.height = `${parentRef.current.scrollHeight}px`;
      }
    };

    updateOverlayHeight();

    // Call updateOverlayHeight whenever new videos are loaded
    const observer = new MutationObserver(updateOverlayHeight);
    if (parentRef.current) {
      observer.observe(parentRef.current, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [isMainLoading]);

  return (
    <div className={"flex-1 px-2 relative " + (!isMainLoading ? "overflow-y-auto" : "overflow-y-hidden")} ref={parentRef}>
      {isMainLoading && (
        <div
          className="absolute inset-0 bg-white bg-opacity-80 z-30 h-full w-full"
          style={{ pointerEvents: "auto" }}
          ref={overlayRef}
        ></div>
      )}
        <VideoCategoriesButtonList categoryId={categoryId} setCategoryId={setCategoryId} setVideos={setVideos} />
        <VideosContainer categoryId={categoryId} isMainLoading={isMainLoading} setMainIsLoading={setMainIsLoading} videos={videos} setVideos={setVideos} />
    </div>
  )
}

export default MainContainer