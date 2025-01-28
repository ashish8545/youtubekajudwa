import React from 'react'
import { PiBroadcastFill } from 'react-icons/pi'

const LiveBanner = () => {
  return (
    <div className="">
        <div className="bg-red-600 text-white px-1 text-[12px] flex items-center">
            <PiBroadcastFill />
            <span className="pl-1 font-semibold">LIVE</span>
        </div>
    </div>
  )
}

export default LiveBanner