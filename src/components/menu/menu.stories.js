import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import notes from './documentation';
import { Menu, MenuItem, SubmenuBlock } from '.';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import Divider from './divider/divider.component';

Menu.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /menu(?!spec)/
);

MenuItem.__docgenInfo = getDocGenInfo(
  require('./menu-item/docgenInfo.json'),
  /menu-item(?!spec)/
);

SubmenuBlock.__docgenInfo = getDocGenInfo(
  require('./submenu-block/docgenInfo.json'),
  /submenu-block(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const menuType = select('menuType', ['light', 'dark'], 'light');

    return (
      <Menu
        menuType={ menuType }
      >
        <MenuItem selected onClick={ () => {} }>
          Item One
        </MenuItem>
        <MenuItem submenu='Item Two'>
          <SubmenuBlock>
            <MenuItem href='#'>Sub Menu Item One</MenuItem>
            <MenuItem href='#'>Sub Menu Item Two</MenuItem>
          </SubmenuBlock>
        </MenuItem>
        <MenuItem submenu='Item Three'>
          <MenuItem href='#'>Sub Menu Item One</MenuItem>
          <SubmenuBlock>
            <MenuItem icon='settings' href='#'>Sub Menu Item Two</MenuItem>
            <MenuItem href='#'>Sub Menu Item Three</MenuItem>
            <Divider />
            <MenuItem href='#'>Sub Menu Item Four</MenuItem>
          </SubmenuBlock>
        </MenuItem>
      </Menu>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('Menu', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true))
  .add('dark theme', () => (
    <Menu
      menuType='dark'
    >
      <MenuItem>
        Item One
      </MenuItem>
      <MenuItem submenu='Item Two'>
        <SubmenuBlock>
          <MenuItem href='#'>Sub Menu Item One</MenuItem>
          <MenuItem href='#'>Sub Menu Item Two</MenuItem>
        </SubmenuBlock>
      </MenuItem>
      <MenuItem submenu='Item Two'>
        <MenuItem href='#'>Sub Menu Item One</MenuItem>
        <SubmenuBlock>
          <MenuItem icon='settings' href='#'>Sub Menu Item Two</MenuItem>
          <MenuItem href='#'>Sub Menu Item Three</MenuItem>
          <MenuItem divide href='#'>Sub Menu Item Four</MenuItem>
        </SubmenuBlock>
      </MenuItem>
    </Menu>
  ));
