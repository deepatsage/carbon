import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledButtonToggleInput
} from './button-toggle.style';

function ButtonToggleInput(props) {
  return (
    <StyledButtonToggleInput
      type='radio'
      name={ props.name }
      id={ props.guid }
      disabled={ props.disabled }
    />
  );
}

ButtonToggleInput.propTypes = {
  /** Name used on the hidden radio button. */
  name: PropTypes.string,
  /** Disable all user interaction. */
  disabled: PropTypes.bool,
  /** Unique ID attribute for input */
  guid: PropTypes.string
};

export default ButtonToggleInput;
