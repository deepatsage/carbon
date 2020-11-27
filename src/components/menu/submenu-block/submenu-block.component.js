import React from "react";
import PropTypes from "prop-types";
import { StyledSubmenuBlock } from "./submenu.style";

const SubmenuBlock = ({ children, menuType, variant }) => {
  return (
    <StyledSubmenuBlock
      data-component="submenu-block"
      menuType={menuType}
      variant={variant}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { ...child.props, menuType })
      )}
    </StyledSubmenuBlock>
  );
};

SubmenuBlock.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
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

export default SubmenuBlock;
