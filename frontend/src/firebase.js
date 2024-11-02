import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2c0b7.firebaseapp.com",
  projectId: "mern-blog-2c0b7",
  storageBucket: "mern-blog-2c0b7.firebasestorage.app",
  messagingSenderId: "515929183840",
  appId: "1:515929183840:web:e17cc8a870df93b3add505"
};

export const app = initializeApp(firebaseConfig);