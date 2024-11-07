// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a23fb.firebaseapp.com",
  projectId: "mern-estate-a23fb",
  storageBucket: "mern-estate-a23fb.appspot.com",
  messagingSenderId: "959764578389",
  appId: "1:959764578389:web:1d000fe5278bd3acac94dc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);