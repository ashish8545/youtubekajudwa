import { convertNumberToK, convertUtcToDaysAgo } from "../utils/helper";

const RecommendedVideoCard = ({ video, channels }) => {
    const channelData = channels.filter(
        (channel) => channel?.id === video?.snippet?.channelId
    );

    return (
        <div className="py-1 grid grid-cols-7">
            <div className="h-32 border-2 col-span-3">
                <img className={"cursor-pointer rounded-lg object-cover w-full h-full"} src={video?.snippet?.thumbnails?.high?.url} alt="video" />
            </div>
            <div className="col-span-4 pl-4">
                <h3 className="font-bold text-xl line-clamp-2">
                    {video?.snippet?.title}
                </h3>
                <p>{channelData[0]?.snippet?.title}</p>
                <p>{convertNumberToK(channelData[0]?.statistics?.viewCount)} views • {convertUtcToDaysAgo(video?.snippet?.publishedAt)}</p>
            </div>
        </div>
    )
}

export default RecommendedVideoCard