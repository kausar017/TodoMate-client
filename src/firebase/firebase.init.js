// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-eskfRMuHFTfMLIVquzcPpkFalmH_26E",
  authDomain: "task-ph.firebaseapp.com",
  projectId: "task-ph",
  storageBucket: "task-ph.firebasestorage.app",
  messagingSenderId: "167684220446",
  appId: "1:167684220446:web:78bd6dfc4ba089a642f00f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);