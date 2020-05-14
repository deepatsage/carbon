import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import FlatTableRow from './flat-table-row.component';
import FlatTableCell from '../flat-table-cell/flat-table-cell.component';
import StyledFlatTableRow from './flat-table-row.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import { baseTheme } from '../../../style/themes';
import StyledFlatTableRowHeader from '../flat-table-row-header/flat-table-row-header.style';
import StyledFlatTableCell from '../flat-table-cell/flat-table-cell.style';

describe('FlatTableRow', () => {
  it('should have expected styles', () => {
    expect(renderFlatTableRow({}, TestRenderer.create)).toMatchSnapshot();
  });

  describe('when the "onClick" prop is passed', () => {
    let wrapper, onClickFn;

    beforeEach(() => {
      onClickFn = jest.fn();
      wrapper = renderFlatTableRow({
        onClick: onClickFn
      });
      wrapper.find(FlatTableRow).at(0).simulate('focus');
    });

    it('then the component should have tabIndex set to 0', () => {
      expect(wrapper.find(StyledFlatTableRow).prop('tabIndex')).toBe(0);
    });

    it('then the component should have isRowInteractive prop set to true', () => {
      expect(wrapper.find(StyledFlatTableRow).prop('isRowInteractive')).toBe(true);
    });

    it('then the cursor over the element should be set to pointer', () => {
      assertStyleMatch({ cursor: 'pointer' }, wrapper);
    });

    it('then the element should have proper outline when focused', () => {
      assertStyleMatch({
        outline: `2px solid ${baseTheme.colors.focus}`,
        outlineOffset: '-1px'
      }, wrapper, { modifier: ':focus' });
    });

    it('then the Row Header should have proper outline when the Row is focused', () => {
      assertStyleMatch({
        borderBottom: '1px solid transparent',
        borderLeft: `1px solid ${baseTheme.colors.focus}`,
        backgroundClip: 'padding-box',
        zIndex: '1000'
      }, wrapper, { modifier: `:focus ${StyledFlatTableRowHeader}` });

      assertStyleMatch({
        borderTop: `2px solid ${baseTheme.colors.focus}`,
        borderBottom: `1px solid ${baseTheme.colors.focus}`,
        display: 'block',
        left: '0px',
        top: '-1px',
        height: '100%',
        width: '101%',
        position: 'absolute',
        zIndex: '1000'
      }, wrapper, { modifier: `:focus ${StyledFlatTableRowHeader}:before` });
    });

    it('then all Cells of the Row should have proper hover color', () => {
      assertStyleMatch({
        backgroundColor: baseTheme.flatTable.hover
      },
      wrapper, { modifier: `:hover ${StyledFlatTableCell}` });
    });

    it('then the Row Header of the Row should have proper hover color', () => {
      assertStyleMatch({
        backgroundColor: baseTheme.flatTable.hover
      },
      wrapper, { modifier: `:hover ${StyledFlatTableRowHeader}` });
    });

    describe('and space key is pressed', () => {
      it('then the onClick prop should be called', () => {
        wrapper.find(FlatTableRow).simulate('keydown', { which: 13 });
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe('and enter key is pressed', () => {
      it('then the onClick prop should be called', () => {
        wrapper.find(FlatTableRow).simulate('keydown', { which: 32 });
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe('and a key other than space or enter is pressed', () => {
      it('then the onClick prop should not be called', () => {
        wrapper.find(FlatTableRow).simulate('keydown', { which: 18 });
        expect(onClickFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('when the "onClick" prop is not passed', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderFlatTableRow();
    });

    it('then the component should have tabIndex undefined', () => {
      expect(wrapper.find(StyledFlatTableRow).prop('tabIndex')).toBe(undefined);
    });

    it('then the component should have isRowInteractive prop undefined', () => {
      expect(wrapper.find(StyledFlatTableRow).prop('isRowInteractive')).toBe(undefined);
    });
  });

  describe('when the "selected" prop is passed as true', () => {
    let wrapper;
    it('applies a "background-color" to the "TableCell"', () => {
      wrapper = renderFlatTableRow({
        selected: true
      });
      assertStyleMatch({
        backgroundColor: baseTheme.flatTable.selected,
        borderBottomColor: baseTheme.flatTable.selected
      }, wrapper, { modifier: `${StyledFlatTableCell}` });
    });

    describe('when the "onClick" is also provided', () => {
      it('it applies the correct "background-color" on hover', () => {
        wrapper = renderFlatTableRow({
          selected: true,
          onClick: jest.fn()
        });
        wrapper.find(FlatTableRow).at(0).simulate('focus');
        assertStyleMatch({
          backgroundColor: baseTheme.flatTable.selected
        }, wrapper, { modifier: `:hover ${StyledFlatTableCell}` });
      });
    });
  });

  describe('when the "highlighted" prop is passed as true', () => {
    let wrapper;
    it('applies a "background-color" to the "TableCell"', () => {
      wrapper = renderFlatTableRow({
        highlighted: true,
        onClick: jest.fn()
      });
      assertStyleMatch({
        backgroundColor: baseTheme.flatTable.highlighted,
        borderBottomColor: baseTheme.flatTable.highlighted
      }, wrapper, { modifier: `${StyledFlatTableCell}` });
    });

    describe('when the "selected" is also passed as true', () => {
      it('it applies the correct "background-color"', () => {
        wrapper = renderFlatTableRow({
          selected: true,
          highlighted: true,
          onClick: jest.fn()
        });
        wrapper.find(FlatTableRow).at(0).simulate('focus');
        assertStyleMatch({
          backgroundColor: baseTheme.flatTable.selected
        }, wrapper, { modifier: `:hover ${StyledFlatTableCell}` });
      });
    });
  });
});

function renderFlatTableRow(props = {}, renderer = mount) {
  return renderer(
    <table>
      <tbody>
        <FlatTableRow { ...props }>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </tbody>
    </table>
  );
}
