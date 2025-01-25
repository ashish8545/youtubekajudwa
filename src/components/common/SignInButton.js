import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

const SignInButton = ({ customClassName }) => {
  return (
    <div className={`flex w-24 justify-center text-blue-400 border border-gray-300 rounded-full px-2 py-2 font-semibold text-sm cursor-pointer hover:bg-gray-200 ` + customClassName}>
        <FaRegCircleUser className="text-xl pr-1" />
        Sign In
    </div>
  )
}

export default SignInButton