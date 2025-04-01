import { useEffect, useState } from "react"
import Comment from "./Comment";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const CommentsList = ({ commentsData }) => {
    const [showReply, setShowReply] = useState({})

    return (
        <>
            {
                commentsData.map((commentData) => (
                        <div key={commentData?.id}>
                            <Comment 
                                imageUrl={commentData?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl || commentData?.snippet?.authorProfileImageUrl} 
                                name={commentData?.snippet?.topLevelComment?.snippet?.authorDisplayName || commentData?.snippet?.authorDisplayName} 
                                comment={commentData?.snippet?.topLevelComment?.snippet?.textDisplay || commentData?.snippet?.textDisplay} 
                                updatedAt={commentData?.snippet?.topLevelComment?.snippet?.updatedAt || commentData?.snippet?.updatedAt}
                            />
                            {
                                commentData?.replies && (
                                    <>
                                        <div className="flex items-center ml-2 px-2 rounded-lg text-blue-600 text-lg">
                                            <span className="p-4 rounded-full hover:bg-blue-200 cursor-pointer" onClick={() => setShowReply({...showReply, [commentData?.id]: !showReply?.[commentData?.id]})}>
                                                {showReply?.[commentData?.id] ? <FaAngleUp /> : <FaAngleDown />}
                                            </span>
                                             • 
                                            <span className="ml-2">
                                                {commentData?.replies?.comments?.length}
                                                {commentData?.replies?.comments?.length === 1 ? " reply" : " replies"}
                                            </span>
                                        </div>
                                        {
                                            showReply?.[commentData?.id] && <div className="ml-10 pl-4 border-l border-l-gray-400">
                                                <CommentsList commentsData={commentData?.replies?.comments || []} />
                                            </div>
                                        }
                                    </>
                                )
                            }
                        </div>
                    )
                )
            }    
        </>
    )
}

export default CommentsList