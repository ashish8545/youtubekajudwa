import React, { useEffect, useRef, useState } from 'react';
import VideoCategoryButton from './VideoCategoryButton';
import { YOUTUBE_VIDEO_CATEGORIES_API_URL } from '../utils/constants';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const VideoCategoriesButtonList = () => {

  const carouselRef = useRef(null);
  const [videoCategories, setVideoCategories] = useState([])
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  useEffect(() => {
    getVideoCategories();
  }, []);

  const getVideoCategories = async () => {
    const data = await fetch(YOUTUBE_VIDEO_CATEGORIES_API_URL);
    const json = await data.json();

    setVideoCategories(json.items);
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

      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
        setShowNextButton(false);
      } else {
        setShowNextButton(true);
      }
    }
  }

  return (
    <div className="relative flex w-full mt-2">
        <div ref={carouselRef} className="flex max-w-full overflow-x-auto mx-auto scrollbar-none" onScroll={carouselButtonHandler}>
          <VideoCategoryButton />
          { videoCategories.map(category => <VideoCategoryButton key={category.id} categoryData={category} />) }
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

export default VideoCategoriesButtonList