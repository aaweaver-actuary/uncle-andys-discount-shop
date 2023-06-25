import propTypes from 'prop-types';
import './Button.styles.css';

/*
3 types of buttons:
1. Default (black -> white)
2. Inverted (white -> black)
3. Google Sign In (red -> white)
*/

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
  default: '',
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: propTypes.string.isRequired,
  buttonType: propTypes.string.isRequired,
};

export default Button;
