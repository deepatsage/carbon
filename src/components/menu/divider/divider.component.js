import React from 'react';
import PropTypes from 'prop-types';
import StyledDivider from './divider.style';

const Divider = ({ menuType }) => <StyledDivider data-component='divider' menuType={ menuType } />;

Divider.propTypes = {
  /** menu theme provided by <SubmenuBlock /> */
  menuType: PropTypes.oneOf(['light', 'dark'])
};

export default Divider;
