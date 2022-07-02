import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCa_j0vrTX4Iut2u3ANeFLTVEgLkCM_gP8",
    authDomain: "truevine-2405d.firebaseapp.com",
    projectId: "truevine-2405d",
    storageBucket: "truevine-2405d.appspot.com",
    messagingSenderId: "313359619951",
    appId: "1:313359619951:web:a736997702dec8aea9fa9a",
    measurementId: "G-FJRBHF9S1Q"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase}
