import { useEffect, useState } from "react";
import RecommendedVideoCard from "./RecommendedVideoCard"
import { useDispatch, useSelector } from "react-redux";
import { cachedRecommendedVideos } from "../utils/slices/recommendedVideosSlice";
import { YOUTUBE_CHANNELS_API, YOUTUBE_VIDEOS_API } from "../utils/constants";

const RecommendedVideos = ({ videoCategoryId }) => {

    const dispatch                  = useDispatch();
    const cachedRecommended         = useSelector((store) => store.cachedRecommendedVideos)
    const [videos, setVideos]       = useState([]);
    const [channels, setChannels]   = useState([]);
    
    const fetchVideos = async () => {
        const data = await fetch(YOUTUBE_VIDEOS_API + "&chart=mostPopular&maxResults=15&videoCategoryId=" + videoCategoryId);
        const json = await data.json();
        
        setVideos(json?.items || [])
        dispatch(cachedRecommendedVideos(json?.items))
    }

    const getChannels = async () => {
        const channelIds = videos.map(video => video?.snippet?.channelId);

        const data = await fetch(YOUTUBE_CHANNELS_API + "&part=snippet%2CcontentDetails%2Cstatistics&id=" + (channelIds.join("%2C")));
        const json = await data.json();
        setChannels(json?.items || []);
    }

    useEffect(() => {
        if (cachedRecommended) {
            setVideos(cachedRecommended)
        } else {
            fetchVideos();
        }
    }, [])

    useEffect(() => {
        if (videos.length) {
            getChannels()
        }
    }, [videos])

    return (
        <div className="p-2 mt-4">
            <div className="py-2 rounded-md text-xl font-bold">Recommended Videos</div>
            <div className="h-screen overflow-y-scroll">
                { videos.map(video => <RecommendedVideoCard key={video?.id} video={video} channels={channels} />) }
            </div>
        </div>
    )
}

export default RecommendedVideos