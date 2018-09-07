import firebase from "firebase";

const config = {
    apiKey: "AIzaSyAJgdFAQ_rfIFuwZqPt11wwsqSYVzqy1Do",
    authDomain: "project-4033210182068776235.firebaseapp.com",
    databaseURL: "https://project-4033210182068776235.firebaseio.com",
    projectId: "project-4033210182068776235",
    storageBucket: "project-4033210182068776235.appspot.com",
    messagingSenderId: "764948090850"
};

firebase.initializeApp(config);

const firebaseDatabase = firebase.database();
const databaseRef = firebaseDatabase.ref();

export const servicesRef = databaseRef.child("services");
export const workersRef = databaseRef.child("workers");
export const auth = firebase.auth();
