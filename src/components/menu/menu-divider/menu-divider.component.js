import React, { useContext } from "react";
import PropTypes from "prop-types";
import StyledDivider from "./menu-divider.style";
import { MenuContext } from "../menu.component";

const MenuDivider = React.forwardRef(({ size = "default" }, ref) => {
  const menuContext = useContext(MenuContext);

  return (
    <StyledDivider
      size={size}
      data-component="menu-divider"
      menuType={menuContext.menuType}
      ref={ref}
    />
  );
});

MenuDivider.propTypes = {
  /** sets the size of the MenuDivider */
  size: PropTypes.oneOf(["default", "large"]),
};

export default MenuDivider;
