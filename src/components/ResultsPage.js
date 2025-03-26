import { useSearchParams } from "react-router-dom"
import { YOUTUBE_CHANNELS_API, YOUTUBE_SEARCH_API, YOUTUBE_VIDEOS_API } from "../utils/constants";
import { useEffect, useState } from "react";
import { convertNumberToK, convertUtcToDaysAgo } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { cachedResults } from "../utils/slices/resultsSlice";

const ResultsPage = () => {

    const dispatch              = useDispatch();
    const resultsCached         = useSelector((store) => store.results)
    const [searchParams]        = useSearchParams();
    const [videos, setVideos]   = useState([]);
    const [channels, setChannels] = useState([]);

    const fetchVideo = async () => {
        if (resultsCached[decodeURIComponent(searchParams.get("search_query"))]) {
            setVideos(resultsCached[decodeURIComponent(searchParams.get("search_query"))])
        } else {
            let videoIds = "";
    
            const data = await fetch(YOUTUBE_SEARCH_API + "&type=video&maxResults=10&q=" + decodeURIComponent(searchParams.get("search_query")));
            const json = await data.json()
    
            videoIds = json?.items?.map(item => item?.id?.videoId).join(',');
    
            if (videoIds.length) {
                const dataT = await fetch(YOUTUBE_VIDEOS_API + "&id=" + videoIds);
                const jsonT = await dataT.json();
    
                setVideos(jsonT?.items || [])
                
                dispatch(cachedResults({
                    [decodeURIComponent(searchParams.get("search_query"))]: jsonT?.items
                }))
            }
        }

    }

    const getChannels = async () => {
        try {
          const existingChannelIds  = channels.map(channel => channel.id);
          const newChannelIds       = videos
            .map(video => video?.snippet?.channelId)
            .filter(channelId => !existingChannelIds.includes(channelId));
      
          if (newChannelIds.length > 0) {
            const data = await fetch(YOUTUBE_CHANNELS_API + "&part=snippet%2CcontentDetails%2Cstatistics&id=" + (newChannelIds.join("%2C")));
            const json = await data.json();

            const channelRekeyed = {
                items: json?.items.reduce((acc, item) => {
                    acc[item.id] = item;
                    return acc;
                }, {})
            };

            setChannels(channelRekeyed?.items || []);
          }
        } catch (error) {
          console.error(error)
        }
    }

    useEffect(() => {
        fetchVideo()
    }, [searchParams.get("search_query")])

    useEffect(() => {
        getChannels()
    }, [videos])

    return (
        <div className="px-20 py-4 m-4 overflow-y-auto w-full">
            {
                videos.map((video) => 
                    <div className="grid grid-cols-12 pb-8" key={video?.id}>
                        <div className="col-span-5">
                            <div className="h-[350px]">
                                {/* <iframe 
                                    width="100%" 
                                    height="100%" 
                                    loading="eager"
                                    src={ "//www.youtube.com/embed/" + video?.id?.videoId} 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerpolicy="strict-origin-when-cross-origin" 
                                    allowfullscreen
                                    className="cursor-pointer rounded-2xl"
                                >
                                </iframe> */}
                                <img className="cursor-pointer rounded-2xl w-full h-full object-cover" alt="Video Thumbnail" src={video?.snippet?.thumbnails?.high?.url} />
                            </div>
                        </div>
                        <div className="col-span-7 pl-4">
                            <h2 className="text-2xl">{video?.snippet?.title}</h2>

                            {
                                video?.snippet?.liveBroadcastContent === "none" &&
                                <p>
                                    {convertNumberToK(video?.statistics?.viewCount)} views <span>• {video?.liveStreamingDetails && "Streamed "} 
                                    {
                                        video?.liveStreamingDetails && video?.liveStreamingDetails?.actualEndTime ? convertUtcToDaysAgo(video?.liveStreamingDetails?.actualEndTime) : convertUtcToDaysAgo(video?.snippet?.publishedAt)
                                    }
                                    </span>
                                </p>
                            }

                            <div className="flex items-center gap-3 pt-4">
                                <img className="cursor-pointer h-full w-full rounded-full h-10 w-10" alt="Channel Image" src={channels[video?.snippet?.channelId]?.snippet?.thumbnails?.default?.url || channels[video?.snippet?.channelId]?.snippet?.thumbnails?.high?.url} />
                                <h4 className="text-md">{channels[video?.snippet?.channelId]?.snippet?.title}</h4>
                            </div>

                            <p className="text-md text-gray-500 pt-4 line-clamp-2">{channels[video?.snippet?.channelId]?.snippet?.description}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ResultsPage