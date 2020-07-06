import styled, { css } from 'styled-components';
import { StyledSubmenu, StyledSubmenuTitle, StyledSubmenuBlock } from '../submenu-block/submenu.style';
import { baseTheme } from '../../../style/themes';
import StyledIcon from '../../icon/icon.style';

const StyledMenuItemWrapper = styled.a`
  ${({
    menuType, theme, selected, hasSubmenu, isOpen
  }) => css`
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    padding: 0px 16px;
    position: relative;
    cursor: pointer;
    background-color: ${theme.menu.light.background};
    text-decoration: none;
    color: #000;


    &:focus {
      z-index: 1;
      outline: 2px solid gold;
    }

    :hover{
      background: ${theme.colors.primary};
      color: #fff;
    }

    ${hasSubmenu && css`
      :hover &, :hover {
        background-color: ${theme.colors.white};
        color: #000;

        [data-component="icon"] 
          color: #000;
        }       
      }
    `}

    ${selected && css`
      background-color: ${theme.menu.light.selected};
    `}

    ${menuType === 'dark' && css`
      background-color: ${theme.colors.slate};
      color: #fff;

      ${selected && css`
        background-color: ${theme.menu.dark.selected};
      `}

      [data-component='icon'] {
        color: ${theme.colors.white};
      }

      ${hasSubmenu && css`
        :hover &, :hover {
          background-color: ${theme.menu.dark.submenuBackground};
          color: #fff;

          [data-component="icon"] {
            color: #fff;
          }
        }
      `}
    `}

    ${hasSubmenu && css`
      padding: 0;

      ${StyledSubmenuTitle}{
        ${StyledMenuItemWrapper}{
          padding-right: 32px;
        }
      }

      :before {
        margin-top: -2px;
        pointer-events: none;
        position: absolute;
        right: 16px;
        top: 50%;
        z-index: 2;
        content: "";
        width: 0;
        height: 0;
        border-top: 5px solid ${menuType !== 'dark' ? theme.colors.slate : theme.colors.white};
        border-right: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 4px solid transparent;
      }

      &:hover {
        ${StyledSubmenu}{
          display: block;
        }

        
      }

      ${isOpen && css`
        ${StyledSubmenu}{
            display: block;
          }
      `}
    `}

    ${StyledSubmenu}{
      ${StyledMenuItemWrapper}:after, ${StyledMenuItemWrapper}:hover:after{
        display: none;
      }

      background-color: ${theme.colors.white};

      .carbon-menu-item--has-link:hover{
        background: ${theme.colors.primary};
        cursor: pointer;
        color: white;
        text-decoration: none;

        [data-component='icon'] {
          color: white;
        }
      }

      ${StyledMenuItemWrapper} {
        &:hover,
        &:hover a,
        a &:hover {
          color: ${theme.colors.white};
        }
        
        a {
          text-decoration: none;
        }
      }

      ${selected && css`
        color: #38C72A;
      `}

      ${menuType === 'dark' && css`
        .carbon-menu-item--has-link:hover{
          background-color: ${theme.colors.primary};
          text-decoration: none;

          [data-component='icon'] {
            color: ${theme.colors.white};
          }
        }
      `}

      ${StyledMenuItemWrapper}{
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        white-space: nowrap;
        cursor: pointer;

        ${StyledIcon}{
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }

    ${menuType === 'dark' && css`
      ${StyledSubmenuBlock}{
        background-color: ${theme.menu.dark.submenuBackground}; 
        
        ${StyledMenuItemWrapper}{
          background-color: transparent; 
        }
      }
    `}
  `}
`;

StyledMenuItemWrapper.defaultProps = {
  theme: baseTheme
};

export default StyledMenuItemWrapper;
