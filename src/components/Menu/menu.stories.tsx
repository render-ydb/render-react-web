import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Menu, MenuProps } from './menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

export default {
  title: 'Menu 导航菜单',
  component: Menu,
};

const Template: Story<MenuProps> = (args) => (
  <Menu {...args}>
    <MenuItem link='111' icon='AlertFilled'>1111</MenuItem>
    <MenuItem link='2222'>2222</MenuItem>
    <MenuItem link='3333' disabled>3333</MenuItem>
    <SubMenu icon='AlertFilled' title='子菜单' link='111'>
      <MenuItem link='5555'>5555</MenuItem>
      <MenuItem link='6666'>6666</MenuItem>
    </SubMenu>
  </Menu>
);

export const Primary = Template.bind({});
Primary.storyName = 'menu'
Primary.args = {
  mode: 'vertical',
  defaultActiveIndex: '111',
  onSelecte: (link) => {
    console.log(link)
  }
};


