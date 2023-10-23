// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuXCBjsKWtt7yZHIjoExRSxj2eaXrtyfg",
  authDomain: "todo-app-61a7f.firebaseapp.com",
  projectId: "todo-app-61a7f",
  storageBucket: "todo-app-61a7f.appspot.com",
  messagingSenderId: "848193326478",
  appId: "1:848193326478:web:51de1dc68e6cd1f49568df",
  measurementId: "G-3NPHNZHWC7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

googleProvider.setCustomParameters({ prompt: "select_account" });
