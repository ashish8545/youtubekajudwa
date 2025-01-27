import React from 'react'
import { useSelector } from 'react-redux'
import LiveBanner from './common/LiveBanner';
import { convertNumberToK, convertUtcToDaysAgo } from '../utils/helper';

const VideoCard = ({ videoData, channelsList = [] }) => {
    const isMenuOpen            = useSelector((store) => store.app.isMenuOpen);
    const snippet               = videoData?.snippet;
    const statistics            = videoData?.statistics;
    const liveStreamingDetails  = videoData?.liveStreamingDetails;
    const channelData           = channelsList.filter(channel => channel?.id === snippet?.channelId);

    return (
        <div style={(isMenuOpen ? {width: "400px"} : {width: "330px"})}>
            <div className="h-[190px]">
                <img className="cursor-pointer rounded-2xl w-full h-full object-cover" alt="Video Thumbnail" src={snippet?.thumbnails?.standard?.url} />
            </div>
            <div className="flex py-2 cursor-pointer">
                <div className="relative">
                    <div className={"h-12 w-12 rounded-full p-[3px] flex " + (snippet?.liveBroadcastContent === "live" ? "border-[2px] border-red-600" : "")}>
                        <img className="cursor-pointer h-full w-full rounded-full" alt="Channel Image" src={channelData[0]?.snippet?.thumbnails?.default?.url || snippet?.thumbnails?.standard?.url} />
                        {
                            snippet?.liveBroadcastContent === "live" && <span className="bg-red-600 text-white text-[11px] rounded-2xl px-2 absolute top-[32px] left-[6px] z-10">LIVE</span>
                        }
                    </div>
                </div>
                <div className="pl-3 text-gray-600 text-sm">
                    <p className="font-bold text-md pb-1 text-black">
                        {snippet?.title}
                    </p>
                    <p className="leading-5 hover:text-black">
                        {snippet?.channelTitle}
                    </p>
                    <p>
                        {convertNumberToK(statistics?.viewCount)} views <span>• {liveStreamingDetails && "Streamed "} 
                        {
                            liveStreamingDetails && liveStreamingDetails?.actualEndTime ? convertUtcToDaysAgo(liveStreamingDetails?.actualEndTime) : convertUtcToDaysAgo(snippet?.publishedAt)
                        }
                        </span>
                    </p>
                    {
                        snippet?.liveBroadcastContent === "live" && 
                        <>
                            <p>
                                {convertNumberToK(liveStreamingDetails?.concurrentViewers)} Watching
                            </p>
                            <div className="mt-2">
                                <LiveBanner />
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default VideoCard