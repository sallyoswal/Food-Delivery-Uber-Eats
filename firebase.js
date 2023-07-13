import firebase from "firebase/compat/app"
import { getFirestore } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyD5ztBO_NHQGZBjoXyND-Tq__ZHGyeUdVg",
    authDomain: "uber-eats-app-392500.firebaseapp.com",
    projectId: "uber-eats-app-392500",
    storageBucket: "uber-eats-app-392500.appspot.com",
    messagingSenderId: "316405049574",
    appId: "1:316405049574:web:02c008a4c7d06b26e8f327"
  };

export let db;
if(!firebase.apps.length) {
    const app = firebase.initializeApp(firebaseConfig);
    db = getFirestore(app);
} else {
    firebase.app();
    db = getFirestore(app);
}

export default firebase