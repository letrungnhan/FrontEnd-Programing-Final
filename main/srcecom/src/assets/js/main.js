/ Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3p5LPOetuHEW2jyUkr9BH78DdHGDhbRo",
  authDomain: "front-end-final-b0038.firebaseapp.com",
  databaseURL: "https://front-end-final-b0038-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "front-end-final-b0038",
  storageBucket: "front-end-final-b0038.appspot.com",
  messagingSenderId: "1071606971088",
  appId: "1:1071606971088:web:ed927437ab20a21f14bcd5",
  measurementId: "G-FWBDDM89SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
