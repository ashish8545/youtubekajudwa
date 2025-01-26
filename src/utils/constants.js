const REGION_CODE = "IN"
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const YOUTUBE_VIDEO_CATEGORIES_API_URL="https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=" + REGION_CODE + "&key=" + YOUTUBE_API_KEY;

export const YOUTUBE_CHANNELS_BY_CHANNELID_API_URL = "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=" + YOUTUBE_API_KEY + "&id=";


export const YOUTUBE_ALL_VIDEOS_API_URL="https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CliveStreamingDetails&chart=mostPopular&maxResults=48&videoCategoryId=20&regionCode=" + REGION_CODE + "&key=" + YOUTUBE_API_KEY;

export const YOUTUBE_VIDEO_BY_ID_API_URL="https://youtube.googleapis.com/youtube/v3/videos?part=snippet&regionCode=" + REGION_CODE + "&key=" + YOUTUBE_API_KEY + "&id=";