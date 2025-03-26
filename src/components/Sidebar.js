import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaAngleUp, FaCircleUser, FaClockRotateLeft } from 'react-icons/fa6'
import { PiBroadcastFill } from 'react-icons/pi'
import { MdLocalFireDepartment, MdMovieFilter, MdOndemandVideo, MdOutlineShoppingBag, MdQueueMusic } from 'react-icons/md'
import SignInButton from './common/SignInButton'
import SidebarMenuItem from './common/SidebarMenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { HiMiniHome } from 'react-icons/hi2'
import { ReactComponent as ShortsSvg } from '../shortsIcon.svg'
import { Link } from 'react-router-dom'
import { YOUTUBE_SUBSCRIPTIONS_API } from '../utils/constants'
import { cachedSubscriptions } from '../utils/slices/subscriptionsSlice'

const Sidebar = () => {
  const dispatch            = useDispatch();
  const isMenuOpen          = useSelector((store) => store.app.isMenuOpen);
  const userData            = useSelector((store) => store.user);
  const subscriptionsCached = useSelector((store) => store.subscriptions);
  const token               = useSelector((store) => store.token)
  const [subscriptions, setSubscriptions] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const getChannels = async () => {
    if (subscriptionsCached) {
      setSubscriptions(subscriptionsCached)
    } else {
      const data = await fetch(YOUTUBE_SUBSCRIPTIONS_API,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await data.json()
  
      setSubscriptions(json?.items || []);
      dispatch(cachedSubscriptions(json?.items))
    }
  }

  useEffect(() => {
    setSubscriptions([]);
    if (userData && userData.uid) {
      getChannels();
    }
  }, [token])

  return isMenuOpen ? (
    <div className="mt-2 w-60 h-full overflow-y-auto scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-500">
      <ul className="pb-4">
        <li>
          <Link to="/"><SidebarMenuItem itemName="Home" CustomIconComponent={HiMiniHome} /></Link>
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

      {
        (subscriptions && subscriptions.length) 
        ?
          <>
            <h1 className="font-semibold pt-4 pl-6 border-t-2">Subscriptions</h1>
            <ul className="py-4 pl-3">
              {
                subscriptions.map((subscription, i) => 
                  <li className={"p-2 cursor-pointer hover:bg-gray-200 rounded-lg" + ((i > 7 && !showMore) ? " hidden" : "")} key={subscription?.id}>
                    <div className="grid grid-cols-6 items-center justify-between">
                      <div>
                        <img className="w-7 rounded-full" alt="Channel pic" src={subscription?.snippet?.thumbnails?.default?.url} />
                      </div>
                      <div className="col-span-4"><p className="text-sm pl-2">{subscription?.snippet?.title?.length > 15 ? subscription?.snippet?.title?.substring(0, 15) + '...' : subscription?.snippet?.title}</p></div>
                      <div className="text-red-500 flex justify-end">
                        {/* <PiBroadcastFill /> */}
                      </div>
                    </div>
                  </li>
                )
              }
              {
                !showMore ?  
                  <li className="p-2 cursor-pointer text-center hover:bg-gray-200 rounded-lg" onClick={() => setShowMore(!showMore)}>
                    <div className="grid grid-cols-6 items-center justify-between">

                    </div>
                    <div className="flex items-center justify-center">
                      Show More <FaAngleDown className="ml-2" />
                    </div>
                  </li>
                :
                  <li className="p-2 cursor-pointer text-center hover:bg-gray-200 rounded-lg" onClick={() => setShowMore(!showMore)}>
                    <div className="flex items-center justify-center">
                      Show Less <FaAngleUp className="ml-2" />
                    </div>
                  </li>
              }
            </ul>
          </>
        :
          <>
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
          </>
      }
    </div>
  ) : (
    <div className="mt-2">
      <ul className="pb-4">
        <li>
          <Link to="/"><SidebarMenuItem itemName="Home" CustomIconComponent={HiMiniHome} isMenuOpen={isMenuOpen} /></Link>
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
        {
          (!userData || !userData?.uid) &&
          <li>
            <SidebarMenuItem itemName="History" CustomIconComponent={FaClockRotateLeft} isMenuOpen={isMenuOpen} />
          </li>
        }
      </ul>
    </div>
  )
}

export default Sidebar