import propTypes from 'prop-types';

import Button from '../../../button/Button.component';
import FormInput from '../../../form-input/FormInput.component';

import signInWithEmailAndPasswordFromFirestore from '../../../../utils/firebase/firebase.utils';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = ({ logGoogleUser, formFields, setFormFields }) => {
  const { email, password } = formFields;

  // handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    // setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handleNormalSignIn();
    try {
      const response = await signInWithEmailAndPasswordFromFirestore(
        email,
        password,
      );
      // console.log('response', response);
      const { user } = response;
      return user;
    } catch (error) {
      console.log('error', error);
    }
  };

  // const handleNormalSignIn = () => {
  //   console.log('normal sign in');
  // };

  return (
    <form>
      <div className="form-input-container">
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
      </div>
      <div className="sign-in-button-container">
        <Button
          type="submit"
          buttonType={'default'}
          // onClick={handleNormalSignIn}
          onSubmit={handleSubmit}
        >
          Sign In
        </Button>
        <Button buttonType={'google'} onClick={logGoogleUser}>
          Sign In With Google
        </Button>
      </div>
    </form>
  );
};

SignInForm.propTypes = {
  logGoogleUser: propTypes.func.isRequired,
  signInWithGoogleRedirect: propTypes.func.isRequired,
  formFields: propTypes.object.isRequired,
  setFormFields: propTypes.func.isRequired,
};

export default SignInForm;
