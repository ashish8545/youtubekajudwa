import React, { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";

const Header = () => {
  const [showInnerSearchIcon, setShowInnerSearchIcon] = useState(false);

  return (
    <div className="shadow-md">
      <nav>
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
      </nav>
    </div>
  );
};

export default Header;