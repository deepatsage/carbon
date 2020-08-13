import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';

const StyledOptionRow = styled.tr`
  cursor: pointer;
  ${({ isHighlighted, theme }) => isHighlighted && css`background-color: ${theme.select.selected};`}
  
  :hover {
    ${({ theme }) => css`background-color: ${theme.select.selected};`}
  }

  td {
    line-height: 16px;
    padding: 12px 16px;

    &:first-child {
      font-weight: 900;
    }
  }

`;

StyledOptionRow.propTypes = {
  id: propTypes.any,
  isHighlighted: propTypes.bool,
  theme: propTypes.object
};

StyledOptionRow.defaultProps = {
  theme: baseTheme
};

export default StyledOptionRow;
