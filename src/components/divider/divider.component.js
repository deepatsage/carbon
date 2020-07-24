import React from 'react';
import PropTypes from 'prop-types';

import StyledDivider from './divider.style';

const Divider = ({
  marginTop = 3,
  marginBottom = 3,
  marginLeft,
  marginRight
}) => {
  return (
    <StyledDivider
      marginTop={ marginTop }
      marginBottom={ marginBottom }
      marginLeft={ marginLeft }
      marginRight={ marginRight }
    />
  );
};

Divider.propTypes = {
  /** Margin top, this value will be multiplied by the theme spacing constant (8) */
  marginTop: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  /** Margin bottom, this value will be multiplied by the theme spacing constant (8) */
  marginBottom: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  /** Margin left, any valid css value */
  marginLeft: PropTypes.string,
  /** Margin right, any valid css value */
  marginRight: PropTypes.string
};

export default Divider;
