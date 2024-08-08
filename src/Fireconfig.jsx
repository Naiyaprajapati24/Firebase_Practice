// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FirebaseConfig = {
  apiKey: "AIzaSyDs3DQiy2ylerO4upStMRF50DPWIf7z0o4",
  authDomain: "e-commerce-bb854.firebaseapp.com",
  projectId: "e-commerce-bb854",
  storageBucket: "e-commerce-bb854.appspot.com",
  messagingSenderId: "1987245437",
  appId: "1:1987245437:web:f137b80416c202e4d3c814",
  measurementId: "G-WXVGCQ6PG2",
};
// Initialize Firebase
export const app = initializeApp(FirebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
//const firebaseApp = getApp();
export const storage = getStorage(app);