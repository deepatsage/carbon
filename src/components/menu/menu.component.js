import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyledMenuWrapper, StyledMenuItemsWrapper, StyledMenuItem } from './menu.style';

const Menu = ({ menuType = 'light', children }) => {
  const [focusedIndex, setFocusedIndex] = useState();
  const childrenLength = children.length - 1;
  const lastChildren = childrenLength;
  const firstChildren = 0;
  const arrowRight = 39;
  const arrowLeft = 37;

  const onArrowKey = (e) => {
    if (e.keyCode === arrowRight) {
      if (focusedIndex < childrenLength) {
        setFocusedIndex(focusedIndex + 1);
      } else {
        setFocusedIndex(firstChildren);
      }
    } else if (e.keyCode === arrowLeft) {
      if (focusedIndex > 0) {
        setFocusedIndex(focusedIndex - 1);
      } else {
        setFocusedIndex(lastChildren);
      }
    }
  };

  return (
    <StyledMenuWrapper
      data-component='menu'
      menuType={ menuType }
    >
      <StyledMenuItemsWrapper
        role='menubar'
      >
        {
          React.Children.map(
            children,
            (child, index) => {
              const tabIndex = index === 0 ? 0 : -1;
              const isFocused = focusedIndex === index;
              return (
                <StyledMenuItem>{
                  React.cloneElement(
                    child,
                    {
                      menuType, tabIndex, onArrowKey, isFocused
                    },
                  )
                }
                </StyledMenuItem>
              );
            }
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
