// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCujC1KCv5U-_Ozno4jjuy83xF0TZG-uhM",
  authDomain: "photofolio-899ea.firebaseapp.com",
  projectId: "photofolio-899ea",
  storageBucket: "photofolio-899ea.firebasestorage.app",
  messagingSenderId: "574631868238",
  appId: "1:574631868238:web:8e233ad90169bab2a9d01f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);