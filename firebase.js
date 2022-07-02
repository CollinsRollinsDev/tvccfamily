import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged , signOut, updateEmail, updatePassword} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCa_j0vrTX4Iut2u3ANeFLTVEgLkCM_gP8",
    authDomain: "truevine-2405d.firebaseapp.com",
    projectId: "truevine-2405d",
    storageBucket: "truevine-2405d.appspot.com",
    messagingSenderId: "313359619951",
    appId: "1:313359619951:web:a736997702dec8aea9fa9a",
    measurementId: "G-FJRBHF9S1Q"
  };

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const storage = getStorage(app);
const auth = getAuth()