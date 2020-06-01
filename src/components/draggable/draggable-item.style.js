import styled, { css } from 'styled-components';
import { baseTheme } from '../../style/themes';
import Icon from '../icon';

const StyledIcon = styled(Icon)`
  margin-left: auto;
`;

const StyledDraggableItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.draggableItem.border};
  padding: 8px 0;
  cursor: move;
  cursor: grab;

  opacity: ${({ isDragging }) => (isDragging ? '0' : '1')};

  ${({ isDragging }) => isDragging && css`
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;

    ${StyledIcon}{
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
    `
}
`;

StyledDraggableItem.defaultProps = {
  theme: baseTheme
};

export { StyledDraggableItem, StyledIcon };
