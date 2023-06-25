import propTypes from 'prop-types';

const SignInForm = ({ logGoogleUser, signInWithGoogleRedirect }) => {
  return (
    <div>
      <div className="google-sign-in-container">
        <button className="google-sign-in-button" onClick={logGoogleUser}>
          Sign In With Google
        </button>
        <button
          className="google-sign-in-button"
          onClick={signInWithGoogleRedirect}
        >
          Sign In With Google Redirect
        </button>
      </div>
    </div>
  );
};

SignInForm.propTypes = {
  logGoogleUser: propTypes.func.isRequired,
  signInWithGoogleRedirect: propTypes.func.isRequired,
};

export default SignInForm;
