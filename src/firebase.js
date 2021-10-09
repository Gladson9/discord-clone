// Import the functions you need from the SDKs you need

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC-NwVtHjQoNbEV9Ma_yM8wkZ3-Q24bBrk",
  authDomain: "discord-clone-71783.firebaseapp.com",
  projectId: "discord-clone-71783",
  storageBucket: "discord-clone-71783.appspot.com",
  messagingSenderId: "482751255757",
  appId: "1:482751255757:web:7f664ff381fc700a3dc584",
  measurementId: "G-KYQPEKQHG5",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
