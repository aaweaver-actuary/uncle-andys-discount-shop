import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDF1-3Z6MQafvn4ZvfkE5bZkvL09HuP3Js',
  authDomain: 'uncle-andys-discount-shop.firebaseapp.com',
  projectId: 'uncle-andys-discount-shop',
  storageBucket: 'uncle-andys-discount-shop.appspot.com',
  messagingSenderId: '235990360846',
  appId: '1:235990360846:web:c8c35675710ef97bd22d5f',
  // measurementId: "G-6WKYK02612"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
// const firebaseAnalytics = getAnalytics(firebaseApp);

// AUTHENTICATION
export const auth = getAuth(firebaseApp);

// 1. Google Authentication
const googleProvider = new GoogleAuthProvider();
// Always prompt for Google account selection.
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// 2. Email and Password Authentication
export const signInWithEmail = async (email, password) => {
  if (!email || !password) return;
  signInWithEmailAndPassword(auth, email, password);
};

// 3. Google Authentication Redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// FIRESTORE
export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth) => {
  // 1. see if existing document exists
  const userDocRef = doc(db, 'users');
  console.log('FBU-1', userDocRef);

  // 2. get document snapshot
  //   --> a document snapshot is an object that contains the data
  //       from a document in the database
  //   --> it is used
  const userDocSnapshot = await getDoc(userDocRef);
  console.log('FBU-2', userDocSnapshot);

  //   --> check if document exists with .exists() method
  console.log('FBU-3', userDocSnapshot.exists());

  // if user data exists, return it
  // otherwise, create new user document (with name, email, and date createdAt)
  if (userDocSnapshot.exists()) {
    return userDocSnapshot;
  } else {
    // create new user document
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // try to create new user document asynchonously
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      // catch any errors and log them to the console
      console.log('FBU-4 Error creating user', error.message);
    }
  }

  // return user document
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    const userAuth = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log('FBU-5 createAuthUserWithEmailAndPassword \n auth: ', auth);
    console.log('FBU-6 createAuthUserWithEmailAndPassword \n email: ', email);
    console.log(
      'FBU-7 createAuthUserWithEmailAndPassword \n password: ',
      password,
    );
    console.log(
      'FBU-8 createAuthUserWithEmailAndPassword \n userAuth: ',
      userAuth,
    );
    // return userAuth;
    const userDocRef = await createUserDocumentFromAuth(userAuth);
    console.log(
      'FBU-9 createAuthUserWithEmailAndPassword \n userDocRef: ',
      userDocRef,
    );
    return userDocRef;
  } catch (error) {
    console.log('FBU-10 Error creating user in step 1', error.message);
  }
};
