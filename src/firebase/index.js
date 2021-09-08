import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBy-OwnTyIZKimmjvpd_v79ljmsSarF0_I",
  authDomain: "keep-clone-ba4d6.firebaseapp.com",
  projectId: "keep-clone-ba4d6",
  storageBucket: "keep-clone-ba4d6.appspot.com",
  messagingSenderId: "1055825562864",
  appId: "1:1055825562864:web:6e2d8c064cad6f7bbbc635",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database;
// const googleAuthProvider = firebase.auth;
const googleAuthProvider = firebase.auth.GoogleAuthProvider;

export { firebase, googleAuthProvider, database };
