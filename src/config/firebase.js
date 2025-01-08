import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6vSgBBSf3aplMUoqMFthj2y2Bjtz0udU",
  authDomain: "serenemind-88e4f.firebaseapp.com",
  databaseURL: "https://serenemind-88e4f-default-rtdb.firebaseio.com",
  projectId: "serenemind-88e4f",
  storageBucket: "serenemind-88e4f.appspot.com",
  messagingSenderId: "53557287631",
  appId: "1:53557287631:android:0bb70984c6d8cc405ef5ba",
};

// 初始化 Firebase 應用
const app = initializeApp(firebaseConfig);

// 初始化 Firestore
const db = getFirestore(app);
const auth = getAuth(app);

export { db };
