import propTypes from 'prop-types';

import {
  // auth,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from '../../../../utils/firebase/firebase.utils';

import '../SignUpForm/SignUpForm.styles.css';

import FormInput from '../../../form-input/FormInput.component';
import Button from '../../../button/Button.component';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = ({ formFields, setFormFields }) => {
  // destructuring form fields
  const { displayName, email, password, confirmPassword } = formFields;

  // handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );
      // console.log('response', response);
      const { user } = response;

      // console.log('user', user);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <div className="sign-up-form-container">
      <h2 className="sign-up-form-heading">Don&apos;t have an account?</h2>
      <span className="sign-up-form-heading">
        Sign up with an email and password
      </span>
      <form onSubmit={(e) => handleSubmit(e)} className="sign-up-form-element">
        <FormInput
          label="Display Name"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
        />
        <FormInput
          label="Email"
          name="email"
          value={email}
          handleChange={handleChange}
          inputType="email"
        />
        <FormInput
          label="Password"
          name="password"
          value={password}
          handleChange={handleChange}
          inputType="password"
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          inputType="password"
        />
        <Button type="submit" buttonType={'default'}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

SignUpForm.propTypes = {
  formFields: propTypes.object.isRequired,
  setFormFields: propTypes.func.isRequired,
};

export default SignUpForm;
