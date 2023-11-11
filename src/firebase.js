// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8nBYCUxtqGX0ZDa21fK3uaC785CPvOwA",
  authDomain: "realtor-react-clone-d4be5.firebaseapp.com",
  projectId: "realtor-react-clone-d4be5",
  storageBucket: "realtor-react-clone-d4be5.appspot.com",
  messagingSenderId: "3077138272",
  appId: "1:3077138272:web:89eab8889dbfc918b0e005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
