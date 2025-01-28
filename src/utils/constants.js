const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
export const REGION_CODE = "IN"

export const YOUTUBE_VIDEOS_API             = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CliveStreamingDetails&regionCode=" + REGION_CODE + "&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_SEARCH_API             = "https://www.googleapis.com/youtube/v3/search?part=snippet&regionCode=" + REGION_CODE + "&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_CHANNELS_API           = "https://youtube.googleapis.com/youtube/v3/channels?key=" + YOUTUBE_API_KEY;
export const YOUTUBE_VIDEO_CATEGORIES_API   = "https://youtube.googleapis.com/youtube/v3/videoCategories?regionCode=" + REGION_CODE + "&key=" + YOUTUBE_API_KEY;