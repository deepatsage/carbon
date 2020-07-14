import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { StyledMenuWrapper, StyledMenuItemsWrapper, StyledMenuItem } from './menu.style';
import Events from '../../utils/helpers/events';

const Menu = ({ menuType = 'light', children }) => {
  const menuItemsRefs = useRef(React.Children.map(children, child => child.ref || React.createRef()));
  let actualIndex;
  const setFocusToElement = (event, index) => {
    if (event) {
      event.preventDefault();
    }

    let newIndex = index;
    actualIndex = index;
    if (index === menuItemsRefs.current.length) {
      newIndex = 0;
    } else if (index === -1) {
      newIndex = menuItemsRefs.current.length - 1;
    }

    menuItemsRefs.current[newIndex].current.focus();
  };

  const handleKeyDown = (event, index, isOpen) => {
    if (Events.isRightKey(event)) {
      setFocusToElement(event, index + 1);
    }

    if (Events.isLeftKey(event)) {
      setFocusToElement(event, index - 1);
    }

    if (!isOpen) {
      if (Events.isHomeKey(event)) {
        menuItemsRefs.current[0].current.focus();
      } else if (Events.isEndKey(event)) {
        menuItemsRefs.current[menuItemsRefs.current.length - 1].current.focus();
      } else if (Events.isAlphabetKey(event)) {
        // A-Za-z: focus the next item on the list that starts with the pressed key
        // selection should wrap to the start of the list
        event.stopPropagation();
        let firstMatch;
        let nextMatch;
        const hasSubmenu = (element) => {
          if (element.submenu) {
            return element.submenu;
          }

          return element.children;
        };
        React.Children.forEach(children, ({ props }, i) => {
          if (props.children && hasSubmenu(props).toString().toLowerCase().startsWith(event.key.toLowerCase())) {
            if (firstMatch === undefined) {
              firstMatch = i;
            }
            if (i > actualIndex && nextMatch === undefined) {
              nextMatch = i;
            }
          }
        });

        if (nextMatch !== undefined) {
          setFocusToElement(undefined, nextMatch);
        } else if (firstMatch !== undefined) {
          setFocusToElement(undefined, firstMatch);
        }
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
              const isFirstElement = index === 0;
              return (
                <StyledMenuItem>{
                  React.cloneElement(
                    child,
                    {
                      menuType,
                      ref: menuItemsRefs.current[index],
                      isFirstElement,
                      handleKeyDown: (ev, isOpen) => handleKeyDown(ev, index, isOpen)
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
  /** Defines the color scheme of the component */
  menuType: PropTypes.oneOf(['light', 'dark']),
  /** Children elements */
  children: PropTypes.node
};

export default Menu;
