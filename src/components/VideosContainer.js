import React, { useCallback, useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { YOUTUBE_VIDEOS_API, YOUTUBE_CHANNELS_API, YOUTUBE_SEARCH_API } from '../utils/constants';
import { useSelector } from 'react-redux';

const VideosContainer = ({ categoryId, setMainIsLoading, videos, setVideos }) => {
  const [channels, setChannels]           = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [isLoading, setIsLoading]         = useState(false);
  const isMenuOpen                        = useSelector((store) => store.app.isMenuOpen)

  const getVideos = useCallback(async (pageToken = "", clearVideos = false) => {
    setIsLoading(true)
    try {
      let liveVideos = [];
      let videoIds = "";

      if (categoryId) {
        const dataLive = await fetch(YOUTUBE_SEARCH_API + "&eventType=live&type=video&maxResults=5&q=Valorant&videoCategoryId=" + categoryId);
        const jsonLive = await dataLive.json();
        videoIds = jsonLive?.items?.map(item => item?.id?.videoId).join(',');
      }

      if (videoIds.length) {
        const dataT = await fetch(YOUTUBE_VIDEOS_API + "&id=" + videoIds);
        const jsonT = await dataT.json();

        liveVideos = jsonT?.items || []
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
    const existingChannelIds  = channels.map(channel => channel.id);
    const newChannelIds       = videos
      .map(video => video?.snippet?.channelId)
      .filter(channelId => !existingChannelIds.includes(channelId));

    if (newChannelIds.length > 0) {
      const data = await fetch(YOUTUBE_CHANNELS_API + "&part=snippet%2CcontentDetails%2Cstatistics&id=" + (newChannelIds.join("%2C")));
      const json = await data.json();
      setChannels(prevChannels => [...prevChannels, ...(json?.items || [])]);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPageToken && !isLoading) {
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
  }, [nextPageToken, isLoading])

  return (
    <div className="p-2 flex flex-wrap gap-6">
      { videos.map(video => <VideoCard key={video.id} videoData={video} channelsList={channels} />) }
      { isLoading && <p className="w-full p-2 text-center font-semibold">Loading more...</p> }
      <div id="lazy" className="h-[10px]"></div>
    </div>
  )
}

export default VideosContainer