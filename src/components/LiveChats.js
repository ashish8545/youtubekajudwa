import { useEffect, useState } from "react"
import { YOUTUBE_LIVE_CHAT_MESSAGES_API } from "../utils/constants"

const LiveChats = ({ liveChatId }) => {

    const [chats, setChats] = useState([])

    const getLiveChats = async () => {
        const data = await fetch(YOUTUBE_LIVE_CHAT_MESSAGES_API + "&maxResults=1&liveChatId=" + liveChatId)
        const json = await data.json()

        console.log(json?.items)
        setChats(json?.items || [])
    }

    useEffect(() => {
        const chatInterval = setInterval(() => {
            // getLiveChats();
        }, 30000)

        return () => clearInterval(chatInterval)
    }, [])

    return (
        <div className="p-2 mt-4">
            <div className="py-2 rounded-md text-xl font-bold">Live Chat</div>
            <div className="flex items-center">
                <img src="" alt="profile" />
                <p>Ashish Shinde</p>
                <p>chat message</p>
            </div>
        </div>
    )
}

export default LiveChats