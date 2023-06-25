import { useState } from 'react';
import {
  auth,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from '../../../../utils/firebase/firebase.utils';

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
    console.log(formFields);
  };

  const checkPasswordMatch = () => {
    return password === confirmPassword;
  };

  const checkIfHasAuthUser = async () => {
    try {
      const docResponse = await createUserDocumentFromAuth(auth);
      return docResponse;
    } catch (error) {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password,
        );
        return user;
      } catch (error1) {
        console.log('Error creating user', error.message, '\n', error1.message);
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
      alert('Passwords do not match');
      return;
    }
    //see if have authenticated user w/ email and password
    else if (!userDocRef) {
      alert('Error creating user');
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
        console.log('Error creating user', error.message);
      }
    }

    // if not, create new user
    console.log('submit');
  };

  return (
    <div>
      <h3>Sign up with your email and password</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          type="text"
          placeholder="Display Name"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <input
          required
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <input
          required
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <input
          required
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
