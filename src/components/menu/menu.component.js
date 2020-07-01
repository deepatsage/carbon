import React from 'react';
import PropTypes from 'prop-types';
import { StyledMenuWrapper, StyledMenuItemsWrapper, StyledMenuItem } from './menu.style';

const Menu = ({ menuType = 'light', children }) => {
  return (
    <StyledMenuWrapper
      data-component='menu'
      menuType={ menuType }
    >
      <StyledMenuItemsWrapper>
        {
          React.Children.map(
            children,
            child => (
              <StyledMenuItem>{
                React.cloneElement(
                  child,
                  { menuType }
                )
              }
              </StyledMenuItem>
            )
          )
        }
      </StyledMenuItemsWrapper>
    </StyledMenuWrapper>
  );
};

Menu.propTypes = {
  /** Defines the style of the component eg. primary/secondary */
  menuType: PropTypes.oneOf(['light', 'dark']),
  /** Children elements */
  children: PropTypes.node
};

export default Menu;
