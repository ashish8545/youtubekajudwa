import React from 'react'
import { FaCircleUser, FaClockRotateLeft } from 'react-icons/fa6'
import { PiBroadcastFill } from 'react-icons/pi'
import { MdLocalFireDepartment, MdMovieFilter, MdOndemandVideo, MdOutlineShoppingBag, MdQueueMusic } from 'react-icons/md'
import SignInButton from './common/SignInButton'
import SidebarMenuItem from './common/SidebarMenuItem'
import { useSelector } from 'react-redux'
import { HiMiniHome } from 'react-icons/hi2'
import { ReactComponent as ShortsSvg } from '../shortsIcon.svg'

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return isMenuOpen ? (
    <div className="mt-2 w-60 h-full overflow-y-auto scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-500">
      <ul className="pb-4">
        <li>
          <SidebarMenuItem itemName="Home" CustomIconComponent={HiMiniHome} />
        </li>
        <li>
          <SidebarMenuItem itemName="Shorts" CustomIconComponent={ShortsSvg} />
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
      <ul className="py-4 pl-3 border-t-2">
        <li>
          <div className="pb-2 text-sm pl-4">Sign in to like videos,<br/> comment, and subscribe.</div>
        </li>
        <li>
          <div className="pl-4">
            <SignInButton />
          </div>
        </li>
      </ul>
      <h1 className="font-semibold pt-4 pl-6 border-t-2">Explore</h1>
      <ul className="py-4">
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
          <SidebarMenuItem itemName="Live" CustomIconComponent={PiBroadcastFill} />
        </li>
      </ul>
    </div>
  ) : (
    <div className="mt-2">
      <ul className="pb-4">
      <li>
          <SidebarMenuItem itemName="Home" CustomIconComponent={HiMiniHome} isMenuOpen={isMenuOpen} />
        </li>
        <li>
          <SidebarMenuItem itemName="Shorts" CustomIconComponent={ShortsSvg} isMenuOpen={isMenuOpen} />
        </li>
        <li>
          <SidebarMenuItem itemName="Subscriptions" CustomIconComponent={MdOndemandVideo} isMenuOpen={isMenuOpen} />
        </li>
        <li>
          <SidebarMenuItem itemName="You" CustomIconComponent={FaCircleUser} isMenuOpen={isMenuOpen} />
        </li>
        <li>
          <SidebarMenuItem itemName="History" CustomIconComponent={FaClockRotateLeft} isMenuOpen={isMenuOpen} />
        </li>
      </ul>
    </div>
  )
}

export default Sidebar