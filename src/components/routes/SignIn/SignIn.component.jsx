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
import SignInForm from './SignInForm/SignInForm.component';

const SignIn = () => {
  useEffect(() => {
    const func = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log('SI-1', userDocRef);
      }
    };
    func();
  }, []);

  // click handler for sign in with Google button
  const logGoogleUser = async () => {
    const { user } = await signInWithGoogle();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log('SI-2', userDocRef);
  };

  // return sign in page
  return (
    <div className="sign-in-container">
      <h1>Sign In</h1>
      <div className="side-by-side-forms">
        <SignUpForm />
        <SignInForm
          logGoogleUser={logGoogleUser}
          signInWithGoogleRedirect={signInWithGoogleRedirect}
        />
      </div>
    </div>
  );
};

export default SignIn;
