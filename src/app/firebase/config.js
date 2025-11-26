// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// PASTE YOUR CONFIG KEYS HERE
const firebaseConfig = {
    apiKey: "AIzaSyBc_Pbbfg5TeuPT-G6pc8EJKncX5b1tiYI",
    authDomain: "aamhi-khandeshi-food.firebaseapp.com",
    projectId: "aamhi-khandeshi-food",
    storageBucket: "aamhi-khandeshi-food.firebasestorage.app",
    messagingSenderId: "434722148160",
    appId: "1:434722148160:web:a82ec0d19a0a9e567c34a5"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
