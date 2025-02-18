import React from 'react'
import { auth } from '../../utils/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';

const SignOutButton = ({ customClassName }) => {

    const userData = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('Logged out successfully!')
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    }

    return (
        <div className={`flex w-[108px] items-center justify-center text-rose-600 border border-gray-300 rounded-full py-1 font-semibold text-sm cursor-pointer hover:bg-gray-200 ` + customClassName} onClick={handleSignOut}>
            <img alt="Profile pic" src={userData?.photoURL} className="w-8 h-8 rounded-full mr-2" />
            Sign Out
        </div>
    )
}

export default SignOutButton