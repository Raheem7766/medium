import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDN0vIfx1l9XACjd26JJb1nBnJ-Bigy878",
    authDomain: "medium-29913.firebaseapp.com",
    projectId: "medium-29913",
    storageBucket: "medium-29913.appspot.com",
    messagingSenderId: "710322439222",
    appId: "1:710322439222:web:fb3b7e4c870c81edfdc497",
    measurementId: "G-7VPFTZXZ82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage();
// Google Auth Provider (initialized once)
const provider = new GoogleAuthProvider();

export { auth, provider, db };