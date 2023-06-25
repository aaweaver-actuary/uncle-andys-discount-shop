import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  // collection,
} from 'firebase/firestore';

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

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
