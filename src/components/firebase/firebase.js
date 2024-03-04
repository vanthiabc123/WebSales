import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB0eSh3fNuATn6_Vmf1v7diddpqrHn5mH8",
  authDomain: "bloger-new.firebaseapp.com",
  projectId: "bloger-new",
  storageBucket: "bloger-new.appspot.com",
  messagingSenderId: "1068476632922",
  appId: "1:1068476632922:web:40d25a856fa8e6b8172d63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
export const storage = getStorage(app)
