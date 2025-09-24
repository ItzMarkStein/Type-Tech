
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAB7sBhKUkUef-Eya7A8iDEXL1IJetknU0",
  authDomain: "typetech-8b6f2.firebaseapp.com",
  projectId: "typetech-8b6f2",
  storageBucket: "typetech-8b6f2.firebasestorage.app",
  messagingSenderId: "505183939122",
  appId: "1:505183939122:web:eac4b185cff3ed377b6a2b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)