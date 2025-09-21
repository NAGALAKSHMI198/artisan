import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCO7vENdlJ9R5PbGIuW9mYCPf5no7o9uW8",
  authDomain: "artisian-ecommerce.firebaseapp.com",
  projectId: "artisian-ecommerce",
  storageBucket: "artisian-ecommerce.firebasestorage.app",
  messagingSenderId: "516667857591",
  appId: "1:516667857591:web:be4d2fd4836655914acb32",
  measurementId: "G-2WZN67Q9TE"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);