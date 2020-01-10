import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/functions'

let firebaseConfig = {
    apiKey: "AIzaSyBaoRXOXXgmnN5YAslvuGWM39INzvVzlQ0",
    authDomain: "findhome-e1104.firebaseapp.com",
    databaseURL: "https://findhome-e1104.firebaseio.com",
    projectId: "findhome-e1104",
    storageBucket: "findhome-e1104.appspot.com",
    messagingSenderId: "247639856478",
    appId: "1:247639856478:web:2870acf9cdcca36338abcf",
    measurementId: "G-6VRSZREVPC"
};

let app = null
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig)
    // firebase.analytics();
}

const db = firebase.firestore();
const auth = firebase.auth();
const usersCollection = db.collection('users')
const functions = firebase.functions()

export {firebase, usersCollection, auth, db, functions };


  