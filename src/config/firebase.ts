import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaVYBCYizaU8rWYNfAlPxVLYzQ3eOoKBU",
  authDomain: "gamestracker-79e88.firebaseapp.com",
  projectId: "gamestracker-79e88",
  storageBucket: "gamestracker-79e88.firebasestorage.app",
  messagingSenderId: "564063236175",
  appId: "1:564063236175:web:5eda25f67f6ed5dc973a3a"
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);