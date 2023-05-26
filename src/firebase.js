// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI7GkQrKo7r0Vg7ebZufuK5lbsCzaEs3o",
  authDomain: "weather-ee18a.firebaseapp.com",
  databaseURL: "https://weather-ee18a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weather-ee18a",
  storageBucket: "weather-ee18a.appspot.com",
  messagingSenderId: "789385101234",
  appId: "1:789385101234:web:bda4447acf8ae47828aeab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);