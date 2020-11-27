/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, {
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";

import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import OptionHelper from "../../../../utils/helpers/options-helper";
import {
  StyledSubmenu,
  StyledSubmenuItem,
} from "../../submenu-block/submenu.style";
import Link from "../../../link";
import Events from "../../../../utils/helpers/events";
import { MenuContext } from "../../menu.component";
import MenuItem from "../../menu-item";
import { characterNavigation } from "../keyboard-navigation";

const SubmenuContext = React.createContext({});

const Submenu = React.forwardRef(
  (
    {
      children,
      className,
      title,
      menuType,
      onClick,
      icon,
      submenuDirection = "right",
      onKeyDown,
      variant = "default",
      tabbable,
    },
    ref
  ) => {
    const menuContext = useContext(MenuContext);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [submenuFocusIndex, setSubmenuFocusIndex] = useState(undefined);
    const submenuRef = useRef();

    const numberOfChildren = useMemo(() => React.Children.count(children), [
      children,
    ]);

    const closeSubmenu = useCallback(() => {
      setSubmenuOpen(false);
      setSubmenuFocusIndex(undefined);
    }, []);

    const handleClick = useCallback(() => {
      if (onClick) {
        onClick();
      }

      if (!submenuOpen) {
        setSubmenuOpen(true);
      }
    }, [onClick, submenuOpen]);

    const handleKeyDown = useCallback(
      (event, index = submenuFocusIndex) => {
        if (!submenuOpen) {
          if (
            Events.isEnterKey(event) ||
            Events.isSpaceKey(event) ||
            Events.isDownKey(event)
          ) {
            event.preventDefault();
            setSubmenuOpen(true);
            setSubmenuFocusIndex(0);
          }

          if (Events.isUpKey(event)) {
            event.preventDefault();
            setSubmenuOpen(true);
            setSubmenuFocusIndex(numberOfChildren - 1);
          }

          if (!event.defaultPrevented) {
            menuContext.handleKeyDown(event);
          }
        }

        if (submenuOpen) {
          let nextIndex = index;

          if (Events.isDownKey(event)) {
            if (index < numberOfChildren - 1) {
              nextIndex = index + 1;
            } else {
              nextIndex = 0;
            }
          }

          if (Events.isUpKey(event)) {
            if (!index) {
              nextIndex = numberOfChildren - 1;
            } else {
              nextIndex = index - 1;
            }
          }

          if (Events.isLeftKey(event) || Events.isRightKey(event)) {
            menuContext.handleKeyDown(event, true);
            closeSubmenu();
            return;
          }

          if (Events.isEscKey(event)) {
            onKeyDown(event);
            closeSubmenu();
            return;
          }

          if (Events.isHomeKey(event)) {
            nextIndex = 0;
          }

          if (Events.isEndKey(event)) {
            event.preventDefault();
            nextIndex = numberOfChildren - 1;
          }

          if (Events.isAlphabetKey(event)) {
            nextIndex = characterNavigation(
              event,
              React.Children.toArray(children),
              index
            );
          }

          // Check that next index contains a MenuItem
          // If not, call handleKeyDown again
          if (React.Children.toArray(children)[nextIndex].type === MenuItem) {
            setSubmenuFocusIndex(nextIndex);
          } else {
            handleKeyDown(event, nextIndex);
          }
        }
      },
      [
        children,
        closeSubmenu,
        menuContext,
        numberOfChildren,
        onKeyDown,
        submenuFocusIndex,
        setSubmenuFocusIndex,
        submenuOpen,
      ]
    );

    const onClickOutside = useCallback(
      (event) => {
        if (!Events.composedPath(event).includes(submenuRef.current)) {
          menuContext.reset();
          document.removeEventListener("click", onClickOutside);
          closeSubmenu();
        }
      },
      [closeSubmenu, menuContext]
    );

    const handleMouseOut = useCallback(
      (event) => {
        // If the mouse moves into the submenu, keep it open
        if (!(event.relatedTarget === submenuRef.current)) {
          closeSubmenu();
        }
      },
      [closeSubmenu]
    );

    useEffect(() => {
      if (menuContext.openSubmenu) {
        setSubmenuOpen(true);
      }

      if (submenuOpen) {
        document.addEventListener("click", onClickOutside);
      }

      return function cleanup() {
        document.removeEventListener("click", onClickOutside);
      };
    }, [menuContext, onClickOutside, submenuOpen]);

    return (
      <>
        <div
          onMouseOver={() => setSubmenuOpen(true)}
          onMouseOut={handleMouseOut}
        >
          <StyledMenuItemWrapper
            data-component="menu-item"
            role="menuitem"
            className={className}
            menuType={menuType}
            ref={ref}
            icon={icon}
            tabIndex={-1}
            variant={variant}
            isOpen={submenuOpen}
            as={Link}
            hasSubmenu
            tabbable={tabbable}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
          >
            {title}
          </StyledMenuItemWrapper>
        </div>

        {submenuOpen && (
          <StyledSubmenu
            ref={submenuRef}
            submenuDirection={submenuDirection}
            variant={variant}
            onMouseLeave={() => closeSubmenu()}
          >
            {React.Children.map(children, (child, index) => (
              <SubmenuContext.Provider
                value={{
                  isFocused: submenuFocusIndex === index,
                  handleKeyDown: (ev) => handleKeyDown(ev),
                }}
              >
                <StyledSubmenuItem key={child.props.key || index}>
                  {React.cloneElement(child, {
                    menuType,
                  })}
                </StyledSubmenuItem>
              </SubmenuContext.Provider>
            ))}
          </StyledSubmenu>
        )}
      </>
    );
  }
);

Submenu.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
  /** Custom className */
  className: PropTypes.string,
  /** onClick handler */
  onClick: PropTypes.func,
  /** Adds an icon to the menu item. */
  icon: PropTypes.oneOf(OptionHelper.icons),
  /** Defines which direction the submenu will hang eg. left/right */
  submenuDirection: PropTypes.string,
  /** A title for the menu item that has a submenu. */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** onKeyDown handler */
  onKeyDown: PropTypes.func,
  /**
   * menu color scheme provided by <Menu />
   * @private
   * @ignore
   *
   */
  menuType: PropTypes.oneOf(["light", "dark"]),
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
  /**
   * @private
   * @ignore
   *
   */
  tabbable: PropTypes.bool,
};

export { SubmenuContext };
export default Submenu;
