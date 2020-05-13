import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createGuid from '../../utils/helpers/guid';
import Icon from '../icon';

import {
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledButton,
  StyledDrawerChildren,
  StyledDrawerSidebar
} from './drawer.style';

const Drawer = ({
  defaultExpanded,
  expanded,
  onChange,
  children,
  expandedWidth,
  sidebar,
  animationDuration,
  ...props
}) => {
  const drawerSidebarContentRef = useRef();
  const isControlled = expanded !== undefined;
  const [isExpandedInternal, setIsExpandedInternal] = useState(defaultExpanded || false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isExpanded = isControlled ? expanded : isExpandedInternal;

  const duration = useCallback(() => {
    if (typeof animationDuration === 'string' && animationDuration.indexOf('ms') !== -1) {
      const animationTime = animationDuration.substring(0, animationDuration.length - 2);
      return animationTime;
    }

    if (typeof animationDuration === 'string' && animationDuration.indexOf('.') !== -1) {
      const animationTime = animationDuration.substring(0, animationDuration.length - 1);
      return parseFloat(animationTime) * 1000;
    }

    return animationDuration;
  }, [animationDuration]);

  const toggling = useCallback(() => {
    const timeout = duration();
    if (!isExpanded) {
      setIsOpening(true);
      setTimeout(() => {
        setIsOpening(false);
      }, timeout);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
      }, timeout);
    }
  }, [duration, isExpanded, setIsOpening, setIsClosing]);

  const toggleDrawer = useCallback((ev) => {
    if (!isControlled) setIsExpandedInternal(!isExpanded);
    if (onChange) onChange(ev, !isExpanded);
    if (isExpanded) {
      drawerSidebarContentRef.current.scrollTop = 0;
    }

    toggling();
  }, [toggling, isControlled, isExpanded, onChange]);

  const openingClass = isOpening ? 'opening' : '';
  const closingClass = isClosing ? 'closing' : '';
  const guid = useRef(createGuid());
  const sidebarId = `DrawerSidebar_${guid.current}`;

  const classes = useCallback(() => {
    return classNames(
      isExpanded ? 'open' : 'closed',
      openingClass,
      closingClass
    );
  }, [isExpanded, openingClass, closingClass]);

  return (
    <StyledDrawerWrapper
      data-component='drawer'
      { ...props }
    >
      <StyledDrawerContent
        expandedWidth={ expandedWidth }
        animationDuration={ animationDuration }
        className={ classes() }
        ref={ drawerSidebarContentRef }
      >
        <StyledButton
          aria-label='toggle sidebar'
          aria-expanded={ isExpanded }
          aria-controls={ sidebarId }
          data-element='drawer-toggle'
          onClick={ toggleDrawer }
          isExpanded={ isExpanded }
          animationDuration={ animationDuration }
        >
          <Icon type='chevron_right' />
        </StyledButton>
        <StyledDrawerSidebar id={ sidebarId } role='navigation'>
          { sidebar }
        </StyledDrawerSidebar>
      </StyledDrawerContent>
      <StyledDrawerChildren>
        {children}
      </StyledDrawerChildren>
    </StyledDrawerWrapper>
  );
};

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  /** Set the default state of expansion of the Drawer if component is meant to be used as uncontrolled */
  defaultExpanded: PropTypes.bool,
  /** Sets the expansion state of the Drawer if component is meant to be used as controlled */
  expanded: PropTypes.bool,
  /** Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) */
  onChange: PropTypes.func,
  /* Sidebar object either html or react component */
  sidebar: PropTypes.node,
  /* The (% or px) width of the expanded sizebar  */
  expandedWidth: PropTypes.string,
  /** Duration of a animation */
  animationDuration: PropTypes.string
};

Drawer.defaultProps = {
  expandedWidth: '40%',
  animationDuration: '400ms'
};

export default Drawer;
