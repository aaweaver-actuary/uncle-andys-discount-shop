import propTypes from 'prop-types';

const PasswordInput = ({ password, handleChange }) => {
  return (
    <input
      required
      type="password"
      placeholder="Password"
      onChange={handleChange}
      name="password"
      value={password}
      className="sign-up-form-input"
    />
  );
};

PasswordInput.propTypes = {
  password: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};

export default PasswordInput;
