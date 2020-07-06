import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useState } from 'react';
import StyledMenuItemWrapper from './menu-item.style';
import { StyledSubmenu, StyledSubmenuItem, StyledSubmenuTitle } from '../submenu-block/submenu.style';
import OptionHelper from '../../../utils/helpers/options-helper';
import Icon from '../../icon';

const MenuItem = ({
  submenu,
  children,
  href,
  to,
  menuType,
  onClick,
  target,
  submenuDirection,
  icon,
  divide,
  selected,
  routerLink, onArrowKey, ...props
}) => {
  const ref = useRef();
  const [isOpen, setisOpen] = useState(false);

  const onEnterKey = (e) => {
    e.preventDefault();

    if (e.keyCode === 13) {
      console.log('poszlo');
      setisOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (ref && props.isFocused) {
      ref.current.focus();
    }
  });

  const onKeyDown = (e) => {
    onArrowKey(e);

    if (submenu) {
      onEnterKey(e);
    }
  };

  const content = () => {
    if (!submenu) return children;
    return (
      <>
        <StyledSubmenuTitle>
          <StyledMenuItemWrapper
            href={ href }
            to={ to }
            menuType={ menuType }
          >
            { submenu }
          </StyledMenuItemWrapper>
        </StyledSubmenuTitle>
        <StyledSubmenu submenuDirection={ submenuDirection }>
          {
            React.Children.map(
              children,
              child => (
                <StyledSubmenuItem>
                  {React.cloneElement(child, { menuType })}
                </StyledSubmenuItem>
              )
            )
          }
        </StyledSubmenu>
      </>
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
    divide,
    hasSubmenu: Boolean(submenu),
    selected,
    menuType
  };

  if (submenu) {
    elementProps.routerLink = routerLink;
  }

  return (
    <StyledMenuItemWrapper
      as={ submenu ? 'div' : 'a' }
      data-component='menu-item'
      { ...elementProps }
      tabIndex={ props.tabIndex }
      ref={ ref }
      onKeyDown={ onKeyDown }
      isOpen={ isOpen }
    >
      {icon && <Icon type={ icon } />}
      {content()}
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
  /** (for submenus) renders with a divide between items. */
  divide: PropTypes.bool,
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
  /** menu theme provided by <Menu /> */
  menuType: PropTypes.oneOf(['light', 'dark'])
};

MenuItem.defaultProps = {
  submenuDirection: 'right'
};

export default MenuItem;
