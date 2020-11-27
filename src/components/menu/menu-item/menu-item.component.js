import React, {
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import StyledMenuItemWrapper from "./menu-item.style";
import OptionHelper from "../../../utils/helpers/options-helper";
import Link from "../../link";
import Events from "../../../utils/helpers/events";
import { MenuContext } from "../menu.component";
import Submenu, {
  SubmenuContext,
} from "../__internal__/submenu/submenu.component";

const MenuItem = ({
  submenu,
  children,
  href,
  to,
  menuType,
  onClick,
  target,
  submenuDirection = "right",
  icon,
  selected,
  routerLink,
  onKeyDown,
  variant = "default",
}) => {
  const menuContext = useContext(MenuContext);
  const submenuContext = useContext(SubmenuContext);
  const ref = useRef(null);
  const focusFromMenu = menuContext.isFocused;
  const focusFromSubmenu = submenuContext.isFocused;

  useEffect(() => {
    if (focusFromSubmenu === undefined && focusFromMenu) {
      ref.current.focus();
    } else if (focusFromSubmenu) {
      ref.current.focus();
    }
  }, [focusFromMenu, focusFromSubmenu]);

  const handleKeyDown = useCallback(
    (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (Events.isEscKey(event)) {
        ref.current.focus();
      }

      if (!submenu && Events.isSpaceKey(event)) {
        ref.current.click();
      }

      if (!event.defaultPrevented) {
        if (submenuContext.handleKeyDown !== undefined) {
          submenuContext.handleKeyDown(event);
        } else {
          menuContext.handleKeyDown(event);
        }
      }
    },
    [menuContext, onKeyDown, ref, submenu, submenuContext]
  );

  const classes = useMemo(
    () =>
      classNames({
        "carbon-menu-item--has-link": href || to || onClick,
      }),
    [href, to, onClick]
  );

  const elementProps = {
    className: classes,
    href,
    to,
    target,
    onClick,
    icon,
    selected,
    menuType,
    tabbable: menuContext.isFirstElement,
  };

  if (!submenu) {
    elementProps.routerLink = routerLink;
  }

  if (submenu) {
    return (
      <Submenu
        menuType={menuType}
        ref={ref}
        tabIndex={-1}
        variant={variant}
        title={submenu}
        icon={icon}
        submenuDirection={submenuDirection}
        tabbable={menuContext.isFirstElement}
        onKeyDown={handleKeyDown}
        className={classes}
      >
        {children}
      </Submenu>
    );
  }

  return (
    <StyledMenuItemWrapper
      ref={ref}
      onKeyDown={handleKeyDown}
      as={Link}
      data-component="menu-item"
      {...elementProps}
      variant={variant}
      role="menuitem"
    >
      {children}
    </StyledMenuItemWrapper>
  );
};

MenuItem.propTypes = {
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
  /** Is the menu item the currently selected item. */
  selected: PropTypes.bool,
  /** A title for the menu item that has a submenu. */
  submenu: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The href to use for the menu item. */
  href: PropTypes.string,
  /** The to link to use for the menu item. */
  to: PropTypes.string,
  /** The link element to use when providing the to value */
  routerLink: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** onKeyDown handler */
  onKeyDown: PropTypes.func,
  /** The target to use for the menu item. */
  target: PropTypes.string,
  /** Flag to display the dropdown arrow when an item has a submenu */
  showDropdownArrow: PropTypes.bool,
  /**
   * menu color scheme provided by <Menu />
   * @private
   * @ignore
   *
   */
  menuType: PropTypes.oneOf(["light", "dark"]),
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
};

export default MenuItem;
