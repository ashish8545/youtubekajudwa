import React, { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";

const Header = () => {
  const [showInnerSearchIcon, setShowInnerSearchIcon] = useState(false);

  return (
    <div className="grid grid-flow-col shadow-md p-1">
      <div className="flex items-center col-span-1">
        <span className="ml-4 p-2 cursor-pointer rounded-full hover:bg-gray-200">
          <FiMenu className="text-2xl" />
        </span>
        <img
          className="h-14 pl-1"
          alt="logo"
          src={window.location.origin + "/images/logo.jpg"}
        />
      </div>
      <div className="col-span-10">
        <div className="w-2/4 m-auto flex items-center pt-2">
          {showInnerSearchIcon && (
            <FiSearch className="text-lg ml-3 absolute text-gray-500 transition-opacity duration-300 ease-in-out" />
          )}
          <input
            type="text"
            placeholder="Search"
            // className={`w-full rounded-l-full border px-4 py-2 border-gray-300 transition-all duration-300 ease-in-out`}
            className={`w-full rounded-l-full border border-gray-400 py-2 transition-all duration-300 ease-in-out ${
              showInnerSearchIcon ? "pl-10 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300" : "pl-5"
            }`}
            onFocus={() => setShowInnerSearchIcon(true)}
            onBlur={() => setShowInnerSearchIcon(false)}
          />
          <span className="border border-r-gray-400 border-t-gray-400 border-b-gray-400 px-4 py-2 rounded-r-full cursor-pointer hover:bg-gray-200">
            <FiSearch className="text-2xl" />
          </span>
        </div>
      </div>
      <div className="col-span-1 flex items-center pr-5">
        <span className="flex w-6/12 ml-auto text-blue-400 border border-blue-400 rounded-full px-2 py-1 font-semibold text-sm cursor-pointer hover:bg-gray-200">
          <FiUser className="text-xl pr-1" />
          Sign In
        </span>
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