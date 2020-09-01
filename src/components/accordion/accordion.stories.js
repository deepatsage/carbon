import React from 'react';
import { select, text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import Accordion from './accordion.component';
import AccordionGroup from './accordion-group.component';
import Textbox from '../../__experimental__/components/textbox';

export default {
  title: 'Design System/Accordion/Test',
  component: Accordion,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disabled: true
    }
  }
};

export const Basic = (args) => {
  return (
    <Accordion
      iconType={ select('iconType', ['chevron_down', 'dropdown']) }
      iconAlign={ select(
        'iconAlign',
        OptionsHelper.alignBinary,
        'right'
      ) }
      borders={ select('borders', ['default', 'full']) }
      size={ select('size', ['large', 'small']) }
      customPadding={ number('customPadding', 0) }
      scheme={ select('scheme', ['white', 'transparent']) }
      subTitle={ text('subTitle', 'Sub Title') }
      width={ text('width', '100%') }
      { ...args }
      onChange={ action('expansionToggled') }
    >
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </Accordion>
  );
};

Basic.parameters = {
  chromatic: {
    disable: false
  }
};

Basic.args = {
  title: 'Title'
};

export const Grouped = args => (
  <AccordionGroup>
    <Accordion
      { ...args }
      onChange={ action('expansionToggled') }
    >
      <Textbox label='Textbox in an Accordion' />
    </Accordion>
    <Accordion
      title='Second Accordion'
      onChange={ action('expansionToggled') }
    >
      <Textbox label='Textbox in an Accordion' />
    </Accordion>
    <Accordion
      title='Third Accordion'
      onChange={ action('expansionToggled') }
    >
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </Accordion>
  </AccordionGroup>
);

Grouped.parameters = {
  chromatic: {
    disable: false
  }
};

Grouped.args = {
  title: 'Title'
};
