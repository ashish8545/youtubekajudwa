import React from 'react'

const VideoCategoryButton = ({ categoryData }) => {
    const buttonName = categoryData?.snippet?.title;
    return (
        <div className={"shrink-0 px-3 py-1 m-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer " + (buttonName ? "bg-gray-100 hover:bg-gray-200" : "bg-black text-white")}>
            {buttonName || "All"}
        </div>
    )
}

export default VideoCategoryButton