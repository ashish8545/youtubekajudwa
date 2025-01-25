import React from 'react'
import { FaCircleUser, FaClockRotateLeft, FaTowerBroadcast } from 'react-icons/fa6'
import { MdHomeFilled, MdLocalFireDepartment, MdMovieFilter, MdOndemandVideo, MdOutlineShoppingBag, MdQueueMusic } from 'react-icons/md'
import { TfiControlShuffle } from 'react-icons/tfi'
import SignInButton from './common/SignInButton'
import SidebarMenuItem from './common/SidebarMenuItem'

const Sidebar = () => {
  return (
    <div className="col-span-1 p-4">
      <ul className="pb-4">
        <li>
          <SidebarMenuItem itemName="Home" CustomIconComponent={MdHomeFilled} />
        </li>
        <li>
          <SidebarMenuItem itemName="Shorts" CustomIconComponent={TfiControlShuffle} />
        </li>
        <li>
          <SidebarMenuItem itemName="Subscriptions" CustomIconComponent={MdOndemandVideo} />
        </li>
      </ul>
      <ul className="pb-4 pt-4 border-t-2">
        <li>
          <SidebarMenuItem itemName="You" CustomIconComponent={FaCircleUser} />
        </li>
        <li>
          <SidebarMenuItem itemName="History" CustomIconComponent={FaClockRotateLeft} />
        </li>
      </ul>
      <ul className="pb-4 pt-4 border-t-2">
        <li>
          <div className="pb-2 text-sm pl-4">Sign in to like videos,<br/> comment, and subscribe.</div>
        </li>
        <li>
          <div className="pl-4">
            <SignInButton />
          </div>
        </li>
      </ul>
      <h1 className="font-semibold pt-4 border-t-2">Explore</h1>
      <ul className="pb-4 pt-4">
        <li>
          <SidebarMenuItem itemName="Trending" CustomIconComponent={MdLocalFireDepartment} />
        </li>
        <li>
          <SidebarMenuItem itemName="Shopping" CustomIconComponent={MdOutlineShoppingBag} />
        </li>
        <li>
          <SidebarMenuItem itemName="Music" CustomIconComponent={MdQueueMusic} />
        </li>
        <li>
          <SidebarMenuItem itemName="Movies" CustomIconComponent={MdMovieFilter} />
        </li>
        <li>
          <SidebarMenuItem itemName="Live" CustomIconComponent={FaTowerBroadcast} />
        </li>
      </ul>
    </div>
  )
}

export default Sidebar