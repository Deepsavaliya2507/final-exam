import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCwg-SihRmJm2ugswsV4mjAeKU4atQBJUY",
  authDomain: "final-exam-229d0.firebaseapp.com",
  projectId: "final-exam-229d0",
  storageBucket: "final-exam-229d0.appspot.com",
  messagingSenderId: "748090197186",
  appId: "1:748090197186:web:023227684ad536ce05e75b",
  measurementId: "G-WQ9Q43530E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const fireStoreDb = getFirestore(app);
