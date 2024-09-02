import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyANC6Md4Ke2nQcSqETqD94GeMjzx472kZs",
  authDomain: "adminpanel-for-ps.firebaseapp.com",
  projectId: "adminpanel-for-ps",
  storageBucket: "adminpanel-for-ps.appspot.com",
  messagingSenderId: "810929731644",
  appId: "1:810929731644:web:da0438d1abc5095534eb39",
  measurementId: "G-BC4QQEZV3Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const fireStoreDb = getFirestore(app);
