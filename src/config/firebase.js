// config/firebase.js
import firebase from "firebase/app";
import "firebase/firestore"; // 如果使用 Firestore
import "firebase/auth"; // 如果使用 Firebase 認證

const firebaseConfig = {
    apiKey: "AIzaSyA6vSgBBSf3aplMUoqMFthj2y2Bjtz0udU",
    authDomain: "serenemind-88e4f.firebaseapp.com",
    projectId: "serenemind-88e4f",
    storageBucket: "serenemind-88e4f.appspot.com",
    messagingSenderId: "53557287631",
    appId: "1:53557287631:android:0bb70984c6d8cc405ef5ba", 
  };
  

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // 如果已經初始化過了，則不再初始化
}

export { firebase };
