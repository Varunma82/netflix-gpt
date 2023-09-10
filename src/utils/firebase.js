// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1yXsHtIKE99ttbUf1F0NeWudfFvdMCRI",
  authDomain: "netflixgpt-41b51.firebaseapp.com",
  projectId: "netflixgpt-41b51",
  storageBucket: "netflixgpt-41b51.appspot.com",
  messagingSenderId: "690336497786",
  appId: "1:690336497786:web:705494e623f1f0e3dbfbc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();