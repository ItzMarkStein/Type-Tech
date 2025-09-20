
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz2px0m4v1rvKiE1h2aYxmboYOkIhaz3M",
  authDomain: "type-tech-1c23a.firebaseapp.com",
  projectId: "type-tech-1c23a",
  storageBucket: "type-tech-1c23a.firebasestorage.app",
  messagingSenderId: "73473797734",
  appId: "1:73473797734:web:cede46b1bd171c61cfc7a7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)