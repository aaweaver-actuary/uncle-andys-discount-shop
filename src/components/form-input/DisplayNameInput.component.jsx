import propTypes from 'prop-types';

const DisplayNameInput = ({ label, displayName, handleChange }) => {
  return (
    <div className="input-group">
      <label htmlFor="displayName">{label}</label>
      <input
        required
        type="text"
        placeholder="Display Name"
        onChange={handleChange}
        name="displayName"
        value={displayName}
        className="sign-up-form-input"
      />
    </div>
  );
};

DisplayNameInput.propTypes = {
  label: propTypes.string.isRequired,
  displayName: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};

export default DisplayNameInput;
