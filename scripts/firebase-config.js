//Import SDKs

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqN_lb9-GIwNi3BVONDinLmF3B_kvou8k",
    authDomain: "friend-finder-21fe1.firebaseapp.com",
    databaseURL: "https://friend-finder-21fe1-default-rtdb.firebaseio.com",
    projectId: "friend-finder-21fe1",
    storageBucket: "friend-finder-21fe1.appspot.com",
    messagingSenderId: "98629272650",
    appId: "1:98629272650:web:499eb588cfc8ccb5dfd2b3",
    measurementId: "G-QC8Z58N49L"
};

// Initialize Firebase and Firestore
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
// const storage = firebase.storage();
// const provider = new GoogleAuthProvider();