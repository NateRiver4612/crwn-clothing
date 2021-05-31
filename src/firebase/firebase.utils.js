import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAXeTJ6xiVHgT2Y1Rx2x2Ca5Bia1UJrIMQ",
    authDomain: "crwn-clothing-a7d8b.firebaseapp.com",
    projectId: "crwn-clothing-a7d8b",
    storageBucket: "crwn-clothing-a7d8b.appspot.com",
    messagingSenderId: "491727567792",
    appId: "1:491727567792:web:b922a92d05f7b22f7e7475",
    measurementId: "G-GBGD4PP9LX"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;