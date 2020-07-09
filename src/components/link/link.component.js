import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Event from '../../utils/helpers/events';
import LinkStyle from './link.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import tagComponent from '../../utils/helpers/tags';

const Link = React.forwardRef((props, ref) => {
  const onKeyDown = (ev) => {
    if (props.onKeyDown) {
      props.onKeyDown(ev);
    }

    // return early if there is no onClick or there is a href prop
    // or the event is not an enter key
    if (props.href || (!Event.isEnterKey(ev) && !Event.isSpaceKey(ev))) {
      return;
    }

    if (props.onClick) {
      props.onClick(ev);
    }
  };

  const icon = () => {
    return (
      <Icon
        type={ props.icon }
        tooltipMessage={ props.tooltipMessage }
        tooltipAlign={ props.tooltipAlign }
        tooltipPosition={ props.tooltipPosition }
        bgTheme='none'
        iconColor='business-color'
        disabled={ props.disabled }
      />
    );
  };

  const renderLinkIcon = (currentAlignment = 'left') => {
    const hasProperAlignment = props.icon && (props.iconAlign === currentAlignment);

    return hasProperAlignment ? icon() : null;
  };

  const tabIndex = () => {
    return props.tabbable && !props.disabled ? '0' : '-1';
  };

  const handleClick = (ev) => {
    if (props.disabled) {
      ev.preventDefault();
    } else if (props.onClick) {
      props.onClick(ev);
    }
  };

  const componentProps = () => {
    const propsTemp = {
      onKeyDown,
      onMouseDown: props.onMouseDown,
      disabled: props.disabled,
      onClick: handleClick,
      tabIndex,
      target: props.target
    };

    if (props.to) {
      propsTemp.to = props.to;
    } else {
      propsTemp.href = props.href;
    }

    return propsTemp;
  };


  /**
   * className `@carbon-link__content` is related to `ShowEditPod` component
   * */

  const linkContent = () => (
    <>
      { renderLinkIcon() }

      <span className='carbon-link__content'>{props.children}</span>

      { renderLinkIcon('right') }
    </>
  );

  const createLinkBasedOnType = () => {
    let type = 'a';

    if (props.to && props.routerLink) {
      type = props.routerLink;
    } else if (props.onClick) {
      type = 'button';
    }

    return React.createElement(
      type,
      { ...componentProps() },
      linkContent()
    );
  };

  const {
    disabled, className, iconAlign
  } = props;
  return (
    <LinkStyle
      ref={ ref }
      disabled={ disabled }
      className={ className }
      iconAlign={ iconAlign }
      { ...tagComponent('link', props) }
    >
      {createLinkBasedOnType()}
    </LinkStyle>
  );
});

Link.propTypes = {
  /** Child content to render in the link. */
  children: PropTypes.node,
  /** Classes to apply to the component. */
  className: PropTypes.string,
  /** The disabled state of the link. */
  disabled: PropTypes.bool,
  /** An href for an anchor tag. */
  href: PropTypes.string,
  /** An icon to display next to the link. */
  icon: PropTypes.string,
  /** Which side of the link to the render the link. */
  iconAlign: PropTypes.string,
  /** Function called when the mouse is clicked. */
  onClick: PropTypes.func,
  /** Function called when a key is pressed. */
  onKeyDown: PropTypes.func,
  /** Function called when a mouse down event triggers. */
  onMouseDown: PropTypes.func,
  /** Whether to include the link in the tab order of the page */
  tabbable: PropTypes.bool,
  /** Using `to` an passing in a component to the `routerLink` prop will render a routing link instead of a web href. */
  to: PropTypes.string,
  /** A message to display as a tooltip to the link. */
  tooltipMessage: PropTypes.string,
  /** Positions the tooltip with the link. */
  tooltipPosition: PropTypes.oneOf(OptionsHelper.positions),
  /** Aligns the tooltip. */
  tooltipAlign: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
  /** A routing component to render when the to prop is set */
  routerLink: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target: PropTypes.string
};

Link.safeProps = ['onClick'];

Link.defaultProps = {
  iconAlign: 'left',
  tabbable: true
};

export default Link;
