// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoWctadbAyes3zMATwDgjepGGGUh8LUT0",
  authDomain: "todomate-bc25f.firebaseapp.com",
  projectId: "todomate-bc25f",
  storageBucket: "todomate-bc25f.firebasestorage.app",
  messagingSenderId: "58657882226",
  appId: "1:58657882226:web:bce8bf1931541f814482eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



