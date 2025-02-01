import React, { useEffect, useRef, useState } from 'react';
import VideoCategoryButton from './VideoCategoryButton';
import { YOUTUBE_VIDEO_CATEGORIES_API } from '../utils/constants';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Broken from './common/Broken';

const VideoCategoriesButtonList = ({ categoryId, setCategoryId, setVideos }) => {

  const carouselRef = useRef(null);
  const [videoCategories, setVideoCategories] = useState([])
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  useEffect(() => {
    getVideoCategories();
  }, []);

  const getVideoCategories = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_CATEGORIES_API + "&part=snippet");
      const json = await data.json();
  
      setVideoCategories(json.items || []);
    } catch (error) {
      console.error("Error fetching videos: " + error)
    }
  }

  const handleScroll = (direction) => {
    const scrollAmount = 200; // Amount to scroll per click
    if (carouselRef.current) {
      const container = carouselRef.current;
      if (direction === "prev") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "next") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const carouselButtonHandler = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;

      if (container.scrollLeft === 0) {
        setShowPrevButton(false);
      } else {
        setShowPrevButton(true);
      }

      if (container.scrollLeft + container.offsetWidth + 100 >= container.scrollWidth) {
        setShowNextButton(false);
      } else {
        setShowNextButton(true);
      }
    }
  }

  return (
    <>
      {
        !videoCategories.length ? (
          <div className="flex w-full p-2"> 
            <div className="flex m-auto mt-5">
              <Broken />
            </div>
          </div>
        ) : (
          <div className="flex w-full sticky top-0 bg-white p-2 z-20"> 
            <div ref={carouselRef} className="flex max-w-full overflow-x-auto mx-auto scrollbar-none items-center" onScroll={carouselButtonHandler}>
              <VideoCategoryButton setCategoryId={setCategoryId} setVideos={setVideos} />
              { videoCategories.map(category => <VideoCategoryButton key={category.id} categoryData={category} categoryId={categoryId} setCategoryId={setCategoryId} setVideos={setVideos} />) }
            </div>
            { showPrevButton && <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r pl-4 pr-4 py-2">
              <button
                onClick={() => handleScroll("prev")}
                className="pl-4 pr-3 py-3 rounded-full hover:bg-gray-200"
              >
                <MdArrowBackIos />
              </button>
            </div> }
    
            { showNextButton && <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-l pl-4 pr-6 py-2 text-end">
              <button
                onClick={() => handleScroll("next")}
                className="px-3 pr-3 py-3 rounded-full hover:bg-gray-200"
              >
                <MdArrowForwardIos />
              </button>
            </div> }
          </div>
        ) 
      }
    </>
  )
}

export default VideoCategoriesButtonList