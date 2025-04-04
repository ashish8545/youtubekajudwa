import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { token } from '../../utils/slices/tokenSlice';

const SignInButton = ({ customClassName, buttonText = "Sign In" }) => {

  const dispatch = useDispatch();

  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const googleToken = credential.accessToken; // This token can be used for Google APIs
        
        localStorage.setItem("token", googleToken);
        dispatch(token(googleToken))
        console.log("Logged in successfully! ")
      }).catch((error) => {
        const errorCode = error?.code;
        const errorMessage = error?.message;
        console.error("Error Code : " + errorCode);
        console.error("Error Message : " + errorMessage);
      });
  }

  return (
    <div className={`flex w-24 items-center justify-center text-blue-400 border border-gray-300 rounded-full px-2 py-2 font-semibold text-sm cursor-pointer hover:bg-gray-200 ` + customClassName} onClick={handleSignIn}>
        <FaRegCircleUser className="text-lg mr-2" />
        { buttonText }
    </div>
  )
}

export default SignInButton