import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { StyledMenuWrapper, StyledMenuItemsWrapper, StyledMenuItem } from './menu.style';

const Menu = ({ menuType = 'light', children }) => {
  const childrenLength = children.length;
  const lastChildren = childrenLength - 1;
  const firstChildren = 0;
  const arrowRight = 39;
  const arrowLeft = 37;
  let focusedIndex;
  const menuItemsRefs = useMemo(
    () => Array.from({ length: children.length }).map(() => React.createRef()), [children.length]
  );
  console.log(menuItemsRefs);
  const onArrowKey = (e) => {
    if (e.keyCode === arrowRight) {
      if (focusedIndex < lastChildren) {
        focusedIndex += 1;
        menuItemsRefs[focusedIndex].current.focus();
      } else {
        focusedIndex = firstChildren;
        menuItemsRefs[focusedIndex].current.focus();
      }
    } else if (e.keyCode === arrowLeft) {
      if (focusedIndex > firstChildren) {
        focusedIndex -= 1;
        menuItemsRefs[focusedIndex].current.focus();
      } else {
        focusedIndex = lastChildren;
        menuItemsRefs[focusedIndex].current.focus();
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
                      menuType, tabIndex, onArrowKey, isFocused, ref: menuItemsRefs[index]
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
