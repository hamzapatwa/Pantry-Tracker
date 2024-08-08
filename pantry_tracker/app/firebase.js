// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXPsPccQJ3IZZPs48ZL2SS11cfp7kNrIE",
    authDomain: "pantry-tracker-31e97.firebaseapp.com",
    projectId: "pantry-tracker-31e97",
    storageBucket: "pantry-tracker-31e97.appspot.com",
    messagingSenderId: "700683060549",
    appId: "1:700683060549:web:9f04c7eb1e4be6066cea2c",
    measurementId: "G-21XTDJNFQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };