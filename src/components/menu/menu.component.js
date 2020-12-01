import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import {
  StyledMenuWrapper,
  StyledMenuItemsWrapper,
  StyledMenuItem,
} from "./menu.style";
import { menuKeyboardNavigation } from "./__internal__/keyboard-navigation";
import Events from "../../utils/helpers/events";

const MenuContext = React.createContext({});

const Menu = ({ menuType = "light", children }) => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(undefined);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(undefined);

  const reset = () => {
    setFocusedItemIndex(undefined);
    setOpenSubmenuIndex(undefined);
  };

  const handleKeyDown = useCallback(
    (event, index, submenuOpen = false) => {
      setOpenSubmenuIndex(undefined);
      const newIndex = menuKeyboardNavigation(
        event,
        React.Children.toArray(children),
        index
      );

      setFocusedItemIndex(newIndex);
      if (submenuOpen) {
        setOpenSubmenuIndex(newIndex);
      }
    },
    [children]
  );

  const onClickOutside = useCallback((event) => {
    // Reset the state of the menu when clicking elsewhere
    if (!Events.composedPath(event).includes(StyledMenuWrapper)) {
      reset();
      document.removeEventListener("click", onClickOutside);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", onClickOutside);

    return function cleanup() {
      document.removeEventListener("click", onClickOutside);
    };
  });

  return (
    <StyledMenuWrapper data-component="menu" menuType={menuType}>
      <StyledMenuItemsWrapper role="menubar">
        {React.Children.map(children, (child, index) => {
          const isFirstElement = index === 0;
          const isFocused = focusedItemIndex === index;

          return (
            <MenuContext.Provider
              value={{
                menuType,
                isFirstElement,
                handleKeyDown: (ev, submenuOpen) =>
                  handleKeyDown(ev, index, submenuOpen),
                isFocused,
                openSubmenu: isFocused && index === openSubmenuIndex,
                reset: () => reset(),
              }}
            >
              <StyledMenuItem role="presentation" menuType={menuType}>
                {child}
              </StyledMenuItem>
            </MenuContext.Provider>
          );
        })}
      </StyledMenuItemsWrapper>
    </StyledMenuWrapper>
  );
};

Menu.propTypes = {
  /** Defines the color scheme of the component */
  menuType: PropTypes.oneOf(["light", "dark"]),
  /** Children elements */
  children: PropTypes.node.isRequired,
};

export { MenuContext };
export default Menu;
