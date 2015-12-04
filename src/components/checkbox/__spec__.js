import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Checkbox from './index';

describe('Checkbox', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Checkbox
        name='checkbox'
        label='checkbox'
      />
    )
  });

  describe('render', () => {
    it('renders a parent div with a pod CSS class', () => {
      let checkboxNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(checkboxNode.classList[0]).toEqual('ui-checkbox');
    });

    it('renders a input with type checkbox and a value of 1', () => {
      let checkbox = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1];
      expect(checkbox.type).toEqual('checkbox');
      expect(checkbox.value).toEqual('1');
    });

    it('renders a checkboxSprite to be used as the visible input', () => {
      let sprite = TestUtils.findRenderedDOMComponentWithTag(instance, 'svg');
      let check = TestUtils.findRenderedDOMComponentWithTag(instance, 'path');
      expect(sprite.getAttribute('viewBox')).toEqual('0 0 15 15');
      expect(check.className.baseVal).toEqual('checkbox-check');
    });

    it('renders a hidden input with a value of 0', () => {
      let checkbox = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
      expect(checkbox.type).toEqual('hidden');
      expect(checkbox.value).toEqual('0');
    });
  });

  describe('mainClasses', () => {
    it('returns ui-checkbox and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('ui-checkbox common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns ui-checkbox__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('ui-checkbox__input common-input__input');
    });
  });

  describe('handleOnChange', () => {
    beforeEach(() => {
      spyOn(instance, '_handleOnChange')
    });

    it('passes the checked value', () => {
      let checkbox = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1];
      TestUtils.Simulate.change(checkbox, {target: { checked: true }});
      expect(instance._handleOnChange).toHaveBeenCalledWith({ target: { value: true }});
    });
  });

  describe('reverse set to false', () => {
    it('sets reverse to false by default', () => {
      expect(instance.props.reverse).toBeFalsy();
    });

    it('renders with the label on the right by default', () => {
      let label = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'label')[0];
      expect(label.previousSibling.className).toEqual('common-input__field');
      expect(label.nextSibling).toBe(null);
    });
  });

  describe('reverse set to true', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Checkbox
          name='checkbox'
          label='checkbox'
          reverse={ true }
        />
      )
    });

    it('renders with the label on the left', () => {
      let label = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'label')[0];
      expect(label.previousSibling).toBe(null);
      expect(label.nextSibling.name).toEqual('checkbox');
    });
  });
});
