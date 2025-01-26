import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { YOUTUBE_ALL_VIDEOS_API_URL, YOUTUBE_CHANNELS_BY_CHANNELID_API_URL } from '../utils/constants';

const VideosContainer = () => {

  const [videos, setVideos]     = useState([]);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    getVideos();
  }, [])

  useEffect(() => {
    getChannels();
  }, [videos])

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_ALL_VIDEOS_API_URL);
    const json = await data.json();

    setVideos(json?.items);
  }

  const getChannels = async () => {
    let channelIds = [];
    if (videos.length) {
      channelIds = videos.map((videoData) => videoData?.snippet?.channelId)
    }
    const data = await fetch(YOUTUBE_CHANNELS_BY_CHANNELID_API_URL + "[" + (channelIds.join("%2C")) + "]");
    const json = await data.json();

    setChannels(json?.items);
  }

  return (
    <div className="p-2 flex flex-wrap gap-6">
      {videos.map(video => <VideoCard key={video.id} videoData={video} channelsList={channels} />)}
    </div>
  )
}

export default VideosContainer