import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { DESCRIPTION_OFFSET, YOUTUBE_CHANNELS_API, YOUTUBE_COMMENTS_API, YOUTUBE_VIDEOS_API } from "../utils/constants";
import Broken from "./common/Broken";
import { convertNumberToK } from "../utils/helper";
import { SlActionRedo } from "react-icons/sl";
import { VscThumbsdown, VscThumbsdownFilled, VscThumbsup, VscThumbsupFilled } from "react-icons/vsc";
import CommentsList from "./CommentsList";

const WatchPage = () => {
  const [videoData, setVideoData]       = useState([]);
  const [channelData, setChannelData]   = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [isReadMore, setIsReadMore]     = useState(false);
  const [isLiked, setIsLiked]           = useState(false);
  const [isDisliked, setIsDisliked]     = useState(false);
  const [searchParams]                  = useSearchParams();
  const userData                        = useSelector((store) => store.user);
  const searchQuery                     = decodeURIComponent(searchParams.get("v"));

  const fetchVideoDetails = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEOS_API + "&id=" + searchQuery)
      const json = await data.json();
  
      setVideoData(json?.items || [])

      if (json?.items?.length === 1) {
        // Channel Data
        const channelData = await fetch(YOUTUBE_CHANNELS_API + "&part=snippet%2CcontentDetails%2Cstatistics&id=" + json?.items[0]?.snippet?.channelId);
        const channelJson = await channelData.json();

        setChannelData(channelJson?.items || [])

        // Comments Data
        console.log(YOUTUBE_COMMENTS_API + "&videoId=" + searchQuery)
        const commentsData = await fetch(YOUTUBE_COMMENTS_API + "&videoId=" + searchQuery)
        const commentsJson = await commentsData.json();

        setCommentsData(commentsJson?.items || [])
      }

    } catch (error) {
      console.error("Failed to fetch video data: " + error)
    }
  }

  useEffect(() => {
    fetchVideoDetails()
  }, [])

  return (
    videoData.length !== 1 ? <div className="w-full"><Broken /></div> :
    <div className={"flex-1 px-2 relative overflow-y-auto"}>
      <div className="grid grid-cols-3 w-full">
        <div className="px-4 pt-2 pb-10 col-span-2">
            <div className="pt-4">
              <iframe
                width="100%"
                height="600px"
                src={"https://www.youtube.com/embed/" + searchQuery}
                title="Youtube Video Player"
                allow="accelerometer; autoplay; clipboard-write"
                allowFullScreen
              ></iframe>
            </div>
            <div className="pt-4">
              <h2 className="text-2xl font-bold">{videoData?.[0]?.snippet?.title}</h2>
            </div>
            <div className="pt-4 flex">
              <div className="w-2/5 flex items-center">
                <div>
                  <img src={
                    channelData[0]?.snippet?.thumbnails?.default?.url ||
                    videoData[0]?.snippet?.thumbnails?.high?.url
                  }
                  alt="channel"
                  className="rounded-full w-14 shadow-md"
                  />
                </div>
                <div className="pl-4">
                  <h4 className="font-bold text-xl">{channelData[0]?.snippet?.title}</h4>
                  {
                    !channelData[0]?.statistics?.hiddenSubscriberCount ? convertNumberToK(channelData[0]?.statistics?.subscriberCount) + " subscribers" : ""
                  }
                </div>
                <div className="ml-4">
                  {(userData && userData?.uid) ? <button className="bg-black py-3 px-7 text-md rounded-full text-white hover:bg-gray-800 tracking-wider">Subscribe</button> : "" }
                </div>
              </div>
              <div className="w-3/5 flex pr-3">
                  <div className="flex items-center ml-auto">
                    <span className="mr-8 rounded-full border border-black flex items-center cursor-pointer">
                        <span className="hover:bg-gray-200 flex items-center h-full w-full rounded-l-full p-2" onClick={() => {
                          setIsLiked(!isLiked)
                          if (isDisliked === true) setIsDisliked(false)
                        }}>
                          {isLiked ? <VscThumbsupFilled className="ml-2 mr-2 text-2xl animate-jump-in" /> : <VscThumbsup className="ml-2 mr-2 text-2xl" />}
                          <span className="mr-2">{convertNumberToK(videoData[0]?.statistics?.viewCount)}</span>
                        </span>
                        <span className="text-gray-400 text-2xl">|</span>
                        <span className="px-4 py-2 rounded-r-full hover:bg-gray-200" onClick={() => {
                          setIsDisliked(!isDisliked)
                          if (isLiked === true) setIsLiked(false)
                        }}>
                          {isDisliked ? <VscThumbsdownFilled className="text-2xl animate-jump-in" /> : <VscThumbsdown className="text-2xl" />}
                        </span>
                    </span>
                    <button className="flex items-center bg-black px-6 py-2 text-lg rounded-full text-white hover:bg-gray-800 tracking-wider ml-auto">
                      <SlActionRedo className="mr-2" /> Share
                    </button>
                  </div>
              </div>
            </div>
            <div className="mt-6 px-4 py-4 rounded-xl bg-gray-200">
              <span>
                {videoData[0]?.snippet?.description.length > DESCRIPTION_OFFSET && !isReadMore ? videoData[0]?.snippet?.description.substring(0, DESCRIPTION_OFFSET) : videoData[0]?.snippet?.description}
                {!isReadMore ? <span className="font-semibold text-gray-700 cursor-pointer" onClick={() => setIsReadMore(!isReadMore)}> ...more</span> : ""}
                {isReadMore ? <p className="font-semibold text-gray-700 cursor-pointer" onClick={() => setIsReadMore(!isReadMore)}>Show less</p> : ""}
              </span>
            </div>
            <div className="pt-4">
              <h2 className="text-2xl font-bold pb-2">Comments</h2>
              <div>
                <CommentsList commentsData={commentsData} parentCommentId={0} />
              </div>
              <input type="text" className="w-full pb-2 resize-none min-h-[24px] max-h-24 overflow-y-auto text-xl bg-transparent border-b border-b-gray-300 focus:border-b focus:border-black focus:outline-none" />
              <div className="flex">
                <div className="ml-auto mt-2">
                  <button className="px-4 py-2 mr-2 hover:text-gray-600">Cancel</button>
                  <button className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-full">Comment</button>
                </div>
              </div>
            </div>
        </div>
        <div>
          Chats
        </div>
      </div>
    </div>
  )
}

export default WatchPage