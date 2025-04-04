import { useEffect, useState } from "react"
import { YOUTUBE_LIVE_CHAT_MESSAGES_API } from "../utils/constants"
import { useSelector } from "react-redux"
import { MdOutlineSend } from "react-icons/md"
import { TfiClose } from "react-icons/tfi"

const LiveChats = ({ liveChatId }) => {

    const [chats, setChats]             = useState([])
    const [chatMessage, setChatMessage] = useState("")
    const [showChat, setShowChat]       = useState(true)
    const userData                      = useSelector((store) => store.user);

    const getLiveChats = async () => {
        const data = await fetch(YOUTUBE_LIVE_CHAT_MESSAGES_API + "&maxResults=100&liveChatId=" + liveChatId)
        const json = await data.json()

        setChats(json?.items?.reverse() || [])
    }

    const handleAddChat = (e) => {
        e.preventDefault();
    
        let chatData = {
            id: Math.floor(Math.random()*(999-100+1)+100), 
            snippet: {
                displayMessage: chatMessage
            },
            authorDetails: {
                profileImageUrl: userData?.photoURL,
                displayName: userData?.displayName
            }
        }
    
        setChatMessage("")
        setChats([chatData, ...chats]);
      }

    useEffect(() => {
        const chatInterval = setInterval(() => {
            getLiveChats();
        }, 15000)

        return () => clearInterval(chatInterval)
    }, [])

    return (
        <div className="p-2 mt-6 border border-gray-300 rounded-lg">
            {
                showChat ? <>
                    <div className="flex items-center px-2 pb-3 pt-2 rounded-md text-xl font-bold border-b border-b-gray-300">
                        Live Chat
                        <div className="ml-auto" onClick={() => setShowChat(!showChat)}>
                            <TfiClose className="hover:bg-gray-200 text-4xl p-2 cursor-pointer rounded-full"/>
                        </div>
                    </div>
                    <div className="h-[525px] pb-2 overflow-x-hidden overflow-y-scroll flex flex-col-reverse border-b border-b-gray-300">
                        {
                            chats.map(chat => 
                                <div className="flex items-center p-2" key={chat?.id}>
                                    <img className="rounded-full w-8 h-8" src={chat?.authorDetails?.profileImageUrl} alt="profile" />
                                    <div className="flex flex-row flex-wrap pl-4">
                                        <p className="pl-2">
                                            <span className="text-gray-600 pr-2">{chat?.authorDetails?.displayName.substring(0, 14)}</span>
                                            <span className="font-normal">{chat?.snippet?.displayMessage}</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {
                        (userData && userData?.uid)
                        ? <form className="flex items-center" onSubmit={handleAddChat}>
                            <input type="text" className="w-full px-2 pb-2 pt-3 resize-none min-h-[24px] max-h-24 overflow-y-auto text-xl bg-transparent border-b border-b-gray-300 focus:border-b focus:border-black focus:outline-none" placeholder="Chat" onChange={e => setChatMessage(e.target.value)} value={chatMessage} />
                            <button type="submit"><MdOutlineSend className="w-10  ml-4 text-4xl cursor-pointer text-gray-400 hover:text-gray-600" /></button>
                        </form>
                        : <div className="px-2 pt-4 pb-2 text-center font-semibold rounded-lg">Login to Chat</div>
                    }
                </>
                : <div className="p-2 m-2 border border-gray-300 text-center hover:bg-gray-200 cursor-pointer font-semibold rounded-lg shadow-md" onClick={() => setShowChat(!showChat)}>Show Chat</div>
            }
        </div>
    )
}

export default LiveChats