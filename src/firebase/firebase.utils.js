import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
  apiKey: "AIzaSyAXeTJ6xiVHgT2Y1Rx2x2Ca5Bia1UJrIMQ",
  authDomain: "crwn-clothing-a7d8b.firebaseapp.com",
  databaseURL: "https://crwn-clothing-a7d8b-default-rtdb.firebaseio.com",
  projectId: "crwn-clothing-a7d8b",
  storageBucket: "crwn-clothing-a7d8b.appspot.com",
  messagingSenderId: "491727567792",
  appId: "1:491727567792:web:2bec14eea62c00207e7475",
  measurementId: "G-Q0J76KN0X8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {  
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const getCurrentUser= () =>{
    return new Promise((resolve,reject)=>{
      const unsubscribe = auth.onAuthStateChanged(user=>{
        unsubscribe()
        resolve(user)
      },reject )
    });
}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {

  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {

    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);

  });

  return await batch.commit();

};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {}); 
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;





