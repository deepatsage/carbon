import React from 'react';
import PropTypes from 'prop-types';
import StyledOptionRow from './option-row.style';

const OptionRow = ({
  columnsText,
  children,
  onSelect,
  value,
  isHighlighted
}) => {
  const handleClick = () => {
    // onSelect({ text, value });
  };

  return (
    <StyledOptionRow
      aria-selected={ isHighlighted }
      data-component='option'
      onClick={ handleClick }
      isHighlighted={ isHighlighted }
      role='option'
    >
      { columnsText.map(text => <td>{text}</td>)}
    </StyledOptionRow>
  );
};

OptionRow.propTypes = {
  /** The option's visible text, displayed within Textbox of Select, and used for filtering */
  columnsText: PropTypes.array.isRequired,
  /** Optional: alternative rendered content, displayed within SelectList of Select (eg: an icon, an image, etc) */
  children: PropTypes.node,
  /** The option's invisible internal value */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  /**
   * @private
   * @ignore
   * Callback to return value when the element is selected (prop added by the SelectList component) */
  onSelect: PropTypes.func,
  /**
   * @private
   * @ignore
   * True if the option is highlighted (prop added by the SelectList component) */
  isHighlighted: PropTypes.bool
};

export default OptionRow;
