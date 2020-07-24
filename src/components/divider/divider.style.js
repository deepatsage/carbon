import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';

const StyledDivider = styled.div`
  width: inherit;
  border-bottom: ${({ theme }) => `1px solid ${theme.divider.border}`};
  margin-top: ${({ marginTop, theme }) => marginTop * theme.spacing}px;
  margin-bottom: ${({ marginBottom, theme }) => marginBottom * theme.spacing}px;
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
`;

StyledDivider.propTypes = {
  marginTop: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  marginBottom: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string
};

StyledDivider.defaultProps = {
  theme: baseTheme
};

export default StyledDivider;
