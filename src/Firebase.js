// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCPfWYFxN4uHIFVYLtuynxxYW0ZrEYCQM",
  authDomain: "chatapp-5798c.firebaseapp.com",
  databaseURL: "https://chatapp-5798c-default-rtdb.firebaseio.com",
  projectId: "chatapp-5798c",
  storageBucket: "chatapp-5798c.firebasestorage.app",
  messagingSenderId: "497371727433",
  appId: "1:497371727433:web:7ce87928a130588c2e6198"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;