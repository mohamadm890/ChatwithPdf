// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBIWFM2LwiJjFeBClRwLz7qq4r1-yoG0S0",
  authDomain: "note-fdb0e.firebaseapp.com",
  projectId: "note-fdb0e",
  storageBucket: "note-fdb0e.firebasestorage.app",
  messagingSenderId: "220110792877",
  appId: "1:220110792877:web:be0c5433a949f3cabc7e24",
  measurementId: "G-DQTSDKZPQ6"
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}