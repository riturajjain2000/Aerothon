// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDza2lzc_5AAjamfWhdkZo1xaZ9YrL7um0",
  authDomain: "aerothon-f944e.firebaseapp.com",
  projectId: "aerothon-f944e",
  storageBucket: "aerothon-f944e.appspot.com",
  messagingSenderId: "707199335947",
  appId: "1:707199335947:web:9cb47ae8e4155fb8acd10e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const database  = getDatabase()
export { app, auth ,database };
