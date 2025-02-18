import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/slices/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from '../utils/firebase';
import { clearSubscriptions } from '../utils/slices/subscriptionsSlice';
import { clearToken } from '../utils/slices/tokenSlice';

const Body = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUser({uid: user?.uid, email: user?.email, displayName: user?.displayName, photoURL: user?.photoURL }))
      } else {
        dispatch(removeUser())
        dispatch(clearSubscriptions())
        dispatch(clearToken())
      }
    });
  }, [])

  return (
    <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default Body