import React, {
  useRef, useState, useEffect, useCallback
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StyledMenuItemWrapper from './menu-item.style';
import { StyledSubmenu, StyledSubmenuItem, StyledSubmenuTitle } from '../submenu-block/submenu.style';
import OptionHelper from '../../../utils/helpers/options-helper';
import Link from '../../link';
import Events from '../../../utils/helpers/events';

const MenuItem = React.forwardRef(({
  submenu,
  children,
  href,
  to,
  menuType,
  onClick,
  target,
  submenuDirection = 'right',
  icon,
  selected,
  routerLink,
  isFirstElement,
  handleKeyDown,
  isOpen,
  setIsOpenSubmenu,
  menuItemIndex
}, ref) => {
  const [didOpenByArrowUp, setOpenByArrowUp] = useState(false);
  const [didOpenByMouseEnter, setOpenByMouseEnter] = useState(false);
  const submenuItemsRefs = submenu && useRef(React.Children.map(children, child => child.ref || React.createRef()));
  const ifRef = () => !submenu && { ref };
  const actualFocusedItemIndex = useRef();
  const submenuWrapperRef = useRef();
  const setFocusToSubmenuElement = useCallback((event, index) => {
    if (event) {
      event.preventDefault();
    }

    const findIndex = () => {
      if (submenuItemsRefs.current[index] && submenuItemsRefs.current[index].current.tagName === 'DIV') {
        if (Events.isDownKey(event)) {
          return index + 1;
        }
        return index - 1;
      }
      return index;
    };

    actualFocusedItemIndex.current = findIndex();

    const isFocusOnLastMenuItem = index === submenuItemsRefs.current.length;
    const isFocusOnFirstMenuItem = index === -1;
    if (isFocusOnLastMenuItem) {
      actualFocusedItemIndex.current = 0;
    } else if (isFocusOnFirstMenuItem) {
      actualFocusedItemIndex.current = submenuItemsRefs.current.length - 1;
    }

    submenuItemsRefs.current[actualFocusedItemIndex.current].current.focus();
  }, [submenuItemsRefs]);

  const onCloseSubmenu = useCallback(() => {
    setIsOpenSubmenu(null);
    setOpenByMouseEnter(false);
    setOpenByArrowUp(false);
  }, [setIsOpenSubmenu]);

  const detectClickOutside = useCallback((e) => {
    if (!Events.composedPath(e).includes(submenuWrapperRef.current)) {
      onCloseSubmenu();
      document.removeEventListener('click', detectClickOutside);
    }
  }, [onCloseSubmenu]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', detectClickOutside);
    }
    if (submenu && isOpen) {
      if (!didOpenByArrowUp && !didOpenByMouseEnter) {
        submenuItemsRefs.current[0].current.focus();
      } else if (didOpenByArrowUp && !didOpenByMouseEnter) {
        submenuItemsRefs.current[submenuItemsRefs.current.length - 1].current.focus();
      }
    }
  }, [didOpenByArrowUp, submenu, submenuItemsRefs, detectClickOutside, isOpen, didOpenByMouseEnter]);

  const onKeyDownSubmenu = useCallback((ev, index) => {
    ev.preventDefault();
    if (!isOpen) {
      if (Events.isEnterKey(ev) || Events.isSpaceKey(ev) || Events.isDownKey(ev)) {
        setIsOpenSubmenu(menuItemIndex);
      }
      if (Events.isUpKey(ev)) {
        setOpenByArrowUp(true);
        setIsOpenSubmenu(menuItemIndex);
      }
    }

    if (isOpen) {
      if (Events.isDownKey(ev)) {
        setFocusToSubmenuElement(ev, index + 1);
      }
      if (Events.isUpKey(ev)) {
        setFocusToSubmenuElement(ev, index - 1);
      }
      if (
        Events.isLeftKey(ev)
        || Events.isRightKey(ev)
        || Events.isTabKey(ev)
      ) {
        onCloseSubmenu();
      }
      if (Events.isHomeKey(ev)) {
        submenuItemsRefs.current[0].current.focus();
      }
      if (Events.isEndKey(ev)) {
        submenuItemsRefs.current[submenuItemsRefs.current.length - 1].current.focus();
      }
      if (Events.isEscKey(ev)) {
        onCloseSubmenu();
        ref.current.focus();
      }
      if (Events.isAlphabetKey(ev)) {
        // A-Za-z: focus the next item on the list that starts with the pressed key
        // selection should wrap to the start of the list
        ev.stopPropagation();
        let firstMatch;
        let nextMatch;

        React.Children.forEach(children, ({ props }, i) => {
          if (props.children && props.children.toString().toLowerCase().startsWith(ev.key.toLowerCase())) {
            if (firstMatch === undefined) {
              firstMatch = i;
            }
            if (i > actualFocusedItemIndex.current && nextMatch === undefined) {
              nextMatch = i;
            }
          }
        });

        if (nextMatch !== undefined) {
          setFocusToSubmenuElement(undefined, nextMatch);
        } else if (firstMatch !== undefined) {
          setFocusToSubmenuElement(undefined, firstMatch);
        }
      }
    }
  // eslint-disable-next-line max-len
  }, [children, isOpen, menuItemIndex, onCloseSubmenu, ref, setFocusToSubmenuElement, setIsOpenSubmenu, submenuItemsRefs]);

  const handleMouseOver = useCallback(() => {
    setOpenByMouseEnter(true);
    setIsOpenSubmenu(menuItemIndex);
  }, [menuItemIndex, setIsOpenSubmenu]);

  const handleMouseLeave = useCallback(() => {
    onCloseSubmenu();
  }, [onCloseSubmenu]);

  const content = () => {
    if (!submenu) return children;

    return (
      <div
        ref={ submenuWrapperRef }
        onMouseEnter={ handleMouseOver }
        onMouseLeave={ handleMouseLeave }
      >
        <StyledSubmenuTitle>
          <StyledMenuItemWrapper
            href={ href }
            to={ to }
            menuType={ menuType }
            ref={ ref }
            tabIndex={ -1 }
            onKeyDown={ onKeyDownSubmenu }
          >
            { submenu }
          </StyledMenuItemWrapper>
        </StyledSubmenuTitle>
        <StyledSubmenu submenuDirection={ submenuDirection }>
          {
            React.Children.map(
              children,
              (child, index) => (
                <StyledSubmenuItem>
                  {React.cloneElement(
                    child,
                    {
                      menuType,
                      ref: submenuItemsRefs.current[index],
                      handleKeyDown: ev => onKeyDownSubmenu(ev, index)
                    }
                  )}
                </StyledSubmenuItem>
              )
            )
          }
        </StyledSubmenu>
      </div>
    );
  };

  const classes = () => {
    return classNames({ 'carbon-menu-item--has-link': href || to || onClick });
  };

  const elementProps = {
    className: classes(),
    href,
    to,
    target,
    onClick,
    icon,
    hasSubmenu: Boolean(submenu),
    selected,
    menuType,
    tabbable: isFirstElement
  };

  if (!submenu) {
    elementProps.routerLink = routerLink;
  }

  return (
    <StyledMenuItemWrapper
      { ...ifRef() }
      onKeyDown={ handleKeyDown }
      as={ submenu ? 'div' : Link }
      data-component='menu-item'
      { ...elementProps }
      isOpen={ isOpen }
    >
      {content()}
    </StyledMenuItemWrapper>
  );
});

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
  submenu: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** The href to use for the menu item. */
  href: PropTypes.string,
  /** The to link to use for the menu item. */
  to: PropTypes.string,
  /** The link element to use when providing the to value */
  routerLink: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** The target to use for the menu item. */
  target: PropTypes.string,
  /**
   * menu color scheme provided by <Menu />
   * @private
   * @ignore
   *
  */
  menuType: PropTypes.oneOf(['light', 'dark']),
  /**
   * @private
   * @ignore
  */
  isFirstElement: PropTypes.bool,
  /**
   * @private
   * @ignore
  */
  handleKeyDown: PropTypes.func,
  /**
   * @private
   * @ignore
  */
  isOpen: PropTypes.bool,
  /**
   * @private
   * @ignore
  */
  setIsOpenSubmenu: PropTypes.func,
  /**
   * @private
   * @ignore
  */
  menuItemIndex: PropTypes.number
};

export default MenuItem;
