// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcCcUEHIKEVkzt45n8_uNGkIYcY3gheG4",
  authDomain: "judwatube.firebaseapp.com",
  projectId: "judwatube",
  storageBucket: "judwatube.firebasestorage.app",
  messagingSenderId: "677762011840",
  appId: "1:677762011840:web:7abe54804f212bf57f1325",
  measurementId: "G-XLGWPJH4JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
auth.useDeviceLanguage(); // User preferred language

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }