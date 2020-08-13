import styled from 'styled-components';
import { baseTheme } from '../../../style/themes';

const StyledSelectList = styled.ul`
  background-color: white;
  box-sizing: border-box;
  box-shadow: ${({ theme }) => `${theme.shadows.depth1}`};
  list-style-type: none;
  max-height: ${props => `${props.maxHeight}`};
  margin: 0;
  outline: none;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
  width: 100%;
`;

StyledSelectList.defaultProps = {
  maxHeight: '180px',
  theme: baseTheme
};

export const StyledSelectListTableContainer = styled.div`
  max-height: ${props => `${props.maxHeight}`};
  min-width: 100%;
  width: auto;
  position: absolute;
  overflow-y: auto;
  box-shadow: ${({ theme }) => `${theme.shadows.depth1}`};
`;

StyledSelectListTableContainer.defaultProps = {
  maxHeight: '388px',
  theme: baseTheme
};

export const StyledSelectListTable = styled.table`
  background-color: ${({ theme }) => theme.colors.white};
  border-collapse: separate;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  white-space: nowrap;
`;

StyledSelectListTable.defaultProps = {
  theme: baseTheme
};

export const StyledSelectListTableHeader = styled.thead`
  th {
    position: sticky;
    top: 0px;
    z-index: 1000;
    padding: 15px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.select.tableHeaderBorder};
    background-color: white;
    text-align: left;
    font-weight: 900;
    font-size: 12px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.tileSelect.descriptionColor};

    :after { 
      content: ''; 
      display: block;
      position: absolute;
      bottom: -8px;
      left: 0px;
      background-image: linear-gradient(${({ theme }) => theme.colors.black}, ${({ theme }) => theme.colors.white});
      opacity: 0.03;
      height: 8px;
      width: 100%;
    }
  }
`;

StyledSelectListTableHeader.defaultProps = {
  theme: baseTheme
};

export default StyledSelectList;
