// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Ejes4fAjqjI1SkHPg61eC74Rlyqm4Pc",
  authDomain: "personal-expense-tracker-ad4a0.firebaseapp.com",
  projectId: "personal-expense-tracker-ad4a0",
  storageBucket: "personal-expense-tracker-ad4a0.appspot.com",
  messagingSenderId: "774009809534",
  appId: "1:774009809534:web:9a36ae8c60c22a438ac62f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { db, auth, provider, firestore, doc, setDoc };