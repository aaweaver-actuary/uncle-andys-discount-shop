import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import SignUpForm from './SignUpForm/SignUpForm.component';

import {
  auth,
  signInWithGoogle,
  signInWithGoogleRedirect,
  // signInWithEmail,
  createUserDocumentFromAuth,
} from '../../../utils/firebase/firebase.utils';

const SignIn = () => {
  useEffect(() => {
    const func = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log(userDocRef);
      }
    };
    func();
  }, []);

  // click handler for sign in with Google button
  const logGoogleUser = async () => {
    const { user } = await signInWithGoogle();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  // return sign in page
  return (
    <div>
      <h1>Sign In</h1>
      <SignUpForm />
      <button onClick={logGoogleUser}>Sign In With Google</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign In With Google Redirect
      </button>
    </div>
  );
};

export default SignIn;
