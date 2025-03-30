import React, { useEffect, useState } from "react";
import { FiMenu, FiSearch } from "react-icons/fi";
import SignInButton from "./common/SignInButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/slices/appSlice";
import { PiMicrophoneFill } from "react-icons/pi";
import { ReactComponent as Logo } from "../logo.svg";
import { REGION_CODE, YOUTUBE_SUGGESTIONS_API } from "../utils/constants";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { cachedResult } from "../utils/slices/searchSlice";
import { FaClockRotateLeft } from "react-icons/fa6";
import SignOutButton from "./common/SignOutButton";

const Header = () => {
  const dispatch                                      = useDispatch();
  const cachedSuggestions                             = useSelector((store) => store.search);
  const userData                                      = useSelector((store) => store.user);
  const [showInnerSearchIcon, setShowInnerSearchIcon] = useState(false);
  const [searchQuery, setSearchQuery]                 = useState("");
  const [suggestions, setSuggestions]                 = useState([]);
  const [historyQueries, setHistoryQueries]           = useState([]);
  const [searchParams]                                = useSearchParams();
  const navigate                                      = useNavigate();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu())
  }

  const getSuggestions = async () => {
    const data = await fetch(YOUTUBE_SUGGESTIONS_API + searchQuery);
    const json = await data.json();

    setSuggestions(json?.[1])
    dispatch(cachedResult({
      [searchQuery]: json[1]?.sort()
    }))
  }

  const removeSuggestion = (suggestion) => {
    setHistoryQueries(historyQueries.filter(query => query !== suggestion))
  }

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? <span key={index} className="font-bold pr-1">{part}</span> : part
    );
  };

  const handleSubmit = () => {
    navigate("/results?search_query=" + searchQuery);
  }

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        if (cachedSuggestions[searchQuery]) {
          setSuggestions(cachedSuggestions[searchQuery])
        } else {
          getSuggestions()
        }
      }, 200);
  
      return () => {
        clearTimeout(timer)
      }
    } else {
      setSuggestions([])
    }
  }, [searchQuery])

  useEffect(() => {
    const searchQuery = searchParams.get("search_query")
    if (searchQuery) {
      setSearchQuery(searchQuery)
    }
  }, [])

  return (
    <div className="grid grid-flow-col sticky top-0 bg-white z-20">
      <div className="flex items-center col-span-1">
        <span className="ml-4 p-2 cursor-pointer rounded-full hover:bg-gray-200" onClick={toggleMenuHandler}>
          <FiMenu className="text-2xl" />
        </span>
        <div className="h-5 pl-4 flex cursor-pointer">
          <Link to="/"><Logo /></Link>
        </div>
        <span className="text-[10px] pt-3 pl-1 align-text-top h-full">{ REGION_CODE }</span>
      </div>
      <div className="col-span-10">
        <div className="w-3/5 m-auto flex items-center">
          <div className="flex items-center mt-2 w-full">
            {showInnerSearchIcon && (
              <FiSearch className="text-lg ml-3 absolute text-gray-500 transition-opacity duration-300 ease-in-out" />
            )}
            <input
              type="text"
              value={searchQuery}
              placeholder="Search"
              className={`w-full rounded-l-full border border-gray-400 py-2 transition-all duration-300 ease-in-out ${
                showInnerSearchIcon ? "pl-10 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300" : "pl-5"
              }`}
              onFocus={() => setShowInnerSearchIcon(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowInnerSearchIcon(false)
                },300)
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <span className="border border-r-gray-400 border-t-gray-400 border-b-gray-400 px-4 py-[10px] rounded-r-full cursor-pointer hover:bg-gray-200" onClick={handleSubmit}>
              <FiSearch className="text-xl" />
            </span>
            {
              (showInnerSearchIcon && suggestions.length) ? <ul className="p-2 border-2 absolute top-[52px] ml-4 z-50 bg-white w-[526px] rounded-lg shadow-lg">
                {suggestions.map((suggestion, i) => 
                  <li key={i} onClick={handleSubmit}>
                    <div className="flex items-center hover:bg-gray-100 cursor-pointer rounded-md">
                      <div className="flex items-center p-2 w-5/6" onClick={() => {
                      setSearchQuery(suggestion)
                      setHistoryQueries([...historyQueries, suggestion])
                    }}>
                        {historyQueries.includes(suggestion) ? <FaClockRotateLeft className="mr-4" /> : <FiSearch className="mr-4" />}
                        {getHighlightedText(suggestion, searchQuery)} 
                      </div>
                      {historyQueries.includes(suggestion) && <a role="button" className="text-blue-400" onClick={() => {removeSuggestion(suggestion)}}>Remove</a>}
                    </div>
                  </li>
                )}
              </ul> : ""
            }
          </div>
          <div className="ml-3">
            <PiMicrophoneFill className="bg-gray-100 hover:bg-gray-200 text-[45px] rounded-full p-3 mt-2 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="col-span-1 flex items-center pr-5">
        { (userData && userData?.uid) ? <SignOutButton customClassName={`ml-auto`}/> : <SignInButton customClassName={`ml-auto`}/> }
      </div>


      {/* <nav>
        <ul className="flex flex-row pl-2">
          <li className="flex items-center">
            <FiMenu className="text-xl font-extralight h-14 w-14 p-4 cursor-pointer rounded-full hover:bg-gray-200 " />
          </li>
          <li className="flex items-center">
            <img
              className="h-14 cursor-pointer"
              alt="logo"
              src={window.location.origin + "/images/logo.jpg"}
            />
          </li>
          <li className="ml-64 flex items-center">
            <div className="relative flex items-center w-[550px]">
              {showInnerSearchIcon && (
                <FiSearch className="text-lg absolute left-4 text-gray-500 transition-opacity duration-300 ease-in-out" />
              )}
              <input
                type="text"
                placeholder="Search"
                className={`w-full rounded-l-full border border-gray-300 py-2 transition-all duration-300 ease-in-out ${
                  showInnerSearchIcon ? "pl-12 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300" : "pl-5"
                }`}
                onFocus={() => setShowInnerSearchIcon(true)}
                onBlur={() => setShowInnerSearchIcon(false)}
              />
            </div>
            <span className="border border-r-gray-300 border-t-gray-300 border-b-gray-300 px-4 py-2 rounded-r-full cursor-pointer hover:bg-gray-200">
              <FiSearch className="text-2xl" />
            </span>
          </li>
          <li className="ml-auto flex items-center pr-10">
            <span className="flex text-blue-400 border border-blue-400 rounded-full p-2 text-sm cursor-pointer hover:bg-gray-200">
              <FiUser className="text-xl pr-1" />
              Sign In
            </span>
          </li>
        </ul>
      </nav> */}
    </div>
  );
};

export default Header;