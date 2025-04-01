import { convertUtcToDaysAgo } from "../utils/helper"

const Comment = ({ imageUrl, name, comment, updatedAt }) => {
  return (
    <div className="p-4 rounded-lg">
        <div className="flex items-center">
        <div>
            <img className="w-12 rounded-full" src={imageUrl} alt="Profile" />
        </div>
        <div className="ml-4">
            <span className="font-bold">{name}</span>
            <span className="text-sm ml-2">{convertUtcToDaysAgo(updatedAt)}</span>
            <p>{comment.startsWith("@@") ? ("@" + comment.slice(2)) : comment}</p>
        </div>
        </div>
    </div>
  )
}

export default Comment