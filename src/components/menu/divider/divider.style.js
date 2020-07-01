import styled, { css } from 'styled-components';

const StyledDivider = styled.div`
  ${({ menuType, theme }) => css`
    height: 1px;
    margin: 8px 16px;
    background: ${menuType !== 'dark' ? theme.menu.light.divider : theme.menu.dark.divider};
  `}
`;

export default StyledDivider;
