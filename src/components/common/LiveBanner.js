import React from 'react'
import { PiBroadcastFill } from 'react-icons/pi'

const LiveBanner = () => {
  return (
    <div className="">
        <div className="bg-red-600 text-white text-end px-2 rounded-md flex items-center w-14">
            <PiBroadcastFill />
            <span className="py-1 pl-1 text-xs">LIVE</span>
        </div>
    </div>
  )
}

export default LiveBanner