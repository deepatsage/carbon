import styled, { css } from "styled-components";

const StyledSelectList = styled.ul`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  list-style-type: none;
  max-height: ${(props) => `${props.maxHeight}`};
  margin: 0;
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;

  ${({ isLoading }) =>
    isLoading &&
    css`
      min-height: 100px;
    `}
`;

StyledSelectList.defaultProps = {
  maxHeight: "180px",
};

const StyledSelectLoaderContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
`;

export { StyledSelectList, StyledSelectLoaderContainer };
