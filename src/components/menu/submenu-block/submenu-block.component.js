import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyledSubmenuBlock } from "./submenu.style";
import { MenuContext } from "../menu.component";

const SubmenuBlock = ({ children, variant }) => {
  const menuContext = useContext(MenuContext);

  return (
    <StyledSubmenuBlock
      data-component="submenu-block"
      menuType={menuContext.menuType}
      variant={variant}
    >
      {children}
    </StyledSubmenuBlock>
  );
};

SubmenuBlock.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
};

export default SubmenuBlock;
