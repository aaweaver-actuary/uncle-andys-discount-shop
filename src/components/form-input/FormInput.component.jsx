import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import './FormInput.styles.css';

const FormInput = ({
  label = null,
  name,
  value,
  handleChange,
  inputType = 'text',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (value.length > 0) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [value]);

  return (
    <div className="input-group">
      {label ? (
        <label
          htmlFor={name}
          className={`form-input-label${isFocused | isFilled ? ' shrink' : ''}`}
        >
          {label}
        </label>
      ) : null}
      <input
        required
        type={inputType}
        // placeholder={label}
        onChange={handleChange}
        name={name}
        value={value}
        className="sign-up-form-input"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

FormInput.propTypes = {
  label: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
  inputType: propTypes.string,
};

export default FormInput;
