import React, { useCallback, useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { YOUTUBE_VIDEOS_API, YOUTUBE_CHANNELS_API, YOUTUBE_SEARCH_API } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cachedVideosByCategoryId } from '../utils/slices/videosByCategoryIdSlice'

const VideosContainer = ({ categoryId, isMainLoading, setMainIsLoading, videos, setVideos }) => {
  const dispatch                          = useDispatch();
  const [channels, setChannels]           = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [isLoading, setIsLoading]         = useState(false);
  const isMenuOpen                        = useSelector((store) => store.app.isMenuOpen)
  const cachedVideosByCategoryIdResult    = useSelector((store) => store.video_by_category_id)

  const getVideos = useCallback(async (pageToken = "", clearVideos = false) => {
    setIsLoading(true)

    try {
      let liveVideos = [];
      let videoIds = "";

      if (categoryId) {
        if (cachedVideosByCategoryIdResult[categoryId]) {
          liveVideos = cachedVideosByCategoryIdResult[categoryId]
        } else {
          const dataLive = await fetch(YOUTUBE_SEARCH_API + "&eventType=live&type=video&maxResults=5&q=Valorant&videoCategoryId=" + categoryId);
          const jsonLive = await dataLive.json();
          videoIds = jsonLive?.items?.map(item => item?.id?.videoId).join(',');
    
          if (videoIds.length) {
            const dataT = await fetch(YOUTUBE_VIDEOS_API + "&id=" + videoIds);
            const jsonT = await dataT.json();
    
            liveVideos = jsonT?.items || []
          }
        }
  
        dispatch(cachedVideosByCategoryId({
          [categoryId]: liveVideos
        }))
      }

      let maxResults = (isMenuOpen) ? 15 : 16;
      const data = await fetch(YOUTUBE_VIDEOS_API + "&chart=mostPopular&maxResults=" + maxResults + "&pageToken=" + pageToken + (categoryId ? "&videoCategoryId=" + categoryId : ""));
      const json = await data.json();
  
      // Set timeout to show transparent screen loader unless the DOM is updated
      setTimeout(() => {
        if (clearVideos) {
          setVideos([]);
        }

        setVideos(prevVideos => [...liveVideos, ...prevVideos, ...(json?.items || [])])
        setNextPageToken(json?.nextPageToken)
        setMainIsLoading(false);
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching videos: " + error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
        setMainIsLoading(false);
      }, 1000)
    }
  }, [categoryId])

  useEffect(() => {
    if (!videos.length) setMainIsLoading(true);
    setNextPageToken("");
    getVideos("", true);
  }, [categoryId, getVideos])

  useEffect(() => {
    getChannels();
  }, [videos])

  const getChannels = async () => {
    try {
      const existingChannelIds  = channels.map(channel => channel.id);
      const newChannelIds       = videos
        .map(video => video?.snippet?.channelId)
        .filter(channelId => !existingChannelIds.includes(channelId));
  
      if (newChannelIds.length > 0) {
        const data = await fetch(YOUTUBE_CHANNELS_API + "&part=snippet%2CcontentDetails%2Cstatistics&id=" + (newChannelIds.join("%2C")));
        const json = await data.json();
        setChannels(prevChannels => [...prevChannels, ...(json?.items || [])]);
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (videos.length && entries[0].isIntersecting && nextPageToken && !isLoading) {
        getVideos(nextPageToken);
      }
    }, { threshold: 1.0 });

    const lazyElement = document.querySelector("#lazy");
    if (lazyElement) {
      observer.observe(lazyElement)
    }

    return () => {
      if (observer && lazyElement) {
        observer.unobserve(lazyElement)
      }
    }
  }, [nextPageToken, isLoading, videos])

  return (
    <div className={"p-4 grid gap-6 " + (isMenuOpen ? "grid-cols-3" : "grid-cols-4")}>
      { videos.map(video => <Link to={"/watch?v=" + video.id} key={video.id}><VideoCard videoData={video} channelsList={channels} /></Link>) }
      { !isMainLoading && isLoading && <p className="w-full p-2 text-center font-semibold">Loading more...</p> }
      <div id="lazy" className="h-[10px]"></div>
    </div>
  )
}

export default VideosContainer