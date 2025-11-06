// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (already set up)
const firebaseConfig = {
  apiKey: "AIzaSyAH4G2StOGVn_0fvS0KgVp_dDaG7DbCCME",
  authDomain: "gen-ai-exchange-4217b.firebaseapp.com",
  projectId: "gen-ai-exchange-4217b",
  storageBucket: "gen-ai-exchange-4217b.firebasestorage.app",
  messagingSenderId: "370994929443",
  appId: "1:370994929443:web:54335a831afdb2add83696",
  measurementId: "G-JS8NJY3MG2",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Authentication + Google Provider + Firestore
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
