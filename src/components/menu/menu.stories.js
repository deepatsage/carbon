import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { Menu, MenuItem, SubmenuBlock } from '.';
import Divider from './divider/divider.component';

export default {
  title: 'Test/Menu',
  component: Menu,
  decorators: [withKnobs],
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true
    }
  }
};

export const basic = () => {
  const menuType = select('menuType', ['light', 'dark'], 'light');

  return (
    <div>
      <a href='#'>tets</a>
      <Menu
        menuType={ menuType }
      >
        <MenuItem
          href='#' selected
          onClick={ () => {} }
        >
          Item One
        </MenuItem>
        <MenuItem submenu='Item Two'>

          <MenuItem href='#'>Sub Menu Item One</MenuItem>
          <MenuItem href='#'>Sub Menu Item Two</MenuItem>

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
    </div>
  );
};
