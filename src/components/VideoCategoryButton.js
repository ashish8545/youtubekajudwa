import React from 'react'

const VideoCategoryButton = ({ categoryData, categoryId, setCategoryId, setVideos }) => {
    const buttonName = categoryData?.snippet?.title;
    const handleCategoryId = () => {
        setVideos([]);
        setCategoryId(categoryData?.id || "")
    }

    return (
        <div className={"shrink-0 m-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer " + (buttonName ? "bg-gray-100 hover:bg-gray-200" : "bg-black text-white") + (categoryId && categoryId === categoryData?.id ? " px-3 py-2 bg-gray-200 hover:bg-gray-300" : " px-3 py-1")} onClick={handleCategoryId}>
            {buttonName || "All"}
        </div>
    )
}

export default VideoCategoryButton