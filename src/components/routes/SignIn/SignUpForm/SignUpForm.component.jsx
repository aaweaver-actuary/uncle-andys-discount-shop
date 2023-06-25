import { useState } from 'react';
import {
  auth,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from '../../../../utils/firebase/firebase.utils';

import '../SignIn.styles.css';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  // state of the form fields
  const [formFields, setFormFields] = useState(defaultFormFields);

  // destructuring form fields
  const { displayName, email, password, confirmPassword } = formFields;

  // handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const checkPasswordMatch = () => {
    return password === confirmPassword;
  };

  const checkIfHasAuthUser = async () => {
    console.log('SUF-1 checkIfHasAuthUser:\nauth:\n', auth);
    try {
      const docResponse = await createUserDocumentFromAuth(auth);
      console.log('SUF-2 checkIfHasAuthUser:\n docResponse:\n', docResponse);
      return docResponse;
    } catch (error) {
      console.log(
        'SUF-3 Error creating user (checkIfHasAuthUser)',
        error.message,
      );
      try {
        const { displayName } = await createAuthUserWithEmailAndPassword(
          email,
          password,
        );
        console.log('SUF-4 checkIfHasAuthUser:\n displayName:\n', displayName);
        return displayName;
      } catch (error1) {
        console.log(
          'SUF-5 Error creating user (checkIfHasAuthUser)',
          error1.message,
        );
        return;
      }
    }
  };

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // try to get the user document
    const userDocRef = await checkIfHasAuthUser();

    // confirm password matches
    if (!checkPasswordMatch()) {
      console.log(
        'SUF-6 Passwords do not match:\npassword1:\n',
        password,
        '\npassword2:\n',
        confirmPassword,
      );
      // alert('Passwords do not match');
      return;
    }
    //see if have authenticated user w/ email and password
    else if (!userDocRef) {
      console.log('SUF-8 No user document found');
      console.log('No user document found\nuserDocRef:\n', userDocRef);
      return;
    }
    // otherwise create new user
    else {
      const { displayName, email } = userDocRef;
      const createdAt = new Date();
      try {
        // try to create new user document asynchonously
        await createUserDocumentFromAuth(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        // catch any errors and log them to the console
        console.log(
          'SUF-10 displayName: ',
          displayName,
          '\nemail:\n',
          email,
          '\ncreatedAt:\n',
          createdAt,
          '\nError creating user (handleSubmit):\n',
          error.message,
        );
      }
    }
  };

  return (
    <div className="sign-up-form-container">
      <h3 className="sign-up-form-heading">Sign up:</h3>
      <form onSubmit={(e) => handleSubmit(e)} className="sign-up-form-element">
        <input
          required
          type="text"
          placeholder="Display Name"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          className="sign-up-form-input"
        />
        <input
          required
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={email}
          className="sign-up-form-input"
        />
        <input
          required
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={password}
          className="sign-up-form-input"
        />
        <input
          required
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          className="sign-up-form-input"
        />
        <button type="submit" className="sign-up-form-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
