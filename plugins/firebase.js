import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

let firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.VUE_projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
}

const db = firebase.firestore();
const auth = firebase.auth();
const usersCollection = db.collection("users");
const functions = firebase.functions();

export { firebase, usersCollection, auth, db, functions };
