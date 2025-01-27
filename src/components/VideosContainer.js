import React, { useCallback, useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { YOUTUBE_ALL_VIDEOS_API_URL, YOUTUBE_CHANNELS_BY_CHANNELID_API_URL } from '../utils/constants';

const VideosContainer = () => {

  const [videos, setVideos]               = useState([]);
  const [channels, setChannels]           = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [isLoading, setIsLoading]         = useState(false);

  useEffect(() => {
    getVideos();
  }, [])

  useEffect(() => {
    getChannels();
  }, [videos])

  const getVideos = useCallback(async (pageToken = "") => {
    setIsLoading(true);
    try {
      const data = await fetch(YOUTUBE_ALL_VIDEOS_API_URL + "&pageToken=" + pageToken);
      const json = await data.json();
  
      setVideos(prevVideos => [...prevVideos, ...(json?.items || [])])
      setNextPageToken(json?.nextPageToken)
    } catch (error) {
      console.error("Error fetching videos: " + error)
    } finally {
      setIsLoading(false);
    }
  }, [])

  const getChannels = async () => {
    const existingChannelIds  = channels.map(channel => channel.id);
    const newChannelIds       = videos
      .map(video => video?.snippet?.channelId)
      .filter(channelId => !existingChannelIds.includes(channelId));

    if (newChannelIds.length > 0) {
      const data = await fetch(YOUTUBE_CHANNELS_BY_CHANNELID_API_URL + (newChannelIds.join("%2C")));
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
      {videos.map(video => <VideoCard key={video.id} videoData={video} channelsList={channels} />)}
      {isLoading && <p className="p-2 bg-gray-100 hover:bg-gray-200 text-center text-lg w-full">Loading more...</p>}
      <div id="lazy" className="h-[10px]"></div>
    </div>
  )
}

export default VideosContainer