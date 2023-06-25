import propTypes from 'prop-types';

const EmailInput = ({ email, handleChange }) => {
  return (
    <input
      required
      type="email"
      placeholder="Email"
      onChange={handleChange}
      name="email"
      value={email}
      className="sign-up-form-input"
    />
  );
};

EmailInput.propTypes = {
  email: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};

export default EmailInput;
