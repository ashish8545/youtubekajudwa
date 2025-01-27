import React, { useCallback, useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { YOUTUBE_ALL_VIDEOS_API_URL, YOUTUBE_CHANNELS_BY_CHANNELID_API_URL } from '../utils/constants';

const VideosContainer = ({ categoryId, isLoading, setIsLoading }) => {

  const [videos, setVideos]               = useState([]);
  const [channels, setChannels]           = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");

  const getVideos = useCallback(async (pageToken = "", clearVideos = false) => {
    setIsLoading(true);
    try {
      const data = await fetch(YOUTUBE_ALL_VIDEOS_API_URL + "&pageToken=" + pageToken + (categoryId ? "&videoCategoryId=" + categoryId : ""));
      const json = await data.json();
  
      // Set timeout to show transparent screen loader unless the DOM is updated
      setTimeout(() => {
        if (clearVideos) setVideos([]);
        setVideos(prevVideos => [...prevVideos, ...(json?.items || [])])
        setNextPageToken(json?.nextPageToken)
        setIsLoading(false);
      }, 1000)
    } catch (error) {
      console.error("Error fetching videos: " + error)
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    }
  }, [categoryId])

  useEffect(() => {
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
      { videos.map(video => <VideoCard key={video.id} videoData={video} channelsList={channels} />) }
      <div id="lazy" className="h-[10px]"></div>
    </div>
  )
}

export default VideosContainer