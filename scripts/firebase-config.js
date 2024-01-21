//Import SDKs

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCY_iu-VCVWVewfadVQ2_qtMz_lcSLPHWQ",
    authDomain: "friendfinder2-5b089.firebaseapp.com",
    projectId: "friendfinder2-5b089",
    storageBucket: "friendfinder2-5b089.appspot.com",
    messagingSenderId: "420414706406",
    appId: "1:420414706406:web:a08b0bef66373b68f12127"
};

// Initialize Firebase and Firestore
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
// const storage = firebase.storage();
// const provider = new GoogleAuthProvider();