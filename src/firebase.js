// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth ,createUserWithEmailAndPassword} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5z32TAoLZu3uH-semIozZJl7YLv673yU",
    authDomain: "easywash-e16c3.firebaseapp.com",
    projectId: "easywash-e16c3",
    storageBucket: "easywash-e16c3.appspot.com",
    messagingSenderId: "739676907812",
    appId: "1:739676907812:web:a187b1618bce2db7816bb1",
    measurementId: "G-4C02MLKX9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, storage, db };